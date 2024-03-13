import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    fullName:{
        type: 'string',
        required: true
    },
    username:{
        type: 'string',
        required: true,
        unique: true
    },
    password:{
        type: 'string',
        required: true
    },
    gender:{
        type: 'string',
        required: true,
        enum:["male", "female"]
    },
    profilePicture:{
        type: 'string',
        default:""
    }
},{timestamps:true})

const User = mongoose.model('User',userModel);

export default User;