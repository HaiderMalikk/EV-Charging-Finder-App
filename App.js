import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import LoginScreen from './app/Screen/LoginScreen/LoginScreen';
import { ClerkProvider,ClerkLoaded, SignedIn, SignedOut } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store'
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './app/Navigation/TabNavigation';
import * as Location from 'expo-location';
import { UserLocationContext } from './app/Context/UserLocationContext';

SplashScreen.preventAutoHideAsync();

// to save login info in expo secure store
const tokenCache = {
  async getToken(key) {
    try {
      const item = await SecureStore.getItemAsync(key)
      if (item) {
        console.log(`${key} was used 🔐 \n`)
      } else {
        console.log('No values stored under key: ' + key)
      }
      return item
    } catch (error) {
      console.error('SecureStore get item error: ', error)
      await SecureStore.deleteItemAsync(key)
      return null
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (err) {
      return
    }
  }
}

export default function App() {
  // custom font
  const [loaded, error] = useFonts({
    'outfit': require('./assets/fonts/Outfit-Regular.ttf'),
    'outfit-light': require('./assets/fonts/Outfit-Light.ttf'),
    'outfit-med': require('./assets/fonts/Outfit-SemiBold.ttf'),
    'outfit-bold': require('./assets/fonts/Outfit-Bold.ttf'),
  });

  // getting user location on start (popup will ask for premision) once granted it is set by setlocation
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
      console.log(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }



  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {

  }

  // login screen is shown using this
  return (
    // cleark provided api and token 
    <ClerkProvider 
    tokenCache={tokenCache}
    publishableKey={'pk_live_bWFzdGVyLWdvYXQtOTMuY2xlcmsuYWNjb3VudHMuZGV2JA'}
    >
      
      {/* here from clerk we get signed in and out states and we display what we want to display in those two states s out is login scr s in and you get home screen */}
      {/* NOTE: this is wrapped in user location so the location premision is rememebred and can be used either when signed in or signed out */}
      <UserLocationContext.Provider value = {{location, setLocation}}>
        <View style={styles.container}>
          <SignedIn>
            <NavigationContainer>
              <TabNavigation/>
            </NavigationContainer>
          </SignedIn>
          <SignedOut>
          <NavigationContainer>
              <TabNavigation/>
            </NavigationContainer>
          </SignedOut>
        </View>
      </UserLocationContext.Provider>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop:40
  },
});
