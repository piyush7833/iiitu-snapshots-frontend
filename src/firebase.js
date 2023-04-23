import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider,GithubAuthProvider} from "firebase/auth"
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
// import dotenv from "dotenv"
// dotenv.config();
const firebaseConfig = {
  apiKey: "AIzaSyCXKMDZ3W24Y4FvmVhmXskHK4g_g9wZP-M",
  authDomain: "iiitusnapshots.firebaseapp.com",
  projectId: "iiitusnapshots",
  storageBucket: "iiitusnapshots.appspot.com",
  messagingSenderId: "611264932472",
  appId: "1:611264932472:web:98cd841e647f1100279b8d",
  measurementId: "G-7Q9T44P1Y6"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth=getAuth();
export const gprovider =new GoogleAuthProvider();
export const giprovider =new GithubAuthProvider();
export const storage=firebase.storage();
const analytics = getAnalytics(app);
export default app;