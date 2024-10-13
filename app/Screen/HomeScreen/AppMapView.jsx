import React from 'react';
import MapView, {PROVIDER_DEFAULT, PROVIDER_GOOGLE} from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

export default function App() {
  return (
    <View>
      <MapView
       style={styles.map}
       provider={PROVIDER_GOOGLE}
        //showsUserLocation={true}
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
