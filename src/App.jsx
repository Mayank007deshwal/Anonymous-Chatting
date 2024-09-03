import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Form from "./pages/Form";
import { messaging } from "./firebase.js";
import { getToken, onMessage } from "firebase/messaging";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PostRoom from "./pages/PostRoom.jsx";
import Layout from "./components/Layout.jsx";
import Chat from "./pages/Chat.jsx";
import LoginForm from "./pages/LoginForm.jsx";
import AnonymousChat from "./pages/AnonymousChat.jsx";
import { useUser } from "./contextProvider/UserContext.jsx";

function App() {
  const { user } = useUser();
  async function requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      //generate token
      if (!user.devise_id && !localStorage.getItem("devise_id")) {
        const token = await getToken(messaging, {
          vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
        });
        console.log("token:", token);

        userDeviseId(token);
      }
    } else if (permission === "denied") {
      alert("you denied for the notification");
    }
  }

  const userDeviseId = async (token) => {
    console.log("devise id backend API called");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_WEBSOCKET_URL}/users/add_device_token`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ devise_id: token }),
        }
      );

      const data = await response.json();
      localStorage.setItem("devise_id", data.devise_id);
    } catch (error) {
      console.log("error:", error);
    }
  };

  useEffect(() => {
    if (user) {
      requestPermission(); //Need UPdate to implement notification //devise_token need to be saved on database
      const handleForegroundNotification = () => {
        onMessage(messaging, (payload) => {
          console.log("Message received. ", payload);
          // Customize notification
          const { title, body } = payload.notification;
          if (Notification.permission === "granted") {
            toast(title);
          }
        });
      };
      handleForegroundNotification();
    }
  }, [user]);

  return (
    <Layout>
      <ToastContainer />
      <Routes>
        <Route path="/anonymous-chat" element={<AnonymousChat />} />
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Form />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/posts/:id" element={<PostRoom />} />
        <Route path="/inbox/:receipient_id/:name" element={<Chat />} />
      </Routes>
    </Layout>
  );
}

export default App;
