import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDMXc3L76EuOTLHBQ8pWaS8p8EWMoNKJx8",
  authDomain: "chat-app-483b2.firebaseapp.com",
  projectId: "chat-app-483b2",
  storageBucket: "chat-app-483b2.appspot.com",
  messagingSenderId: "7015644493",
  appId: "1:7015644493:web:91c84dd35b7966f4c10b04",
  measurementId: "G-YB43H5K3WE"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore()