import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyALONiSwSrhzWni5xi0jbAq0CfCWt7-JHE",
  authDomain: "review-ea048.firebaseapp.com",
  projectId: "review-ea048",
  storageBucket: "review-ea048.appspot.com",
  messagingSenderId: "740004342435",
  appId: "1:740004342435:web:1e5c20535b7103c1522d16"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const data = getFirestore();