import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDNHcS7QoWregGkj-ob2WiVAWnzo4Euq3g",
  authDomain: "chat-app-43aa6.firebaseapp.com",
  projectId: "chat-app-43aa6",
  storageBucket: "chat-app-43aa6.appspot.com",
  messagingSenderId: "944700318216",
  appId: "1:944700318216:web:754f99dc667f728db067bd"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore()