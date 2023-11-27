"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import ControlPanel from "@/components/Call/ControlPanel/ControlPanel";
import SideControlPanel from "@/components/Call/SideControl/SideControlPanel";
import VideoGrid from "@/components/Call/Participants Grid/VideoGrid";
import Loading from "@/components/Utils/Loading";

import { isAuthenticated } from "@/services/auth.services";
import { joinExistingCall } from "@/services/socket/call.services";
import { leaveCallHandler } from "@/services/webRTC/peerConnection";
import { IRootState } from "@/types/redux";

const CallPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const user = useSelector((state: IRootState) => state.user);
  const localStream = useSelector(
    (state: IRootState) => state.call.localStream
  );

  useEffect(() => {
    const checkAuth = async () => {
      const auth = await isAuthenticated();

      if (auth.status === "error") {
        // If user is not logged in, redirect to login page
        if (!user || user.id == "") return router.push("/auth/login");
      }

      // Join the call:
      joinExistingCall(params.id, router);

      // Leave the call when the user closes the tab
      window.addEventListener("beforeunload", () => {
        leaveCallHandler(router);
      });
    };
    checkAuth();

    return () => {
      window.removeEventListener("beforeunload", () => {});
    };
  }, []);

  return (
    <>
      {user && user.id == "" ? (
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
