import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCelWMzo6V3qhPHa-eduj63kM4WL1dKqKM",
  authDomain: "task-management-18cad.firebaseapp.com",
  projectId: "task-management-18cad",
  storageBucket: "task-management-18cad.firebasestorage.app",
  messagingSenderId: "501213409391",
  appId: "1:501213409391:web:e2f14cc45e34c50e995d9a",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
