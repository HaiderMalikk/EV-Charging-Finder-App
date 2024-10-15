import { View, Text, FlatList, Dimensions } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import PlaceItem from './PlaceItem'
import { SelectedMarkerContext } from '../../Context/SelectedMarkerContext';
import { getFirestore } from 'firebase/firestore';
import { app } from '../../Utils/FirebaseConfig';
import { collection, query, where, getDocs } from "firebase/firestore";


// this will use flat list to display the places storted in place list onto the home screen for user to see 
// using placelist as a prop in the placeslist so we get the place list in home screen here so we can display it 
// note that the data provided in in place list but each data has many attributes one is display name this only gives the name of the place
// NOTE: WE DISPLAY PLACE ITEAM HERE but in place iteam the layout of place iteam is given this code just displays each item as a flat list
// the item and index alloows us to iterate over places
// also here i added a ref to the flast list so we can navigate to the location of the cahrger in the flat list
export default function PlacesList({placeList}) {
  const flatListRef = useRef(null);
  const {selectedMarker, setSelectedMarker} = useContext(SelectedMarkerContext);
  const [favList, setFavList] = useState([])

  // the [] desines that when selected marker cahnges rerun the useeffect
  // if selected marker is present we will scrool to that index in the flat list
  useEffect(() => {
    if (selectedMarker != null && selectedMarker >= 0 && selectedMarker < placeList.length) {
      // Add a slight delay to ensure data is ready before scrolling
      const timeout = setTimeout(() => {
        scrollToIndex(selectedMarker);
      }, 300); // 300ms delay can be adjusted based on your app's performance
  
      return () => clearTimeout(timeout); // Cleanup timeout if the component unmounts
    }
  }, [selectedMarker, placeList]);
  

  // if we give index 3 then it will scroll to 3rd item in falt list using the flat list ref
  const scrollToIndex = (index) =>{
    flatListRef.current?.scrollToIndex({animated:true, index})
  }

  // using index we can navigate to the location of the cahrger in the flat list by * the index with width of the screen
  const getItemlayout=(_, index)=>({
    length:Dimensions.get('window').width,
    offset:Dimensions.get('window').width*index,
    index
  });

  // getting data from fire base so we can check is user has a fav charger o we can fill its heart with ared one to show its alredy fav
  const db = getFirestore(app);
  useEffect(()=>{
    GetFavCharger();
  },[])

  const GetFavCharger=async()=>{
    setFavList([])
    const q = query(collection(db, "ev-fav-charger"), where("name", "==", "user"));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
        setFavList(favList=>[...favList,doc.data()]);
      });
  }

  // checking if item is fav
  const isFav=(place)=>{
    const result = favList.find((item)=> item.place.id==place.id)
    return result?true:false;
  }

  



  return (
    <View>
      <FlatList
        data={placeList}
        horizontal={true}

        pagingEnabled //must cahnge to 1 icon on page
        ref={flatListRef}
        getItemLayout={getItemlayout}
      
        showsHorizontalScrollIndicator={true}
        renderItem={({item, index}) =>(
          <View key={index}>
            {/* here i set marked in item when item is marked as fav then here when its marked i recall get fav to get latest favlist */}
            <PlaceItem place={item} isFav={isFav(item)} marked={GetFavCharger}/>
          </View>
        ) }
      />
    </View>
  )
}