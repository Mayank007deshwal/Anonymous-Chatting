import { useEffect, useState, useRef } from "react";
import { subscribeToChatRoom } from "../createWebsocket";

const ChatRoom = ({ roomId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatRoom = useRef(null);
  const user = localStorage.getItem("userId");
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    // Avoid subscribing multiple times by checking if already subscribed
    if (!chatRoom.current) {
      console.log("use effect runned");
      chatRoom.current = subscribeToChatRoom(roomId, (data) => {
        setMessages((prev) => [...prev, data]);
      });
    }

    return () => {
      // Unsubscribe on unmount to clean up
      if (chatRoom.current) {
        chatRoom.current.unsubscribe();
        chatRoom.current = null;
      }
    };
  }, [roomId]); // If roomId changes, clean up the previous subscription

  const handleSend = (e) => {
    e.preventDefault();
    chatRoom.current.speak(newMessage);
    scrollToBottom();
    setNewMessage("");
  };

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>STRANGER</h1>
      </div>
      <div className="message-list">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message-bubble ${
              message.user_id === user ? "user" : "recipient"
            }`}
          >
            {message.message}
          </div>
        ))}
        <div ref={endOfMessagesRef} />
      </div>
      <form className="chat-input" onSubmit={handleSend}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit" className="btn btn-primary   mt-2">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatRoom;
