import { initializeApp } from "firebase/app";
import { Firestore } from "firebase/firestore";
import { getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBgOoMVsBLKN3OSTnsQdXp5klzdEUcaJ3k",
  authDomain: "filesharingapp-3f39f.firebaseapp.com",
  projectId: "filesharingapp-3f39f",
  storageBucket: "filesharingapp-3f39f.appspot.com",
  messagingSenderId: "1067856216309",
  appId: "1:1067856216309:web:f20b6be75c3b4f60b385bc"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
// export const db = fire