import socketEvents from "@/configs/socket.json";
import socketio from "socket.io-client";
import { useRouter } from "next/navigation";

import { ICallbackResponse } from "@/types/socket";

export const initNewCall = (
  socket: ReturnType<typeof socketio> | null,
  navigate: ReturnType<typeof useRouter>
) => {
  if (!socket) return; //🚩 !socket
  socket.emit(
    socketEvents.START_NEW_CALL,
    { userSocketId: socket.id },
    (res: ICallbackResponse) => {
      console.log(res);
      navigate.push(`/${res.data.callId}`);
    }
  );
};
