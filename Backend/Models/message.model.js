import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  from:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users",
    required:true
  },
  to:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users",
    required:true
  },
  message:{
    type:String,
    default:""
  },
  image:{
    type:String,
    default:""
  }
}, {timestamps:true});

const Message = mongoose.model("message", messageSchema);
export default Message;