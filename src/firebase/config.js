
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCcSh2nW7rp5Q_W4urViYxW1zLLzsWPGQ0",
  authDomain: "miniblog-stenio.firebaseapp.com",
  projectId: "miniblog-stenio",
  storageBucket: "miniblog-stenio.appspot.com",
  messagingSenderId: "488376476108",
  appId: "1:488376476108:web:dab37ddf9e00c512ab7d69"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };