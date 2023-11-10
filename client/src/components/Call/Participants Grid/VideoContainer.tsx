"use client";
import React, { useState } from "react";
import Image from "next/image";

import mic_off from "@/assets/icons/mic-off.svg";
import mic_on from "@/assets/icons/mic-on.svg";
import video_off from "@/assets/icons/video-off.svg";
const VideoContainer = () => {
  const [mic, setMic] = useState(false);
  const [video, setVideo] = useState(false);
  return (
    <div className="w-full h-full flex flex-col justify-center items-center border border-opacity-20 border-white rounded-lg relative p-4">
      {!mic && (
        <Image
          src={mic_off}
          alt="mic"
          className="w-7 h-7 bg-white rounded-full p-1 absolute top-4 right-4"
        />
      )}
      {video ? (
        <video />
      ) : (
        <Image
          src={video_off}
          alt="video"
          className="w-24 h-24 bg-gray-700 rounded-full p-2"
        />
      )}
      <p className="absolute bottom-0 left-0 m-2 font-semibold">
        Participant Name
      </p>
    </div>
  );
};

export default VideoContainer;
