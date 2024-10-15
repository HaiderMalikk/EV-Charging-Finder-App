// HomeScreen.js
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppMapView from './AppMapView';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from './Header';
import SearchBar from './SearchBar';
import { UserLocationContext } from '../../Context/UserLocationContext';
import ApiCalls from '../../Utils/ApiCalls';
import PlacesList from './PlacesList';
import { SelectedMarkerContext } from '../../Context/SelectedMarkerContext';

// home screen includes map header and serch bar 
const HomeScreen = () => {
  // getting user location to make api call to nearby places in (API call.js) and get nearby places relitive to user
  const {location, setLocation}=useContext(UserLocationContext);
  const [placeList, setPlaceList] = useState([]); // list of nearby places initally empty 
  const [selectedMarker, setSelectedMarker] = useState([]); // defult value for selected marker is null
  // getting nearby places, type of 'ev chargers' got then from google places types using places api and suing use effect to call the function to get nearby places
  useEffect(() => {
    location && getNearbyPlaces();
  }, [location]); // Effect will run when location is available the brakets ensure that its only ran when location is avalible and done once 

  const getNearbyPlaces = () => {
    const data = {
      "includedTypes": ["electric_vehicle_charging_station"],
      "maxResultCount": 15,
      "locationRestriction": {
        "circle": {
          "center": {
            "latitude": location?.latitude,
            "longitude": location?.longitude
          },
          "radius": 5000.0
        }
      }
    };

    // logging nearby places note this is like a list of neaby places i will use markers to show on the map using place list
    ApiCalls.newNearbyPlaces(data).then(resp => {
      console.log(JSON.stringify(resp.data)); // logs all places objets like ( value charge, lat, long, etc)
      setPlaceList(resp.data?.places); // set list of places this will be used in placeview to display as flat 
    });
  };


  return (
    // wrapping the home screen in selected marker context so anywher in the home screen we can accsess the selected marker
    <SelectedMarkerContext.Provider value={{selectedMarker, setSelectedMarker} }>
      {/* this returns to the home screen the header folllowed by the serch bar and then the map each one has its own file*/}
      <View>
        <View style={styles.header}>
          <Header/>
          {/* making sure to update user location when they serch for a new location using serchbar */}
          <SearchBar  searchedLocation={(location) => setLocation({latitude:location.lat, longitude:location.lng})} />
        </View>
        {/*  NOTE: i passed the place list view to the map view so on the home screen we can see the locations of all the chargers on the map */}
        {<AppMapView placeList={placeList}/>}
        <View style={styles.placelistview}>
          {/* maing sure place list is there whern we display the place list on the home screen (compensates for loading time)  */}
          {placeList&&<PlacesList placeList={placeList}/>} 
        </View>
      </View>
    </SelectedMarkerContext.Provider>
  );
}

const styles = StyleSheet.create({
  header:{
    position:'absolute',
    zIndex: 10,
    padding: 10,
    width: '100%',
    paddingHorizontal: 20
  },
  placelistview:{
    position: 'absolute',
    bottom: 0,
    zIndex:10,
    width: '100%',
    
  }
  
})

export default HomeScreen;