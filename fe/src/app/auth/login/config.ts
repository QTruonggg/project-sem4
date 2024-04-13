// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtgaczjwNwItHq4YhUTLX5QBrpbhAgkLE",
  authDomain: "flawless-agency-388914.firebaseapp.com",
  projectId: "flawless-agency-388914",
  storageBucket: "flawless-agency-388914.appspot.com",
  messagingSenderId: "789696214197",
  appId: "1:789696214197:web:cb6a38ffff96604f003afc",
  measurementId: "G-5JV52NVTVG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };