import express from 'express';
import { getMessage, sendMessage } from '../Controllers/message.controller.js';
import { isAuthenticated } from '../Middlewares/isAuth.js';
import { isVerified } from '../Middlewares/isVerified.js';
import { upload } from '../Middlewares/multer.js';

const route = express.Router();

// @api dsc: create a message object which would be a part of conversation model betewwn two participants
// @api method: POST
// @api endpoint: /api/message/send/:to
route.post('/send/:to',isAuthenticated, isVerified, upload.single('image'), sendMessage);

// @api dsc: retrieve all the messge between two participants
// @api method: GET
// @api endpoint: /api/message/get/:receiver
route.get('/get/:receiver',isAuthenticated, isVerified, getMessage);


export default route;