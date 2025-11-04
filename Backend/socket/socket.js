import http from 'http';
import express from 'express';
import { Server } from 'socket.io';
import Connection from '../Models/connection.model.js'

export const app = express();
export const server = http.createServer(app);

export const io = new Server(server, {
  cors:"http://localhost:5173"
});

// socket operation: Live users
const liveUsers = {}
export const liveUserSocketId = (userId) => {
  return liveUsers[userId];
}

io.on('connection', (socket) => {
  const userId = socket.handshake.query.userId;
  if(userId){
    liveUsers[userId] = socket.id;
    io.emit('getLiveUsers', Object.keys(liveUsers))
  }
  socket.on('typing', ({receiverId, isTyping}) => {
    const receiverSockId = liveUserSocketId(receiverId);
    if(receiverSockId){
      io.to(receiverSockId).emit('typing', {from: socket.id, isTyping})
    } 
  })
  socket.on('disconnect', () => {
    delete liveUsers[userId];
    io.emit('getLiveUsers', Object.keys(liveUsers))
  })
})




