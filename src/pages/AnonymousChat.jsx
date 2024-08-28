import React, { useEffect, useRef, useState } from "react";
import { findStranger } from "../createWebsocket";
import ChatRoom from "../components/ChatRoom";
import Spinner from "../components/Spinner";
const AnonymousChat = () => {
  const [roomId, setRoomId] = useState(null);
  const [loading, setLoding] = useState(false);
  const chatRoom = useRef(null);

  const handleFindStranger = () => {
    setLoding(true);
    chatRoom.current = findStranger((id) => {
      setRoomId(id);

      setLoding(false);
    });
  };

  useEffect(() => {
    // if (chatRoom.current) {
    //   chatRoom.current.unsubscribe();
    //   chatRoom.current = null;
    // }

    return () => {
      // Unsubscribe on unmount to clean up
      if (chatRoom.current) {
        chatRoom.current.unsubscribe();
        chatRoom.current = null;
      }
    };
  }, []);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {!roomId ? (
            <button
              className="btn btn-primary mt-2"
              onClick={handleFindStranger}
            >
              Find a Stranger
            </button>
          ) : (
            <ChatRoom roomId={roomId} />
          )}
        </>
      )}
    </div>
  );
};

export default AnonymousChat;
