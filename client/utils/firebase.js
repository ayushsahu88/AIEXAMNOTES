import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "authexamnotes-abdc9.firebaseapp.com",
  projectId: "authexamnotes-abdc9",
  storageBucket: "authexamnotes-abdc9.firebasestorage.app",
  messagingSenderId: "334406611408",
  appId: "1:334406611408:web:edc23d831fa7c3de3089d5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { auth, provider };
