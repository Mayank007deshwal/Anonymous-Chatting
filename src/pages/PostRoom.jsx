import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { subscribeToPostChannel } from "../createWebsocket";
const PostRoom = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { id: postId } = useParams();
  let subscription;

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_SERVER_URL}/posts/${postId}/messages`
      );
      const data = await response.json();
      //   console.log(data);
      setMessages(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = {
      body: newMessage, // This is the data you want to send
    };
    createMessage(message);
  };

  const createMessage = async (message) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_SERVER_URL}/posts/${postId}/messages`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(message),
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setNewMessage("");
    }
  };

  useEffect(() => {
    fetchMessages();
    subscription = subscribeToPostChannel(postId, (data) => {
      setMessages((prevMessages) => [...prevMessages, data.message]);
      console.log("message:", data.message);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [postId]);
  return (
    <div>
      <div>
        {messages.map((msg) => (
          <ul key={msg.id}>
            <li key={msg.id}>
              <p key={msg.id}>{msg.body}</p>
            </li>
          </ul>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default PostRoom;
