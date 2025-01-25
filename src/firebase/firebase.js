import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBBjVuLEE8h7UOAImYu9dijwSLHX4Ns7HM",
  authDomain: "hoyahack-e2d0a.firebaseapp.com",
  projectId: "hoyahack-e2d0a",
  storageBucket: "hoyahack-e2d0a.firebasestorage.app",
  messagingSenderId: "973698940044",
  appId: "1:973698940044:web:0b88a2b62fc1866ce48fa9",
  measurementId: "G-CY5F00S6F5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { app, analytics, auth, googleProvider, facebookProvider };
