import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

export default function LoginScreen() {
  return (
    <View style= {{
        display : 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -20
    }
    }>
      <Image source={require('/Users/haidermalik/Documents/Code/EV-Charging-Finder-App/assets/images/app-logo.png')}
      style={styles.appLogo}
      />
      <Image source={require('/Users/haidermalik/Documents/Code/EV-Charging-Finder-App/assets/images/ev-charging.png')}
      style={styles.appArt} 
      />
      
    </View>
  )
}

const styles = StyleSheet.create({
    appLogo:{
        width: 260,
        height: 200,
        objectFit: 'contain',
    },
    appArt:{
        width: 400,
        height: 200,
        marginTop: -80,
        objectFit: 'cover',
    }
    
})