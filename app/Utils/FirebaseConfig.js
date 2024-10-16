// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "",
  authDomain: "good-v2.firebaseapp.com",
  projectId: "good-v2",
  storageBucket: "good-v2.appspot.com",
  messagingSenderId: "932685752441",
  appId: "1:932685752441:web:38cf930a927482e7678ca8",
  measurementId: "G-1T4SPG35CE"
};


export const app = initializeApp(firebaseConfig)