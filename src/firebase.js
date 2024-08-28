// src/firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyALeqHjXlSLnVKpjfkFRapIGRfULCrWKNI",
  authDomain: "test-pro-007.firebaseapp.com",
  projectId: "test-pro-007",
  storageBucket: "test-pro-007.appspot.com",
  messagingSenderId: "693063552573",
  appId: "1:693063552573:web:9b2451f07dce4015a22454",
  measurementId: "G-PS7VNS17XJ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

// export { messaging };
