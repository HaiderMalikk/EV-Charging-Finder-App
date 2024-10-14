import React, { useContext } from 'react';
import MapView, {Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE} from 'react-native-maps';
import * as Location from 'expo-location';
import { Image, StyleSheet, View } from 'react-native';
import MapStyle from '/Users/haidermalik/Documents/Code/Supa-Charger-App/app/Utils/MapStyle.json';
import { UserLocationContext } from '../../Context/UserLocationContext';

// map settings and user location note map is only returned if user location is avalible
export default function AppMapView() {
  const {location, setLocation} = useContext(UserLocationContext);
  // only show map if location avalible
  return location?.latitude&&(
    <View>
      <MapView
       style={styles.map}
       provider={PROVIDER_GOOGLE}
       customMapStyle={MapStyle} // custom map using google maps wizard
        // user location using expo-location
        region={{
          latitude: location?.latitude,
          longitude: location?.longitude,
          latitudeDelta: 0.1922,
          longitudeDelta: 0.1421,
        }}


       >
        {/* user location marker (is the car logo in assets ) */}
        <Marker
          coordinate={{
            latitude: location?.latitude,
            longitude: location?.longitude,
          }}>
            <Image source={require('/Users/haidermalik/Documents/Code/Supa-Charger-App/assets/images/car-logo.png')}
            style={{width: 30, height: 30}}
             />
          </Marker>

       </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
