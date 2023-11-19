"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import ControlPanel from "@/components/Call/ControlPanel";
import SideControlPanel from "@/components/Call/SideControl/SideControlPanel";
import VideoGrid from "@/components/Call/Participants Grid/VideoGrid";

import { joinExistingCall } from "@/services/socket/call.services";

const CallPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();

  useEffect(() => {
    joinExistingCall(params.id, router);
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
