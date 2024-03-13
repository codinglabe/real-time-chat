import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectedRoute = async (req, res, next) =>{
    try {
        const token = req.cookies.jwt;
        if(!token){
           return res.status(401).json({error:"Unauthorized - No token provided"});
        }
        const decode = jwt.verify(token,process.env.SECRET_KEY)
        if(!decode){
            return res.status(401).json({error:"Unauthorized - Invalid Token"});
        }

        const user = await User.findById(decode.userId).select("-password");
        if(!user){
            return res.status(404).json({error:"User not found"});
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ message: "Inernal server error", error: error.message});
    }
}

export default protectedRoute;
