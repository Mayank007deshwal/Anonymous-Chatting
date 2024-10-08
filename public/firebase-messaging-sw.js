importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyALeqHjXlSLnVKpjfkFRapIGRfULCrWKNI",
  authDomain: "test-pro-007.firebaseapp.com",
  projectId: "test-pro-007",
  storageBucket: "test-pro-007.appspot.com",
  messagingSenderId: "693063552573",
  appId: "1:693063552573:web:9b2451f07dce4015a22454",
  measurementId: "G-PS7VNS17XJ",
};

// const firebaseConfig = {
//     apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//     authDomain: "test-pro-007.firebaseapp.com",
//     projectId: "test-pro-007",
//     storageBucket: "test-pro-007.appspot.com",
//     messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
//     appId: import.meta.env.VITE_APP_ID,
//     measurementId: import.meta.env.VITE_MEASUREMENT_ID,
//   };

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
