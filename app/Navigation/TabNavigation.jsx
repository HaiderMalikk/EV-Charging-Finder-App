import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screen/HomeScreen/HomeScreen';
import FavoriteScreen from '../Screen/FavoritesScreen/FavoritesScreen';
import ProfileScreen from '../Screen/ProfileScreen/ProfileScreen';
import AntDesign from '@expo/vector-icons/AntDesign';



import React from 'react';
import Colors from '../Utils/Colors';

// bottom 3 options for navigation
const Tab = createBottomTabNavigator();

// all options on bottom tab
export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      {/* screens */}
      <Tab.Screen name="Search" component={HomeScreen}
      options={{
        tabBarActiveTintColor:Colors.buttonImportant,
        tabBarIcon:({color})=>(
          <AntDesign name="search1" size={24} color={color}/>
        ),
      }} />
      <Tab.Screen name="Favorites" component={FavoriteScreen} 
      options={{
        tabBarActiveTintColor:Colors.buttonImportant,
        tabBarIcon:({color})=>(
          <AntDesign name="hearto" size={24} color={color} />
        ),
      }} />
      <Tab.Screen name="Profile" component={ProfileScreen} 
      options={{
        tabBarActiveTintColor:Colors.buttonImportant,

        tabBarIcon:({color})=>(
          <AntDesign name="profile" size={24} color={color} />
        ),
      }}/>
    </Tab.Navigator>
  );
}
