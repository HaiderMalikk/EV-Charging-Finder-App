import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'

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

      <View style={{padding:10}}>
            <Text style={styles.heading}>SupaCharge, The Free Ev Charging Station Finder</Text>
            <Text style={styles.subheading}>Find your nearest charging station with SupaCharge</Text>
            <TouchableOpacity style={styles.buttons} onPress={() => alert('Login Using Google')}>
                <Text style={{color:Colors.White, fontFamily: 'outfit-bold', fontSize: 16, textAlign: 'center'}}>Login Using Google</Text>
            </TouchableOpacity>
      </View>
      
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
    },
    heading:{
        fontSize: 24,
        fontFamily: 'outfit-bold',
        textAlign: 'center',
        marginTop: 0

    },
    subheading: {
        fontSize: 14,
        fontFamily: 'outfit-light',
        textAlign: 'center',
        marginTop: 10,
        color:Colors.Secondary
    },
    buttons:{
        padding: 16,
        borderRadius: 80,
        marginTop: 40,
        backgroundColor: Colors.buttonImportant,
        justifyContent: 'center',
        alignItems: 'center',
    }
    
})