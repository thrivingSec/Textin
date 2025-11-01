import { io } from "socket.io-client";
import { serverURL } from "../main";
let socket;
export const initSocket = (userId) => {
  socket = io(serverURL, { query: { userId: userId } });
  return socket;
}
export const getSocket = () => socket
  