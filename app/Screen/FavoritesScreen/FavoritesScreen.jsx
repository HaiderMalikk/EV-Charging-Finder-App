// FavoriteScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import Colors from '../../Utils/Colors';
import { getFirestore } from 'firebase/firestore';
import { app } from '../../Utils/FirebaseConfig';
import { collection, query, where, getDocs } from "firebase/firestore";
import PlaceItem from '../HomeScreen/PlaceItem';

const FavoriteScreen = () => {

  // resusing firebase get fav quiry from place list
  const db = getFirestore(app);
  const [favList, setFavList] = useState([]);
  const [loading, setloading] = useState(false); // for refreshing to get latest firebase data
  useEffect(()=>{
    GetFavCharger();
  },[]) //add user ,[user] here and in list view where user is the email
  const GetFavCharger=async()=>{
    setloading(true)
    setFavList([])
    const q = query(collection(db, "ev-fav-charger"), where("name", "==", "user"));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
        setFavList(favList=>[...favList,doc.data()]);
        setloading(false);
      });
  }


  return (
    <View style ={{flex: 1,marginTop: 10}}>
      {/* loading icon shows loading when feching data */}
      <Text style={{color: Colors.buttonImportant, fontFamily:'outfit-bold', padding: 10, fontSize: 30}}>My Favorites</Text>

      {!favList? <View  style={{justifyContent: 'center' , alignItems: 'center', display : 'flex', height: '100%'}} >
        <ActivityIndicator size="large" color={Colors.buttonImportant}/>
        <Text style={{color: Colors.Black, fontFamily:'outfit-medium'}}>Loading Favorites</Text>
       </View>:null}


      {/* here i made a flat list to show the fav chargers also allowed user to refresh on refresh i get fav chargers again */}
      <FlatList data={favList}
      onRefresh={GetFavCharger}
      refreshing={loading}
      renderItem={({item, index})=>(
        <PlaceItem  place={item.place} isFav={true} marked={GetFavCharger} />
      )}
      />

    </View>
  );
}

export default FavoriteScreen;
