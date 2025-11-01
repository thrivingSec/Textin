import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
  participants:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'users',
      required:true
    }
  ],
  messages:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'message'
    }
  ]
}, {
  timestamps:true
})

const Conversation = mongoose.model('conversation', conversationSchema);
export default Conversation;