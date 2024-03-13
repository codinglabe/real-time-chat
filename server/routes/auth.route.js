import express from 'express';
import { getConvertations, login, logout, signup } from '../controllers/auth.controller.js';
const route = express.Router();

route.post("/registration", signup);

route.post("/login", login);

route.post("/logout", logout);

route.get("/convertations", getConvertations);

export default route;