"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import ControlPanel from "@/components/Call/ControlPanel";
import SideControlPanel from "@/components/Call/SideControl/SideControlPanel";
import VideoGrid from "@/components/Call/Participants Grid/VideoGrid";

import { useLocalStream } from "@/contexts/LocalStreamContext";
import { joinExistingCall } from "@/services/socket/call.services";
import { getSocket } from "@/services/socket/socket.service";

const CallPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { setLocalStream } = useLocalStream();

  const socket = getSocket();

  useEffect(() => {
    if (!socket) return; // 🚩 !socket
    console.log("socket exists");
    joinExistingCall(params.id, setLocalStream, router);
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
