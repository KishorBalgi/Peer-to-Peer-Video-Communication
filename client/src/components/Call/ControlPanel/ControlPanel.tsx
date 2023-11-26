"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import mic_on from "@/assets/icons/mic-on.svg";
import mic_off from "@/assets/icons/mic-off.svg";
import video_on from "@/assets/icons/video-on.svg";
import video_off from "@/assets/icons/video-off.svg";
import end_call from "@/assets/icons/end-call.svg";
// import screen_share from "@/assets/icons/screen-share.svg";
// import screen_share_off from "@/assets/icons/screen-share-off.svg";
import setting from "@/assets/icons/setting.svg";

import Button from "@/components/Utils/Button";
import { initLocalStream, toggleVideoAudio } from "@/services/webRTC/init";
import { leaveCallHandler } from "@/services/webRTC/peerConnection";
import { IRootState } from "@/types/redux";
import Settings from "./Settings";

const ControlPanel = () => {
  const router = useRouter();

  const localStream = useSelector(
    (state: IRootState) => state.call.localStream
  );

  const [mic, setMic] = useState(false);
  const [video, setVideo] = useState(false);
  const [screen, setScreen] = useState(false);
  const [showSetting, setShowSetting] = useState(false);

  const handelMic = async () => {
    if (!localStream) await initLocalStream();
    if (localStream) toggleVideoAudio(localStream, "audio");
    setMic(!mic);
  };

  const handelVideo = async () => {
    if (!localStream) await initLocalStream();
    if (localStream) toggleVideoAudio(localStream, "video");
    setVideo(!video);
  };

  // const handelScreen = () => {
  //   setScreen(!screen);
  // };

  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2">
      <div className="flex gap-2">
        <Button
          buttonIcon={mic ? mic_on : mic_off}
          buttonClassNames={`py-4 m-0 ${mic ? "!bg-green-500" : "!bg-red-500"}`}
          onClick={handelMic}
        />
        <Button
          buttonIcon={video ? video_on : video_off}
          buttonClassNames={`py-4 m-0 ${
            video ? "!bg-green-500" : "!bg-red-500"
          }`}
          onClick={handelVideo}
        />
        {/* <Button
          buttonIcon={screen ? screen_share : screen_share_off}
          buttonClassNames={`py-4 m-0 ${
            screen ? "!bg-green-500" : "!bg-red-500"
          }`}
          onClick={handelScreen}
        /> */}
        <div>
          <Button
            buttonIcon={setting}
            buttonClassNames="relative py-4 m-0 !bg-gray-100"
            onClick={() => setShowSetting(!showSetting)}
          />
          {showSetting && <Settings />}
        </div>
        <Button
          buttonIcon={end_call}
          buttonClassNames="py-4 m-0 !bg-red-500"
          onClick={() => leaveCallHandler(router)}
        />
      </div>
    </div>
  );
};

export default ControlPanel;
