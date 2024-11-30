// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4t8Msy7XsiWWghEuUdDoq4cIvJIc0BAY",
  authDomain: "products-c05ed.firebaseapp.com",
  projectId: "products-c05ed",
  storageBucket: "products-c05ed.firebasestorage.app",
  messagingSenderId: "1009173919205",
  appId: "1:1009173919205:web:0f004d508e98830192ab0c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth=getAuth(app);

