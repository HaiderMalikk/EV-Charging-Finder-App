import { View, Text, Image } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '../../Utils/Colors';


// the header on top of the home screen includes logo and filter
// this is just the outline if the header
export default function Header() {
    const {user} = useUser(); // users info from clerk
  return (
    <View  style={{
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      paddingBottom: 10,
      paddingTop: 10,
      paddingHorizontal: 20,
    }} >

      <Image source={require('./../../../assets/images/app-logo-Transparent.png')} style = {{width: 140, height: 40, borderRadius: 10} }/>
      <FontAwesome name="filter" size={34} color = {Colors.buttonImportant} />
    </View>
  )
}