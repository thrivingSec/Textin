import { imageUpload } from "../Config/cloudinary.js";
import Conversation from "../Models/conversation.model.js";
import Message from "../Models/message.model.js";
import { io, liveUserSocketId } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const from = req.user._id;
    const to = req.params.to;
    const { message } = req.body;

    if(!to) return res.status(400).json({message:"bad request", success:false});
    
    let image;
    if(req.file){
      image = await imageUpload(req.file.path);
    }

    const newMessage = await Message.create({from, to, message, image});

    let conversation = await Conversation.findOne({
      participants:{
        $all:[from, to]
      }
    })

    if(conversation){
      conversation.messages.push(newMessage._id);
      await conversation.save()
    }else{
      conversation = Conversation.create({
        participants:[from, to],
        messages:[newMessage._id]
      })
    }

    const receiverSocketId = liveUserSocketId(to)
    if(receiverSocketId){
      io.to(receiverSocketId).emit('newMessage', newMessage)
    }

    return res.status(200).json(newMessage);

  } catch (error) {
    console.log('Error in sendMessage :: ', error);
    return res.status(500).json({message:"internal server error", success:false})
  }
}

export const getMessage = async (req, res) => {
  try {
    const from = req.user._id;
    const to = req.params.receiver;

    if(!to) return res.status(400).json({message:"bad request", success:false});

    let conversation = await Conversation.findOne({
      participants:{$all:[from, to]}
    }).populate("messages");
    return res.status(200).json(conversation?.messages);

  } catch (error) {
    console.log('Error in getMessage :: ', error.message);
    return res.status(500).json({message:"internal server error", success:false})
  }
}