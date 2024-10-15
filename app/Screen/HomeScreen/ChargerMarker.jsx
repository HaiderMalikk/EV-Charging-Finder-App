import { View, Text, Image } from 'react-native';
import React, { useContext } from 'react';
import { Marker } from 'react-native-maps';
import { SelectedMarkerContext } from '../../Context/SelectedMarkerContext';

// ChargerMarker component to display charging stations on the map
export default function ChargerMarker({ index, place }) {
    const { selectedMarker, setSelectedMarker } = useContext(SelectedMarkerContext); // Get the current selected marker and its data to update it on press 

    return place && (
        <Marker
            coordinate={{
                latitude: place.location?.latitude, // Use latitude from place's location
                longitude: place.location?.longitude, // Use longitude from place's location
            }}
            onPress={() => setSelectedMarker(index)} // Logs the index of the marker to pass to the place list so we can show the card of the current marker on press of that marker. Note the context is used here to update the current selected marker
        >
            {/* Display a different icon based on whether the marker is selected or not */}
            <Image
                source={selectedMarker === index 
                    ? require('/Users/haidermalik/Documents/Code/Supa-Charger-App/assets/images/charger-ping.png') // Selected marker icon
                    : require('/Users/haidermalik/Documents/Code/Supa-Charger-App/assets/images/charger-ping-dull.png')} // Non-selected marker icon
                style={{ width: selectedMarker === index ? 80 : 60, height: selectedMarker === index ? 80 : 60 }} // Change size based on selection
            />
        </Marker>
    );
}
