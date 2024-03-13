import express from 'express';
import protectedRoute from '../middleware/protectedRoute.js';
import { getMessage, readMessage, sendMessage } from '../controllers/message.controller.js';

const route = express.Router();

route.post("/send/:id", protectedRoute, sendMessage);
route.get("/:id", protectedRoute, getMessage);
route.post("/read/:id", protectedRoute, readMessage);

export default route;