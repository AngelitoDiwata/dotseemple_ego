import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"

const firebaseConfig = {
    apiKey: "AIzaSyB2ME9ixot8Gpi_5CV4LpGN1b6rLEid-dM",
    authDomain: "dotseemple-dev.firebaseapp.com",
    databaseURL: "https://dotseemple-dev-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "dotseemple-dev",
    storageBucket: "dotseemple-dev.appspot.com",
    messagingSenderId: "276412099994",
    appId: "1:276412099994:web:e288744d41f03c89fede23",
    measurementId: "G-0Q5PXN96WY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)