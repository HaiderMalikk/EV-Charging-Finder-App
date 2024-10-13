import React, { useContext } from 'react';
import MapView, {PROVIDER_DEFAULT, PROVIDER_GOOGLE} from 'react-native-maps';
import * as Location from 'expo-location';
import { StyleSheet, View } from 'react-native';
import MapStyle from '/Users/haidermalik/Documents/Code/Supa-Charger-App/app/Utils/MapStyle.json';
import { UserLocationContext } from '../../Context/UserLocationContext';

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


       />
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
