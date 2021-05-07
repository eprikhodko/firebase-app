// Firebase App (the core Firebase SDK) is always required and must be listed first
import Firebase from "firebase/app"
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// import {seedDatabase} from "../seed"

// Add the Firebase products that you want to use
// import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyDuEwmT2cV58YFWHEuXbTijl-skMkP-eWY",
    authDomain: "fir-app-da0cd.firebaseapp.com",
    projectId: "fir-app-da0cd",
    storageBucket: "fir-app-da0cd.appspot.com",
    messagingSenderId: "587114597583",
    appId: "1:587114597583:web:85879109373d8dfc92fbba"
  }

  // Initialize Firebase
const firebase = Firebase.initializeApp(firebaseConfig)

export {firebase}