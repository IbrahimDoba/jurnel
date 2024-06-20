import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAd9GoRBTisdTOMgf8hGpg39f-BS7I0UY",
  authDomain: "jurnel-96e52.firebaseapp.com",
  projectId: "jurnel-96e52",
  storageBucket: "jurnel-96e52.appspot.com",
  messagingSenderId: "916849889024",
  appId: "1:916849889024:web:3fbff48f215a8036beede5",
  measurementId: "G-X2Y68JPRWF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAnalytics = getAnalytics(app);
// DB
export const db = getFirestore(app);
export const journalCollectionRef = collection(db, "journal");
export const todoCollectionRef = collection(db, "todo");
export const todoItemsCollectionRef = collection(db, "todoItem");
export const subscriptionCollectionRef = collection(db, "subscription");

// AUTH
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
