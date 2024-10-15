// ProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      {/* Profile picture in a circle with green outline */}
      <View style={styles.profilePicContainer}>
        <Image
          source={require('/Users/haidermalik/Documents/Code/Supa-Charger-App/assets/images/profile-pic.png')}
          style={styles.profilePic}
        />
      </View>

      {/* Welcome text */}
      <Text style={styles.welcomeText}>Welcome back, Haider!</Text>

      {/* Thank you message */}
      <Text style={styles.messageText}>Thank you for using Supa Charge!</Text>

      {/* Logout button */}
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

      {/* Learn More button */}
      <TouchableOpacity style={styles.learnMoreButton}>
        <Text style={styles.buttonText}>Learn More</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  profilePicContainer: {
    borderWidth: 5,
    borderColor: 'green',
    borderRadius: 100,
    padding: 5,
    marginBottom: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  messageText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  logoutButton: {
    backgroundColor: 'green',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 10,
    marginBottom: 20,
  },
  learnMoreButton: {
    backgroundColor: '#ddd',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  }
});

export default ProfileScreen;
