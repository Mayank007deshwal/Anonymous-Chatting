import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../style/Chat.css"; // Make sure to create this CSS file for styles
import { subscribeToConversationChannel } from "../createWebsocket";
import { useUser } from "../contextProvider/UserContext";

const Chat = () => {
  const { name, receipient_id } = useParams();
  const { id: currentUserId } = JSON.parse(localStorage.getItem("user"));
  const [conversationId, setConversationId] = useState(null);
  let subscription;
  const user = useUser();
  const navigate = useNavigate();
  const endOfMessagesRef = useRef(null);

  //   const currentUserId = 33;
  //   console.log("currentUserId:", currentUserId);
  // Example messages, in a real app you might fetch these from an API
  const [messages, setMessages] = useState([]);
  //   [
  //     {
  //       id: 14,
  //       conversation_id: 2,
  //       sender_id: 32,
  //       content: "first chat message",
  //       created_at: "2024-08-24T19:41:32.959Z",
  //       updated_at: "2024-08-24T19:41:32.959Z",
  //     },
  //     {
  //       id: 15,
  //       conversation_id: 2,
  //       sender_id: 33,
  //       content: "second chat message",
  //       created_at: "2024-08-24T19:41:32.959Z",
  //       updated_at: "2024-08-24T19:41:32.959Z",
  //     },
  //   ]
  const [newMessage, setNewMessage] = useState("");

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    // Ensure the newMessage is not just whitespace
    if (newMessage.trim()) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_WEBSOCKET_URL}/chats`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              chat: {
                content: newMessage.trim(),
              },
              recipient_id: receipient_id,
            }),
          }
        );

        if (!response.ok) {
          // Handle non-200 HTTP responses
          throw new Error("Failed to send message");
        }

        const result = await response.json();
        if (!conversationId) {
          setConversationId(response.conversation_id);
        }

        // Assuming the server returns the message data
        // setMessages([...messages, result]);
        setNewMessage(""); // Clear the input after sending

        // Optionally handle the result from the server
        console.log("Message sent successfully:", result);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_WEBSOCKET_URL
        }/chats?receipient_id=${receipient_id}`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("bad response from server.");
      }

      const data = await response.json();
      setMessages(data);
      if (data.length > 0) {
        setConversationId(data[0].conversation_id);
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    fetchMessages();
    scrollToBottom();

    subscription = subscribeToConversationChannel(
      conversationId,
      currentUserId,
      (data) => {
        setMessages((prevMessages) => [...prevMessages, data.message]);
        console.log("message:", data.message);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [conversationId, receipient_id]);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>{name}'s Inbox</h1>
      </div>
      <div className="message-list">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`message-bubble ${
              message.sender_id === currentUserId ? "user" : "recipient"
            }`}
          >
            {message.content}
          </div>
        ))}
        <div ref={endOfMessagesRef} />
      </div>
      <form className="chat-input" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={handleInputChange}
          placeholder="Type a message..."
        />
        <button type="submit" className="btn btn-primary   mt-2">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
