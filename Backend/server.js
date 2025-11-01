import express from "express";
import dotenv from "dotenv";
import bodyParser from 'express';
import cookieParser from "cookie-parser";
import cors from 'cors'
import { connectDB } from "./Config/db.js";
import authRouter from "./Routes/auth.route.js";
import userRouter from "./Routes/user.route.js"
import messageRouter from "./Routes/message.route.js"
import { app, server } from "./socket/socket.js";

// env config
dotenv.config({ path: ".env" });

// middlewares
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))
app.use(bodyParser.json());
app.use(cookieParser())

// auth router
app.use('/api/auth', authRouter);

// user router
app.use('/api/user', userRouter);

// message router
app.use('/api/message', messageRouter);

server.listen(process.env.PORT, () => {
  connectDB()
    .then((res) =>
      console.log(
        `Connected to the database at: ${res}\nServer is running on http://localhost:${process.env.PORT}`
      )
    )
    .catch((err) => console.log("Error in connectDB :: ", err));
});
