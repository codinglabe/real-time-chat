import express from 'express';

import authRoute from './routes/auth.route.js';
import dotenv from "dotenv";
import connectDB from './db/db.connection.js';
import messgageRoute from './routes/message.route.js';
import cookieParser from 'cookie-parser';
import { app, io, server } from './socket/socket.js';


dotenv.config();
const PORT = process.env.PORT || 5000;



app.get("/", (req, res) => {
    res.send("Hello, world!");
})

app.use(express.json());
app.use(cookieParser())
app.use("/api/auth",authRoute)
app.use("/api/message",messgageRoute);



server.listen(PORT,() => {
    connectDB();
    console.log('listening on port 5000');
})