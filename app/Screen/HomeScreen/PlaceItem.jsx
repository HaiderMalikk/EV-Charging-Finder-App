import { View, Text, Image, Dimensions, Pressable, Platform, Linking } from 'react-native'
import Toast from 'react-native-root-toast'
import React from 'react'
import Colors from '../../Utils/Colors'
import ApiCalls from '../../Utils/ApiCalls'
import { LinearGradient } from 'expo-linear-gradient'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';
import { getFirestore} from "firebase/firestore";
import { app } from '../../Utils/FirebaseConfig'
import { doc, setDoc } from "firebase/firestore";
import { useUser } from '@clerk/clerk-expo'
import { deleteDoc } from "firebase/firestore";


// here we create the individual place iteam meanig the indivisual charger and its info the collection these are displayed in place list using flat list which is then displayed on home screen
// passes place as a prop this is freom place list place = item in place list, make sure to pass in using '{}' as its a prop
// here i get multiple things like image, name, address of the place
export default function PlaceItem({place, isFav, marked}) {
    const BASE_PLACE_PHOTO_URL = "https://places.googleapis.com/v1/"


    // on press we will take the user to the location of the charger
    const onLocationPress=()=>{
        const url=Platform.select({
            ios:"maps:"+place?.location.latitude+","+place?.location.longitude+"?q="+place?.formattedAddress,
            andriod:"geo:"+place?.location.latitude+","+place?.location.longitude+"?q="+place?.formattedAddress,
        });
        Linking.openURL(url);
    }


    // Initialize Cloud Firestore and get a reference to the service, then storing what we want on click here we set to fav, we will store the data as its place info
    const {user}=useUser(); // to log the user that saved to fav uses cleark user
    const db = getFirestore(app);
    // setting and removing favorite from firebase the marked is to refresh the fav list once we favorite or unfav
    const SetFavorite=async()=>{
        await setDoc(doc(db, "ev-fav-charger", (place.id).toString()), {
        place:place, name:"user" }

    );
    marked()
    alert(place.displayName?.text + "Is Added To Favorites!")
    }

    const RemoveFavorite=async(placeId)=>{
        await deleteDoc(doc(db, "ev-fav-charger", placeId));
        alert(place.displayName?.text+ "Is Removed From Favorites!")
        marked()
    }

  return (
    <View 
    style={{width:Dimensions.get('screen').width*0.95 ,backgroundColor:Colors.White, borderRadius: 10, marginLeft: 10, marginRight: 10, marginBottom: 10}} 
    >


    {/* linear gradient effect for card */}
    <LinearGradient
     colors={[ 'transparent', '#afb3ba','#fff']}
     style={{borderRadius: 10}}
    >

    {/* If the place is a favorite, show a red heart and remove it from favorites on press */}
    {isFav ? (
        <Pressable 
            style={{ position: 'absolute', padding: 10, right: 0 }} 
            onPress={() => RemoveFavorite(place.id)}  // on press, remove from favorites
        >
            <AntDesign name="heart" size={24} color="red" />
        </Pressable>
        ) : (
        /* If the place is not a favorite, show a white (outlined) heart and add it to favorites on press */
        <Pressable 
            style={{ position: 'absolute', padding: 10, right: 0 }} 
            onPress={() => SetFavorite(place)}  // on press, add to favorites
        >
            <AntDesign name="hearto" size={24} color="white" />
        </Pressable>
    )}


      {/* image of the place  NOTE: uses place photo from google cloud places api, to get pic we base url and add the requered stuff to it, not that we must add uri at start as ist a url. it also uses the nameto get pic and we alredy have that, if pic DNE use deafault*/}
      <Image
        source={place?.photos && place.photos.length > 0 ? 
        {uri: `${BASE_PLACE_PHOTO_URL}${place.photos[0].name}/media?key=${ApiCalls.API_KEY}&maxHeightPx=800&maxWidthPx=1200`} 
        : require('./../../../assets/images/ev-charging.png')} 
        style={{width: '100%', borderRadius: 10, height: 150, zIndex: -10}}
        />


        <View style={{ padding: 10 }}>
            {/* Row with name, address, and location icon */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* Name and address */}
                <View style={{ flex: 1 }}>
                    <Text  
                        style={{ fontSize: 15, fontFamily: 'outfit-bold' }}
                    >
                        {place.displayName?.text}
                    </Text>
                    <Text  
                        style={{ fontSize: 12, fontFamily: 'outfit', color: Colors.Secondary }}
                    >
                        {place.shortFormattedAddress}
                    </Text>
                </View>
                
                <Pressable onPress={()=>onLocationPress()}>
                {/* Location arrow icon on press navigates to the ping*/}

                    <FontAwesome6 name="location-arrow" size={24} color={Colors.buttonImportant}/>
                </Pressable>
            </View>
        </View>

      {/* charger information */}
      <View style={{ padding: 10, marginTop: -10 }}>
        <Text style={{ fontSize: 12, fontFamily: 'outfit', color:Colors.buttonImportant }}>
            {place?.evChargeOptions?.connectorCount ? 
             `Connectors: ${place.evChargeOptions.connectorCount}` : 
            'Connectors Info NA'}
        </Text>
     </View>

     </LinearGradient>
    </View>
    
  )
}