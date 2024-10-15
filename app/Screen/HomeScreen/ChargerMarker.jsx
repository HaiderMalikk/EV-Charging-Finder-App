import { View, Text, Image } from 'react-native'
import React, { useContext } from 'react'
import { Marker } from 'react-native-maps'
import { SelectedMarkerContext } from '../../Context/SelectedMarkerContext';

// caherging marker user the cordinates of all places and then displayes them on the screen just like how the car logo is 
export default function ChargerMarker({index, place}) {
  const {selectedMarker, setSelectedMarker } = useContext(SelectedMarkerContext); // getting the current selected marker and its data so we can update it on press 
  return place && (
    <Marker
          coordinate={{
            latitude: place.location?.latitude,
            longitude: place.location?.longitude,
          }
          }
          onPress={()=>setSelectedMarker(index)} // logs the index of the marker to pass to place list so we can show the card of the current marker on press of that marker note the context is used here to update the current selected marker
          >
            <Image source={require('/Users/haidermalik/Documents/Code/Supa-Charger-App/assets/images/charger-ping.png')}
            style={{width: 60, height: 60}}
             />
    </Marker>
  )
}