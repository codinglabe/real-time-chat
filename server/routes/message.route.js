import express from 'express';
import protectedRoute from '../middleware/protectedRoute.js';
import { getMessage, sendMessage } from '../controllers/message.controller.js';

const route = express.Router();

route.post("/send/:id", protectedRoute, sendMessage);
route.get("/:id", protectedRoute, getMessage);

export default route;