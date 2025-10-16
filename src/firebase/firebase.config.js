// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_kRthgl8zoxoULrSN0yCiC3mT5EgGW7A",
  authDomain: "fir-fighter-cbdf1.firebaseapp.com",
  projectId: "fir-fighter-cbdf1",
  storageBucket: "fir-fighter-cbdf1.firebasestorage.app",
  messagingSenderId: "925270847277",
  appId: "1:925270847277:web:7f105b0efa87c34ff82da4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);


