import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCGJw9i9fjzT9Z_tSwMP7qcVPbJiTW2Y-s",
  authDomain: "reto-diario-51f26.firebaseapp.com",
  databaseURL: "https://reto-diario-51f26-default-rtdb.firebaseio.com",
  projectId: "reto-diario-51f26",
  storageBucket: "reto-diario-51f26.firebasestorage.app",
  messagingSenderId: "653206805596",
  appId: "1:653206805596:web:07959d3ed281b6eac29a99",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
