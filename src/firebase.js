// firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
import { getDatabase } from "firebase/database"; // Import Realtime Database


const firebaseConfig = {
    apiKey: "AIzaSyAMBAA1itWSt00YNgSQ8dYxsNRrE0Wcp7g",
    authDomain: "nftlogin-4c285.firebaseapp.com",
    projectId: "nftlogin-4c285",
    storageBucket: "nftlogin-4c285.appspot.com",
    messagingSenderId: "486586800515",
    appId: "1:486586800515:web:b8b4ec3ee7df4f0a1c3eb6",
    measurementId: "G-1CPB53B2T8"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app); // Initialize Realtime Database

const provider = new GoogleAuthProvider();
// const fbprovider = new FacebookAuthProvider();

export { auth,database, provider, app as default };


