import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyD5SAxjD_ehHaL_8-PoxgEfKq2ojKEeymM",
  authDomain: "tigerlab-b9df4.firebaseapp.com",
  projectId: "tigerlab-b9df4",
  storageBucket: "tigerlab-b9df4.appspot.com",
  messagingSenderId: "220495614982",
  appId: "1:220495614982:web:688c3b03d6c3af4d8d5f87",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// analytics
const firestore = firebase.firestore();
export { firebase, firestore };
