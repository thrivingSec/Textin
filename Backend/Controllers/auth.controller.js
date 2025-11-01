import bcrypt from "bcrypt";
import Users from "../Models/user.model.js";
import { sendVerificationMail, sendWelcomeMail } from "../Config/nodemailer.js";
import { newOTP } from "../Config/otp.js";
import { createToken } from "../Config/createToken.js";
import Connection from "../Models/connection.model.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res
        .status(400)
        .json({ message: "all fields are required", success: false });

    if (password.length < 6)
      return res.status(400).json({
        message: "password should be atleast 6 character long",
        success: false,
      });

    const existingUser = await Users.findOne({ email });

    if (existingUser)
      return res
        .status(400)
        .json({ message: "email already in use", success: false });

    const hashedPass = await bcrypt.hash(password, 10);

    const otp = newOTP();

    const newUser = new Users({
      name,
      email,
      password: hashedPass,
      otp: otp.toString(),
    });

    await sendVerificationMail(newUser.email, otp);

    if (newUser) {
      createToken(newUser._id, res);
      await newUser.save();
    } else {
      return res
        .status(400)
        .json({ message: "invalid user data", success: false });
    }

    res.status(201).json({
      message: "User registered - please verify email",
      success: true,
    });
  } catch (error) {
    console.log("Error in signup controller :: ", error.message);
    res.status(500).json({ message: "internal server error", success: false });
  }
};

export const verify = async (req, res) => {
  try {
    const { code } = req.body;
    const otp = req.user.otp;
    if (!code)
      return res
        .status(400)
        .json({ message: "OTP is required", success: false });

    if (otp === code) {
      const updatedUser = await Users.findByIdAndUpdate(
        req.user._id,
        { verified: true, otp: "" },
        { new: true }
      ).select("-password -otp -verified");
      sendWelcomeMail(updatedUser.email, updatedUser.name);
      return res.status(200).json(updatedUser);
    } else {
      return res.status(400).json({ message: "Invalid OTP", success: false });
    }
  } catch (error) {
    console.log("Error in verify :: ", error.message);
    res.status(500).json({ message: "Internal server error.", success: false });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ message: "all fields are required", success: false });

    const user = await Users.findOne({ email });

    if (!user)
      return res
        .status(400)
        .json({ message: "invalid credentials", success: false });

    if (!user.verified) {
      await Users.findByIdAndDelete(user._id);
      return res.status(400).json({
        message: "Email was not verified - signup again",
        success: false,
      });
    }

    const validPass = await bcrypt.compare(password, user.password);

    if (!validPass)
      return res
        .status(400)
        .json({ message: "invalid credentials", success: false });

    createToken(user._id, res);
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    console.log("Error in login :: ", error.message);
    res.status(500).json({ message: "Internal server error.", success: false });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "logged out successfully", success: true });
  } catch (error) {
    console.log("Error in logout :: ", error.message);
    res.status(500).json({ message: "Internal server error.", success: false });
  }
};

export const userData = async (req, res) => {
  try {

    const user = await Users.findById(req.user._id).select(
      "-password -otp -verified"
    );

    const connection = await Connection.find({
      $and: [
        {
          $or: [{ from: user._id }, { to: user._id }],
        },
        { status: "accepted" },
      ],
    }).populate("from to", "_id name image");

    const connectionPending = await Connection.find({
      $and:[
        {to:user._id},
        {status:"pending"}
      ]
    }).populate("from", "_id name image")
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      connection,
      pending:connectionPending
    };

    if (user) return res.status(200).json(userData);
    
  } catch (error) {
    console.log("Error in userData :: ", error);
    res.status(500).json({ message: "Internal server error.", success: false });
  }
};
