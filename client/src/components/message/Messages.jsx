import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import useListenMessage from "../../hooks/useListenMessage";

const Messages = () =>{
  const lastMessageRef = useRef();
  useListenMessage();
  const { messages, loading } = useGetMessages();
  useEffect(()=>{
    lastMessageRef.current?.scrollIntoView({behavior:"smooth"});
  },[messages])
  return (
    <div className="my-1 mx-1 overflow-auto">
      {messages &&
        messages?.map((message, index) => (
          <div className=""
            key={message?._id}
            ref={lastMessageRef}
          >
            <Message  message={message} />
          </div>
        ))}
    </div>
  );
};

export default Messages;
