import jwt from 'jsonwebtoken';
import Users from '../Models/user.model.js';

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if(!token) return res.status(400).json({message:"unauthorized - token not provided", success:false});

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if(!decode) return res.status(400).json({message:"unauthorized - invalid token", success:false});

    const currentUser = await Users.findById(decode._id);

    if(!currentUser) return res.status(400).json({message:"unauthorized - invalid token", success:false})
    req.user = currentUser;

    next();
  } catch (error) {
    console.log('Error in isAuthernticated :: ', error.message);
    console.log(error);
  }

}