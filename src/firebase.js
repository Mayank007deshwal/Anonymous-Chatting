// src/firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: VITE_FIREBASE_API_KEY,
  authDomain: "test-pro-007.firebaseapp.com",
  projectId: "test-pro-007",
  storageBucket: "test-pro-007.appspot.com",
  messagingSenderId: VITE_MESSAGING_SENDER_ID,
  appId: VITE_APP_ID,
  measurementId: MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

// export { messaging };
