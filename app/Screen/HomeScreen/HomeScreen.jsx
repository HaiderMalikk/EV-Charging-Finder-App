// HomeScreen.js
import React from 'react';
import { View, Text } from 'react-native';
import AppMapView from './AppMapView';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  return (
    <SafeAreaView edges={[]}>
      <View>
        <AppMapView/>
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;