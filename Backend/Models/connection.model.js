import mongoose from "mongoose";

const connectionSchema = new mongoose.Schema({
  from:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users"
  },
  to:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users"
  },
  status:{
    type:String,
    enum:["pending","accepted","rejected"],
    default:"pending"
  }
},{
  timestamps:true
})
const Connection = mongoose.model('connection', connectionSchema);
export default Connection