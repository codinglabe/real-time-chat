import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../store/useConversation";
import { extractTime } from "../../utils/extractTime";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const forMe = authUser.userId === message?.senderId;
  const chatClassName = forMe ? "chat-end":"chat-start";
  const profilePic = forMe ? authUser.profilePicture:selectedConversation?.profilePicture
  const chatName = forMe ? authUser.fullName:selectedConversation?.fullName
  const bgColor = forMe ? "bg-blue-500":""
  return (
    <>
      <div
        className={`chat  ${chatClassName}`}
      >
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={profilePic}
            />
          </div>
        </div>
        <div className="chat-header">
          {chatName}
        </div>
        <div className={`chat-bubble text-white ${bgColor}`}>
          {message?.message}
          <div className=" text-end text-xs">{extractTime(message.createdAt)}</div>
        </div>
      </div>

      {/* <div className="chat chat-end">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            />
          </div>
        </div>
        <div className="chat-bubble">It was you who would bring</div>
      </div> */}
    </>
  );
};

export default Message;
