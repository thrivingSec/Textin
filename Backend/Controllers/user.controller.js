import { imageUpload } from "../Config/cloudinary.js";
import Connection from "../Models/connection.model.js";
import Conversation from "../Models/conversation.model.js";
import Message from "../Models/message.model.js";
import Users from "../Models/user.model.js";

export const updateProfile = async (req, res) => {
  try {
    const { name } = req.body;
    console.log(req.body);
    let image;
    if (req.file) {
      image = await imageUpload(req.file.path);
    }
    const updatedUser = await Users.findByIdAndUpdate(
      req.user._id,
      { name, image },
      { new: true }
    ).select("-password -otp -verified");
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error in updateProfle :: ", error.message);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const searchUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const { query } = req.query;
    
    if (!query || query.trim() === "")
      return res
        .status(400)
        .json({ message: "name or email is required to search" });

    // Find all the related user from user model
    const users = await Users.find({
      $and: [
        { _id: { $ne: loggedInUserId } }, // exculde the logged-in user
        {
          $or: [
            { name: { $regex: query, $options: "i" } },
            { email: { $regex: query, $options: "i" } },
          ],
        },
      ],
    }).select("_id name email image");
    // Find the connection status between the loggedInUser and the users returned from user search
    const userResult = await Promise.all(
      users.map(async (user) => {
        const connection = await Connection.findOne({
          $or: [
            { from: loggedInUserId, to: user._id },
            { from: user._id, to: loggedInUserId },
          ],
        });
        let connectionStatus = "none";
        if (connection) {
          if (connection.status === "accepted") connectionStatus = "connected";
          else if (
            connection.status === "pending" &&
            connection.from.toString() === loggedInUserId.toString()
          )
            connectionStatus = "requested";
          else if (
            connection.status === "pending" &&
            connection.to.toString() === loggedInUserId.toString()
          )
            connectionStatus = "incoming-request";
        }
        return {_id:user._id, name:user.name, email:user.email, image:user.image, connectionStatus}
      })

    );
    return res.status(200).json({userResult});
  } catch (error) {
    res.status(500).json({message:"internal server error", success:false});
    console.log("Error in searchUser :: ", error.message);
  }
};

export const sendConnectionReq = async (req, res) => {
  try {
    const from = req.user._id;
    const {userId} = req.query;

    if(!userId) res.status(400).json({message:"bad request", success:false});
    
    // Avoid duplication
    const connection  = await Connection.find({
      $or:[
        {from, to:userId},
        {from:userId, to:from}
      ]
    })

    if(connection){
      if(connection.status === "pending"){
        return res.status(400).json({message:"connection request already exists", success:false})
      }
      else if(connection.status === "accepted"){
        return res.status(400).json({message:"already connected", success:false});
      }
    }


    // Creating New Connection
    const newConnection = new Connection({from, to:userId, status:"pending"});
    if(newConnection){
      await newConnection.save();
    }
    res.status(200).json({message:"request sent", success:true});
  } catch (error) {
    console.log("Error in sendConnectionReq :: ", error.message);
    res.status(400).json({message:"internals server error", success:false});
  }
}

export const acceptReq = async (req, res) => {
  try {
    const to = req.user._id;
    const {userId} = req.query;

    if(!userId) return res.status(400).json({message:"bad request", success:false});
    
    let connection = await Connection.find({to,from:userId, status:"pending"});
    
    if(!connection) return res.status(400).json({message:"bad request", success:false});

    connection = await Connection.findOneAndUpdate({to, from:userId, status:"pending"}, {status:"accepted"})

    if(connection){
      return res.status(200).json({message:"request accepted", success:true});
    }
  } catch (error) {
    console.log('Error in acceptReq :: ', error.message);
    return res.status(500).json({message:"internal server error", success:false});
  }
}

export const rejectReq = async (req, res) => {
  try {
    const to = req.user._id;
    const {userId} = req.query;

    if(!userId) return res.status(400).json({message:"bad request", success:false});
    
    let connection = await Connection.find({to,from:userId, status:"pending"});
    
    if(!connection) return res.status(400).json({message:"bad request", success:false});

    connection = await Connection.findOneAndDelete({to, from:userId, status:"pending"})

    if(connection){
      return res.status(200).json({message:"request rejected", success:true});
    }
  } catch (error) {
    console.log('Error in acceptReq :: ', error.message);
    return res.status(500).json({message:"internal server error", success:false});
  }
}

export const deleteUser = async (req, res) => {
  try {
    const user = req.user;

    const [connection, conversation, messages] = await Promise.all([
      Connection.deleteMany({$or:[{from:user._id},{to:user._id}]}),
      Conversation.deleteMany({participants:{$in:[user._id]}}),
      Message.deleteMany({$or:[{from:user._id},{to:user._id}]})
    ])

    const theUser = await Users.findByIdAndDelete(user._id)
    console.log(`${connection.deletedCount} Connection deleted`);
    console.log(`${conversation.deletedCount} Conversation deleted`);
    console.log(`${messages.deletedCount} Messages deleted`);
    console.log(`${theUser} User deleted`);

    res.status(200).json({
      success:true,
      message:"User deleted successfully"
    })
  } catch (error) {
    console.log('Error in deleteUser ::', error.message);
    res.status(500).json('Internal server error')
  }
}

