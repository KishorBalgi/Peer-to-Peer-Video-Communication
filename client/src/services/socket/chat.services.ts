import { toastMessage } from "@/components/Notifications/toasts";
import { socket } from "./socket.services";
import socketEvents from "@/configs/socket.json";
import { TChatMessage } from "@/types/socket";

// Send In Call message:
export const sendInCallMessage = (message: string) => {
  if (!socket) return; //🚩 !socket
  const data: TChatMessage = {
    from: socket.id,
    to: "*",
    room: socket.callId || "*",
    message,
  };
  socket.emit(socketEvents.CHAT_MSG, data);
};

// Receive In Call message:
export const receiveInCallMessage = (
  callback: (data: TChatMessage) => void
) => {
  if (!socket) return; //🚩 !socket
  socket.on(socketEvents.CHAT_MSG, (data: TChatMessage) => {
    console.log("In call message: ", data);
    callback(data);
    // if(data.from !== socket.id){
    //   toastMessage({type: "info", message: data.message});
    // }
  });
};
