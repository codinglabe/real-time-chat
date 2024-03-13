import React, { useEffect } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import NoChatSelected from "./NoChatSelected";
import useConversation from "../../store/useConversation";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(()=>{
    return ()=>setSelectedConversation(null);
  },[])
  return (
    <div className="md:min-w-[450px] flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected/>
      ) : (
        <>
          <div className=" bg-slate-500 px-4 py-2 mb-2">
            <span className="text-gray-300 font-semibold">To: </span>
            <span className=" font-semibold text-gray-200">{selectedConversation?.fullName}</span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;
