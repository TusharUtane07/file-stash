import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBbcaHSV8W4l6OYJ2By0b3aT4zEoj3NG5c",
  authDomain: "filesharing-ff5f6.firebaseapp.com",
  projectId: "filesharing-ff5f6",
  storageBucket: "filesharing-ff5f6.appspot.com",
  messagingSenderId: "603197109210",
  appId: "1:603197109210:web:2852764e8cad761cfdc6e3"
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
// export const db = fire