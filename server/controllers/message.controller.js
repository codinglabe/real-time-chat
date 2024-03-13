import Message from "../models/message.model.js";
import { getReveicerSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    const savedMessage = await newMessage
      .save()
      
      res.status(200).json({
        success: true,
        data:savedMessage,
      });
      const receiverSocketId = getReveicerSocketId(receiverId)
        if(receiverSocketId){
          io.to(receiverSocketId).emit("newMessage",savedMessage)
        }
    
  } catch (error) {
    res.status(500).json({ message: "Inernal server error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { id: userToChatId } = req.params;
    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: userId },
      ],
    });

    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({ message: "Inernal server error" });
  }
};
