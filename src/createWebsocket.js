import { createConsumer } from "@rails/actioncable";
import { v4 as uuidv4 } from "uuid";
// import dotenv from "dotenv";
// dotenv.config();

const userId = localStorage.getItem("userId") || uuidv4();
localStorage.setItem("userId", userId);

// const consumer = createConsumer("ws://localhost:3000/cable");

const consumer = createConsumer(
  `${import.meta.env.VITE_WEBSOCKET_URL}/cable?user_id=${userId}`
);

// const consumer = createConsumer(`ws://localhost:3000/cable?user_id=${userId}`);

export const subscribeToPostChannel = (postId, callback) => {
  return consumer.subscriptions.create(
    { channel: "PostChannel", post_id: postId },
    {
      received(data) {
        callback(data);
      },
      speak(message) {
        this.perform("speak", { message, post_id: postId });
      },
    }
  );
};

export const subscribeToConversationChannel = (
  conversationId,
  currentUsrId,
  callback
) => {
  return consumer.subscriptions.create(
    {
      channel: "ConversationChannel",
      conversation_id: conversationId,
      current_user_id: currentUsrId,
    },
    {
      received(data) {
        callback(data);
      },
      speak(message) {
        this.perform("speak", { message, conversation_id: conversationId });
      },
    }
  );
};

export const findStranger = (callback) => {
  // const matchmakingChannel =
  return consumer.subscriptions.create("MatchmakingChannel", {
    connected() {
      this.perform("find_stranger");
    },
    received(data) {
      if (data.status === "found") {
        callback(data.room_id);
      }
    },
  });
};

export const subscribeToChatRoom = (roomId, onMessage) => {
  return consumer.subscriptions.create(
    { channel: "ChatRoomChannel", room_id: roomId },
    {
      received(data) {
        onMessage(data);
      },
      speak(message) {
        this.perform("speak", { message, userId });
      },
    }
  );
};
