import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useAuthContext } from "../../context/AuthContext";

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser?.fullName} ❄</p>
        <p>Select a chat to start messaging</p>
        <ChatBubbleLeftRightIcon className="w-20 h-20 text-center" />
      </div>
    </div>
  );
};

export default NoChatSelected;
