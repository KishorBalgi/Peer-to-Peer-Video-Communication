// "use client";
// import React, { createContext, useState, useContext, useEffect } from "react";
// import socketio from "socket.io-client";

// // Socket connect:
// const getSocket = () => {
//   const socket = socketio(process.env.NEXT_PUBLIC_SOCKET_URL as string, {
//     withCredentials: true,
//   });

//   socket.on("connect", () => {
//     console.log("connected to socket");
//   });

//   socket.on("disconnect", () => {
//     console.log("disconnected from socket");
//   });

//   return socket;
// };

// // Create a context for the socket
// const SocketContext = createContext<{
//   socket: ReturnType<typeof socketio> | null;
// }>({ socket: null });

// // Custom hook to hold the socket instance:
// const useSocket = () => useContext(SocketContext);

// // Create a provider for the socket context
// const SocketProvider = ({ children }: { children: React.ReactNode }) => {
//   const [socket, setSocket] = useState<ReturnType<typeof socketio> | null>(
//     null
//   );

//   useEffect(() => {
//     if (typeof window === "undefined") return;
//     setSocket(getSocket());

//     return () => {
//       socket?.disconnect();
//     };
//   }, []);

//   return (
//     <SocketContext.Provider value={{ socket }}>
//       {children}
//     </SocketContext.Provider>
//   );
// };

// export { SocketProvider, useSocket };
