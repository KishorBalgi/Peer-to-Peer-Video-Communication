"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

import mic_off from "@/assets/icons/mic-off.svg";
import mic_on from "@/assets/icons/mic-on.svg";
import video_off from "@/assets/icons/video-off.svg";

type VideoContainerProps = {
  stream: MediaStream;
};

const VideoContainer = ({ stream }: VideoContainerProps) => {
  const [micEnabled, setMicEnabled] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(false);

  useEffect(() => {
    const updateStreamStatus = () => {
      console.log("updateStreamStatus");
      if (!stream) return;
      setMicEnabled(stream.getAudioTracks()[0]?.enabled);
      setVideoEnabled(stream.getVideoTracks()[0]?.enabled);
    };
    updateStreamStatus();

    // Listen for changes in the stream:
    stream.onaddtrack = (event) => {
      console.log(event);
      updateStreamStatus();
    };
    stream.onremovetrack = updateStreamStatus;

    return () => {
      stream.onaddtrack = null;
      stream.onremovetrack = null;
    };
  }, [stream]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center border border-opacity-20 border-white rounded-lg relative p-4">
      {!micEnabled && (
        <Image
          src={mic_off}
          alt="mic"
          className="w-7 h-7 bg-white rounded-full p-1 absolute top-4 right-4"
        />
      )}
      {!videoEnabled ? (
        <video
          className=" bg-black rounded-lg"
          autoPlay
          ref={(video) => {
            if (!video) return;
            video.srcObject = stream;
          }}
        />
      ) : (
        <Image
          src={video_off}
          alt="video"
          className="w-24 h-24 bg-gray-700 rounded-full p-2"
        />
      )}
      <p className="absolute bottom-0 left-0 m-2 font-semibold">{stream.id}</p>
    </div>
  );
};

export default VideoContainer;
