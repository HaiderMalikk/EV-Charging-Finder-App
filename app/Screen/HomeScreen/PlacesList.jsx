import { View, Text, FlatList, Dimensions } from 'react-native'
import React, { useContext, useEffect, useRef } from 'react'
import PlaceItem from './PlaceItem'
import { SelectedMarkerContext } from '../../Context/SelectedMarkerContext';


// this will use flat list to display the places storted in place list onto the home screen for user to see 
// using placelist as a prop in the placeslist so we get the place list in home screen here so we can display it 
// note that the data provided in in place list but each data has many attributes one is display name this only gives the name of the place
// NOTE: WE DISPLAY PLACE ITEAM HERE but in place iteam the layout of place iteam is given this code just displays each item as a flat list
// the item and index alloows us to iterate over places
// also here i added a ref to the flast list so we can navigate to the location of the cahrger in the flat list
export default function PlacesList({placeList}) {
  const flatListRef = useRef(null);
  const {selectedMarker, setSelectedMarker} = useContext(SelectedMarkerContext);

  // the [] desines that when selected marker cahnges rerun the useeffect
  // if selected marker is present we will scrool to that index in the flat list
  useEffect(()=>{
    //selectedMarker && scrollToIndex(selectedMarker)
  },[selectedMarker])

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
            <PlaceItem place={item}/>
          </View>
        ) }
      />
    </View>
  )
}