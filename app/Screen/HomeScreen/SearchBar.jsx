import { View, Text } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Colors from '../../Utils/Colors';

// serch bar for home screen to make serches, powerd by google and google places api, integrated using react native google places autocomplete
// NOTE: the randome vals and uuid is used to generate a unique id for each search
export default function SearchBar({searchedLocation}) {
  return (
    <View
    style={{
        
        display : 'flex',
        backgroundColor: 'white',
        borderRadius: 5,
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginTop: 5
    }} >
        <FontAwesome5 name="map-marker-alt" size={24} color={Colors.buttonImportant} style={{marginTop: 10}} />
       <GooglePlacesAutocomplete
      placeholder='Search EV Chargers'
      fetchDetails={true}
      enablePoweredByContainer={false}
      onPress={(data, details = null) => {
        searchedLocation(details?.geometry?.location); // return searched location as cords 
      }}
      query={{
        key: '',
        language: 'en',
      }}
    />
    </View>
  )
}