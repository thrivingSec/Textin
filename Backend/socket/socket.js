import http from 'http';
import express from 'express';
import { Server } from 'socket.io';
import Connection from '../Models/connection.model.js'

export const app = express();
export const server = http.createServer(app);

export const io = new Server(server, {
  cors:"https://textin-1.onrender.com"
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
  socket.on('disconnect', () => {
    delete liveUsers[userId];
    io.emit('getLiveUsers', Object.keys(liveUsers))
  })
})




