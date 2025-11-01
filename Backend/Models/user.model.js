import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  image:{
    type:String,
    default:""
  },
  verified:{
    type:Boolean,
    default:false
  },
  otp:{
    type:String
  },
},{
  timestamps:true
});
const Users = mongoose.model("users", userSchema);
export default Users;