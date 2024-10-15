// HomeScreen.js
import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import AppMapView from './AppMapView';
import Header from './Header';
import SearchBar from './SearchBar';
import { UserLocationContext } from '../../Context/UserLocationContext';
import ApiCalls from '../../Utils/ApiCalls';
import PlacesList from './PlacesList';
import { SelectedMarkerContext } from '../../Context/SelectedMarkerContext';

// Home screen includes map, header, and search bar
const HomeScreen = () => {
  // Getting user location to make API call to nearby places in (API call.js) and get nearby places relative to user
  const { location, setLocation } = useContext(UserLocationContext);
  const [placeList, setPlaceList] = useState([]); // List of nearby places initially empty
  const [selectedMarker, setSelectedMarker] = useState([]); // Default value for selected marker is null
  const [maxResultCount, setMaxResultCount] = useState(15); // Default max results
  const [radius, setRadius] = useState(5000); // Default radius in meters

  // Getting nearby places, type of 'ev chargers' got then from Google Places types using Places API and using useEffect to call the function to get nearby places
  useEffect(() => {
    location && getNearbyPlaces();
  }, [location, radius, maxResultCount]); // Fetch places when location, radius, or max results change

  const getNearbyPlaces = () => {
    const data = {
      "includedTypes": ["electric_vehicle_charging_station"],
      "maxResultCount": maxResultCount,
      "locationRestriction": {
        "circle": {
          "center": {
            "latitude": location?.latitude,
            "longitude": location?.longitude
          },
          "radius": radius
        }
      }
    };

    // Logging nearby places; this is like a list of nearby places I will use markers to show on the map using place list
    ApiCalls.newNearbyPlaces(data).then(resp => {
      console.log(JSON.stringify(resp.data)); // Logs all places objects like (value charge, lat, long, etc)
      setPlaceList(resp.data?.places); // Set list of places; this will be used in PlaceView to display as FlatList
    });
  };

  return (
    // Wrapping the home screen in SelectedMarkerContext so anywhere in the home screen we can access the selected marker
    <SelectedMarkerContext.Provider value={{ selectedMarker, setSelectedMarker }}>
      {/* This returns to the home screen the header followed by the search bar and then the map; each one has its own file */}
      <View>
        <View style={styles.header}>
          {/* Pass maxResultCount and radius to Header */}
          <Header 
            maxResult={maxResultCount} 
            radius={radius} 
            setMaxResult={setMaxResultCount} 
            setRadius={setRadius} 
            getNearbyPlaces={getNearbyPlaces} 
          />
          {/* Making sure to update user location when they search for a new location using SearchBar */}
          <SearchBar searchedLocation={(location) => setLocation({ latitude: location.lat, longitude: location.lng })} />
        </View>
        {/* NOTE: I passed the place list view to the map view so on the home screen we can see the locations of all the chargers on the map */}
        <AppMapView placeList={placeList} />
        <View style={styles.placelistview}>
          {/* Making sure place list is there when we display the place list on the home screen (compensates for loading time) */}
          {placeList && <PlacesList placeList={placeList} />}
        </View>
      </View>
    </SelectedMarkerContext.Provider>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    zIndex: 10,
    padding: 10,
    width: '100%',
    paddingHorizontal: 20,
  },
  placelistview: {
    position: 'absolute',
    bottom: 0,
    zIndex: 10,
    width: '100%',
  }
});

export default HomeScreen;
