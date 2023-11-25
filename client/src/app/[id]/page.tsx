"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import ControlPanel from "@/components/Call/ControlPanel";
import SideControlPanel from "@/components/Call/SideControl/SideControlPanel";
import VideoGrid from "@/components/Call/Participants Grid/VideoGrid";
import Loading from "@/components/Utils/Loading";

import { joinExistingCall } from "@/services/socket/call.services";
import { IRootState } from "@/types/redux";
import { leaveCallHandler } from "@/services/webRTC/peerConnection";

const CallPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const user = useSelector((state: IRootState) => state.user);
  const localStream = useSelector(
    (state: IRootState) => state.call.localStream
  );

  useEffect(() => {
    if (!user || user.id == "") return router.push("/auth/login");
    else joinExistingCall(params.id, router);

    window.addEventListener("beforeunload", () => {
      leaveCallHandler(router);
    });

    return () => {
      window.removeEventListener("beforeunload", () => {});
    };
  }, []);

  return (
    <>
      {!localStream || (user && user.id == "") ? (
        <Loading />
      ) : (
        <>
          <div className="flex justify-between items-center w-[100vw]">
            <VideoGrid />
            <SideControlPanel />
          </div>
          <ControlPanel />
        </>
      )}
    </>
  );
};

export default CallPage;
