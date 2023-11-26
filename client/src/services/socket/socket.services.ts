import io, { Socket } from "socket.io-client";
import { store } from "@/redux/store";

interface ISocketInstance extends Socket {
  callId?: string;
}

// Create socket instance:
export const socket: ISocketInstance = io(
  process.env.NEXT_PUBLIC_SOCKET_URL as string,
  {
    auth: {
      token: store.getState().user.token,
    },
    withCredentials: true,
  }
);

socket.on("connect", () => {
  console.log("Socket connected: ", socket.id);
});

socket.on("disconnect", () => {
  console.log("Socket disconnected");
});
