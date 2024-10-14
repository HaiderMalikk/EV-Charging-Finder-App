// HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppMapView from './AppMapView';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from './Header';
import SearchBar from './SearchBar';

// home screen includes map header and serch bar 
const HomeScreen = () => {
  return (
    // this returns to the home screen the header folllowed by the serch bar and then the map each one has its own file
    <View>
      <View style={styles.header}>
        <Header/>
        <SearchBar  searchedLocation={(location) => console.log(location)} />
      </View>
      <AppMapView/>
    </View>
  );
}

const styles = StyleSheet.create({
  header:{
    position:'absolute',
    zIndex: 10,
    padding: 10,
    width: '100%',
    paddingHorizontal: 20
  }
  
})

export default HomeScreen;