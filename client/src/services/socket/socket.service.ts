import socketio from "socket.io-client";

const socket = socketio(process.env.NEXT_PUBLIC_SOCKET_URL as string, {
  withCredentials: true,
});

socket.on("connect", () => {
  console.log("connected to socket");
});

socket.on("disconnect", () => {
  console.log("disconnected from socket");
});

export const getSocket = () => socket;
