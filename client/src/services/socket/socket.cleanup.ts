import { socket } from "./socket.services";
import socketEvents from "@/configs/socket.json";

// Remove call listers from socket:
export const removeCallListeners = () => {
  socket.callId = undefined;

  // Remove all listeners:
  socket.off(socketEvents.USER_JOINED);
  socket.off(socketEvents.USER_LEFT);
  socket.off(socketEvents.SIGNAL_MSG);
  socket.off(socketEvents.CHAT_MSG);
};
