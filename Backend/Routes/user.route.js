import express from 'express';
import { acceptReq, rejectReq, searchUsers, sendConnectionReq, updateProfile } from '../Controllers/user.controller.js';
import { isAuthenticated } from '../Middlewares/isAuth.js';
import { isVerified } from '../Middlewares/isVerified.js';
import { upload } from '../Middlewares/multer.js';

const route = express.Router();

// @api dsc: user profile image and name update
// @api method: PUT
// @api endpoint: /api/user/profile
route.put("/profile", isAuthenticated, isVerified, upload.single('image'), updateProfile)

// @api dsc: search other users to connect with
// @api method: GET
// @api endpoint: /api/user/search?query=
route.get("/search", isAuthenticated, isVerified, searchUsers)

// @api dsc: connect with new user
// @api method: PUT
// @api endpoint: /api/user/connect?userId=
route.put("/connect", isAuthenticated, isVerified, sendConnectionReq);

// @api dsc: accept request
// @api method: PUT
// @api endpoint: /api/user/accept?userId=
route.put("/accept", isAuthenticated, isVerified, acceptReq);

// @api dsc: reject request
// @api method: PUT
// @api endpoint: /api/user/reject?userId=
route.put("/reject", isAuthenticated, isVerified, rejectReq);



export default route;