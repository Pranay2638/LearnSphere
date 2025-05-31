import { io } from "socket.io-client";

const socket = io("https://learnsphere-1s3z.onrender.com", {
  transports: ["websocket"],
});

export default socket;