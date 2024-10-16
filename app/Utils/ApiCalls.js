import axios from "axios"
const GooglePlacesRequestURL = 'https://places.googleapis.com/v1/places:searchNearby'
const API_KEY = ''

// msking calls to nearby places using google places api using axios library 
// using google feild mask to filter places i need
// will return all places nearby 
const config={
    headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key':API_KEY,
        'X-Goog-Fieldmask':['places.displayName', 'places.formattedAddress', 'places.location', 
            'places.evChargeOptions', 'places.photos', 'places.shortFormattedAddress', 'places.id'
        ]

    }
}

// api call using axios
const newNearbyPlaces = (data)=>axios.post(GooglePlacesRequestURL, data, config);

export  default {newNearbyPlaces, API_KEY} // to use everywhere
