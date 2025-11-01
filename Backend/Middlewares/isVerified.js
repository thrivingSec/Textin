import Users from "../Models/user.model.js";

export const isVerified = async (req, res, next) => {
  const user = req.user;
  if(!user.verified){ 
    return res.status(400).json({message:"Email was not verified - login to verify", success:false})
  }
  next();
}