import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, Button } from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '../../Utils/Colors';
import Slider from '@react-native-community/slider';

export default function Header({ maxResult, radius, setMaxResult, setRadius, getNearbyPlaces }) {
    const { user } = useUser(); // users info from clerk
    const [modalVisible, setModalVisible] = useState(false);
    const [localRadius, setLocalRadius] = useState(radius); // local state for radius slider
    const [localMaxResult, setLocalMaxResult] = useState(maxResult); // local state for max result slider

    // Apply filter and refresh nearby places
    const applyFilter = () => {
        setRadius(localRadius); // Update radius
        setMaxResult(Math.floor(localMaxResult)); // Ensure maxResult is an integer
        setModalVisible(false);
        getNearbyPlaces(); // Call the function to refresh nearby places
    };

    return (
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: 10,
            paddingTop: 10,
            paddingHorizontal: 20,
        }}>
            <Image source={require('./../../../assets/images/app-logo-Transparent.png')} style={{ width: 140, height: 40, borderRadius: 10 }} />
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <FontAwesome name="filter" size={34} color={Colors.buttonImportant} />
            </TouchableOpacity>

            {/* Modal for filter sliders */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                }}>
                    <View style={{
                        width: '80%',
                        padding: 20,
                        backgroundColor: 'white',
                        borderRadius: 10,
                        alignItems: 'center',
                    }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>Filter Chargers</Text>

                        <Text>Radius: {localRadius} meters</Text>
                        <Slider
                            style={{ width: '100%', height: 40 }}
                            minimumValue={1000}
                            maximumValue={20000}
                            value={localRadius}
                            onValueChange={(value) => setLocalRadius(value)}
                            minimumTrackTintColor={Colors.buttonImportant}
                            maximumTrackTintColor={Colors.grey}
                        />

                        <Text style={{ marginTop: 20 }}>Max Results: {localMaxResult}</Text>
                        <Slider
                            style={{ width: '100%', height: 40 }}
                            minimumValue={1}
                            maximumValue={50}
                            value={localMaxResult}
                            onValueChange={(value) => setLocalMaxResult(value)}
                            minimumTrackTintColor={Colors.buttonImportant}
                            maximumTrackTintColor={Colors.grey}
                        />

                        <View style={{ flexDirection: 'row', marginTop: 30 }}>
                            <Button title="Apply" onPress={applyFilter} />
                            <Button title="Cancel" color="red" onPress={() => setModalVisible(false)} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
