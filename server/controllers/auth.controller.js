import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndsetCookies from "../utils/generateJWT.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(403).json({ message: "Passwords do not match" });
    }

    const user = await User.findOne({ username });
    if (user) {
      return res.status(403).json({ success:false, message: "Username already in use" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyAvatar = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlAvatar = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = await User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePicture: gender === "male" ? boyAvatar : girlAvatar,
    });

    if (newUser) {
      generateTokenAndsetCookies(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        success: true,
        user: {
          userId: newUser._id,
          fullName: newUser.fullName,
          username: newUser.username,
          gender: newUser.gender,
          profilePicture: newUser.profilePicture,
        },
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ error: "Inernal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isCorrectPassword = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!user || !isCorrectPassword) {
      return res.status(403).json({ message: "Invalid credentials" });
    }

    generateTokenAndsetCookies(user._id, res);
    res.status(200).json({
      success: true,
      user: {
        userId: user._id,
        fullName: user.fullName,
        username: user.username,
        gender: user.gender,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Inernal server error" });
  }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({success:true, message:"Logged out successfully"});
    } catch (error) {
        res.status(500).json({ message: "Inernal server error" });
    }
}

export const getConvertations = async (req, res) => {
  try {
    
    const convertations = await User.find().select("-password");
    res.status(200).json({success:true, data:convertations});
  } catch (error) {
    res.status(500).json({ message: "Inernal server error" });
  }
}
