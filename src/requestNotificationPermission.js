// src/requestNotificationPermission.js
import { messaging } from "./firebase";
import { getToken } from "firebase/messaging";

export const requestPermission = async () => {
  try {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      console.log("Notification permission granted.");
      // Get the device token
      const token = await getToken(messaging, {
        vapidKey: VITE_FIREBASE_VAPID_KEY,
        // "BD_IPh85bviAAKG6h90evBfAGhygtNXcRZt4hxtNtai1B6PeD1-GbaptTZpVHdXPMdPy4bli7Lo6YR_-JMu0heY",
      });
      console.log("FCM Token:", token);
      return token;
    } else {
      console.log("Unable to get permission to notify.");
    }
  } catch (error) {
    console.log("Error getting permission or token:", error);
  }
};
