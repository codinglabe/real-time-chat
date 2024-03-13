import React from "react";
import useConversation from "../../store/useConversation";
import { useSocket } from "../../context/SocketContext";

const Convertation = ({convertation}) => {
  const { onlineUsers } = useSocket();
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === convertation?._id;
  const isOnline = onlineUsers.includes(convertation?._id)
  return (
    <>
      <div className={`flex gap-2 items-center p-2 py-1 hover:bg-sky-400 cursor-pointer duration-200 ease-in-out rounded-lg ${isSelected ? "bg-sky-400":""}`}
        onClick={()=>setSelectedConversation(convertation)}
      >
        <div className={`avatar ${isOnline ? 'online':'offline'}`}>
          <div className="w-12 rounded-full">
            <img src={convertation?.profilePicture} />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex items-center justify-between">
            <p className=" font-bold text-gray-200">{convertation?.fullName}</p>
            <span className=" text-xl">😀</span>
          </div>
        </div>
      </div>
      <div className="divider my-0 py-0 h-1"></div>
    </>
  );
};

export default Convertation;
