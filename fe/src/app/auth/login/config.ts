// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCubVqr6u3P9-naB_eBGMXRI0qmJjTYprA",
  authDomain: "vhomestay-9e7cc.firebaseapp.com",
  databaseURL: "https://vhomestay-9e7cc-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "vhomestay-9e7cc",
  storageBucket: "vhomestay-9e7cc.appspot.com",
  messagingSenderId: "632172848685",
  appId: "1:632172848685:web:e44c251eea0b56bd8abaa4",
  measurementId: "G-GMK2N12MYT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
