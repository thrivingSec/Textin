import express from "express";
import { login, logout, signup, userData, verify } from "../Controllers/auth.controller.js";
import { isAuthenticated } from "../Middlewares/isAuth.js";
import { isVerified } from "../Middlewares/isVerified.js";

const route = express.Router();

// @api dsc: user signup using email verification
// @api method: POST
// @api endpoint: /api/auth/signup
route.post('/signup', signup);

// @api dsc: user otp verification after signup verification email dispatch
// @api method: POST
// @api endpoint: /api/auth/verify
route.post('/verify',isAuthenticated, verify);

// @api dsc: user login
// @api method: POST
// @api endpoint: /api/auth/login
route.post('/login', login);

// @api dsc: user logout
// @api method: GET
// @api endpoint: /api/auth/logout
route.get('/logout', isAuthenticated, isVerified, logout);

// @api dsc: get current user
// @api method: GET
// @api endpoint: /api/auth/user
route.get('/user', isAuthenticated, isVerified, userData);


export default route;