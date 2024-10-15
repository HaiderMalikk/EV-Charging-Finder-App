import { View, Text, Image, Dimensions, Pressable } from 'react-native'
import Toast from 'react-native-root-toast'
import React from 'react'
import Colors from '../../Utils/Colors'
import ApiCalls from '../../Utils/ApiCalls'
import { LinearGradient } from 'expo-linear-gradient'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';
import { getFirestore} from "firebase/firestore";
import App from '../../../App'
import { app } from '../../Utils/FirebaseConfig'
import { doc, setDoc } from "firebase/firestore";
import { useUser } from '@clerk/clerk-expo'


// here we create the individual place iteam meanig the indivisual charger and its info the collection these are displayed in place list using flat list which is then displayed on home screen
// passes place as a prop this is freom place list place = item in place list, make sure to pass in using '{}' as its a prop
// here i get multiple things like image, name, address of the place
export default function PlaceItem({place}) {
    const BASE_PLACE_PHOTO_URL = "https://places.googleapis.com/v1/"
    // Initialize Cloud Firestore and get a reference to the service, then storing what we want on click here we set to fav, we will store the data as its place info
    const {user}=useUser(); // t olog the user that saved to fav uses cleark user
    const db = getFirestore(app);
    const SetFavorite=async()=>{
        await setDoc(doc(db, "ev-fav-charger", (place.id).toString()), {
        place:place, name:user }

    );
    alert(place.displayName?.text + "Is Added To Favorites!")

        
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

        {/* Pressable Heart Icon */}
        <Pressable 
        style={{ position: 'absolute', padding: 10, right: 0 }} 
        onPress={() => SetFavorite()}  // on press add to fav
        >
            <AntDesign name="hearto" size={24} color="white" />
        </Pressable>


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
                
                {/* Location arrow icon  and heart icon*/}
                <FontAwesome6 name="location-arrow" size={24} color={Colors.buttonImportant}/>
                
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