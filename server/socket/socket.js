import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:["http://localhost:3000"],
        methods:["GET","POST"]
    }
})

const userSocketMap = {};
export const getReveicerSocketId = (receiverId) =>{
    return userSocketMap[receiverId];
}
io.on("connection",(socket)=>{
    const userId = socket.handshake.query.userId;
    if(userId != undefined) userSocketMap[userId] = socket.id;
    io.emit("getOnlineUser",Object.keys(userSocketMap));
    console.log("User connected to socket:" + socket.id);
    socket.on("disconnect",()=>{
        console.log("User disconnected from socket:" + socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUser",Object.keys(userSocketMap));
        
    })
})
export {app, io, server};