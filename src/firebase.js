import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC8aoEd5ar2pPPoy8uQO4F_ernbGy0pf4w",
    authDomain: "fir-antdesign.firebaseapp.com",
    projectId: "fir-antdesign",
    storageBucket: "fir-antdesign.appspot.com",
    messagingSenderId: "298162306665",
    appId: "1:298162306665:web:14b7fef08c50529342ecf8"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
