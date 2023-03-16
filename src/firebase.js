import { initializeApp } from "firebase/app";
import { getDatabase, limitToFirst, limitToLast } from "firebase/database"
import {set, ref, onValue, update, get, query, orderByChild, equalTo } from "firebase/database";
/**
 * PROD CONFIG
 */
const firebaseConfig_prod = {
    apiKey: "AIzaSyCXNxwO0tTSgZB18291RRiR-c6CJIaB98k",
    authDomain: "dotseemple-50203.firebaseapp.com",
    databaseURL: "https://dotseemple-50203-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "dotseemple-50203",
    storageBucket: "dotseemple-50203.appspot.com",
    messagingSenderId: "915461456977",
    appId: "1:915461456977:web:b91140403ed642f5326470"
};

/**
 * DEV TEST CONFIG
 */
// const firebaseConfig_prod = {
//     apiKey: "AIzaSyB2ME9ixot8Gpi_5CV4LpGN1b6rLEid-dM",
//     authDomain: "dotseemple-dev.firebaseapp.com",
//     databaseURL: "https://dotseemple-dev-default-rtdb.asia-southeast1.firebasedatabase.app",
//     projectId: "dotseemple-dev",
//     storageBucket: "dotseemple-dev.appspot.com",
//     messagingSenderId: "276412099994",
//     appId: "1:276412099994:web:e288744d41f03c89fede23",
//     measurementId: "G-0Q5PXN96WY"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig_prod);
export const db = getDatabase(app)

/**
 * Get current User by Handle
 */

export function getUserByHandle(handle) {
    return get(query(ref(db, '/data'), orderByChild('handle'), equalTo(handle.toUpperCase())))
}

/**
 * Get top 40
 */

export function getTop40() {
    return get(query(ref(db, '/data'), orderByChild('connections'), limitToLast(40)))
}

/**
 * Update userPoint
 */

export function incrementUserPoint(data) {
    update(ref(db, `/data/${data.uuid}`), { connections: data.collections.length, collections: data.collections });
}