import io, { Socket } from "socket.io-client";
interface ISocketInstance extends Socket {
  // add default roomId as "":
  callId?: string;
}
export const socket: ISocketInstance = io(
  process.env.NEXT_PUBLIC_SOCKET_URL as string,
  {
    withCredentials: true,
  }
);

socket.on("connect", () => {
  console.log("Socket connected: ", socket.id);
});

socket.on("disconnect", () => {
  console.log("Socket disconnected");
});
