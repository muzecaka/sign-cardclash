import { io } from "socket.io-client";

const socket = io(process.env.REACT_APP_SERVER_URL, {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 10000,
  transports: ["websocket", "polling"],
});

socket.on("connect", () => {
  console.log("Socket.IO connected successfully, ID:", socket.id);
});

socket.on("connect_error", (error) => {
  console.error("Socket.IO connection error:", error.message);
});

socket.on("disconnect", (reason) => {
  console.warn("Socket.IO disconnected:", reason);
});

export default socket;
