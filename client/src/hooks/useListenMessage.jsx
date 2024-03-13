import React, { useEffect } from 'react'
import { useSocket } from '../context/SocketContext'
import useConversation from '../store/useConversation';

const useListenMessage = () => {
  const { socket } = useSocket();
  const { messages, setMessages } = useConversation();
  useEffect(()=>{
    socket?.on("newMessage",(message)=>{
        setMessages([...messages, message])
    })
    return ()=> socket?.off("newMessage");
  },[socket, messages, setMessages])
}

export default useListenMessage