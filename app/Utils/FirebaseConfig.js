// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiZPvUDCw8mk-7cX09Omzl-ByCsXWRSVg",
  authDomain: "supa-charger.firebaseapp.com",
  projectId: "supa-charger",
  storageBucket: "supa-charger.appspot.com",
  messagingSenderId: "1020157423336",
  appId: "1:1020157423336:web:deb3d1281c7e3be21fe35d",
  measurementId: "G-EZX88PZWYB"
};


export const app = initializeApp(firebaseConfig)