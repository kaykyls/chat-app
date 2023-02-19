// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNHcS7QoWregGkj-ob2WiVAWnzo4Euq3g",
  authDomain: "chat-app-43aa6.firebaseapp.com",
  projectId: "chat-app-43aa6",
  storageBucket: "chat-app-43aa6.appspot.com",
  messagingSenderId: "944700318216",
  appId: "1:944700318216:web:754f99dc667f728db067bd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()