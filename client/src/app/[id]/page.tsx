"use client";
import React, { useEffect } from "react";
import { redirect } from "next/navigation";

import ControlPanel from "@/components/Call/ControlPanel";
import SideControlPanel from "@/components/Call/SideControl/SideControlPanel";
import VideoGrid from "@/components/Call/Participants Grid/VideoGrid";
import { initLocalStream } from "@/services/webRTC/init";

import socketEvents from "@/configs/socket.json";
import { useSocket } from "@/contexts/SocketContext";
import { useLocalStream } from "@/contexts/LocalStreamContext";
import { ICallbackResponse } from "@/types/socket";

const CallPage = ({ params }: { params: { id: string } }) => {
  const { setLocalStream } = useLocalStream();
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return; // 🚩 !socket

    socket.emit(
      socketEvents.JOIN_CALL,
      params.id,
      (response: ICallbackResponse) => {
        if (response.status === "error") {
          console.log(response.message);
          redirect("/");
        }

        // Init local stream:
        initLocalStream(setLocalStream);
      }
    );
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center w-[100vw]">
        <VideoGrid />
        <SideControlPanel />
      </div>
      <ControlPanel />
    </div>
  );
};

export default CallPage;
