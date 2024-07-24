
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY ,
  authDomain: "filmax-1c22f.firebaseapp.com",
  projectId: "filmax-1c22f",
  storageBucket: "filmax-1c22f.appspot.com",
  messagingSenderId: "1056285811131",
  appId: "1:1056285811131:web:628abc8de39f054eb0a49e",
  measurementId: "G-Z3YY71W1N8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
const db = getFirestore(app);
export {auth, provider, db};