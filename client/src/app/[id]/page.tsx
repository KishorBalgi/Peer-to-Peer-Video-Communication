"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import ControlPanel from "@/components/Call/ControlPanel";
import SideControlPanel from "@/components/Call/SideControl/SideControlPanel";
import VideoGrid from "@/components/Call/Participants Grid/VideoGrid";

import { joinExistingCall } from "@/services/socket/call.services";
import { IRootState } from "@/types/redux";

const CallPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const user = useSelector((state: IRootState) => state.user);

  useEffect(() => {
    if (!user || user.id == "") return router.push("/auth/login");
    else joinExistingCall(params.id, router);
  }, []);

  return (
    <div>
      {user && user.id == "" ? (
        <div className="w-full h-full flex justify-center items-center">
          <h1 className="text-2xl text-white my-5">Loading...</h1>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center w-[100vw]">
            <VideoGrid />
            <SideControlPanel />
          </div>
          <ControlPanel />
        </>
      )}
    </div>
  );
};

export default CallPage;
