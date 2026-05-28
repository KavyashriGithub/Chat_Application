import { io } from "socket.io-client";

// Connect to backend server
const socket = io("http://localhost:8080", {
  transports: ["websocket"],
  autoConnect: false, // we will manually connect after login
});

export default socket;