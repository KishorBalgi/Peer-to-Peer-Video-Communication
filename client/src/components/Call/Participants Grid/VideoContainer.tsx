"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

import mic_off from "@/assets/icons/mic-off.svg";
import mic_on from "@/assets/icons/mic-on.svg";
import video_off from "@/assets/icons/video-off.svg";
import { getPeer } from "@/redux/features/call/peerStore";
import { socket } from "@/services/socket/socket.services";
import { useSelector } from "react-redux";
import { IRootState } from "@/types/redux";

type VideoContainerProps = {
  peerId: string;
};

const VideoContainer = ({ peerId }: VideoContainerProps) => {
  const stream = getPeer(peerId)?.stream;
  const peer = useSelector((state: IRootState) => {
    return state.call.remoteStreams.find((p) => p.peerId === peerId);
  });

  return (
    <div className="w-full h-full flex flex-col justify-center items-center border border-opacity-20 border-white rounded-lg relative p-4">
      {/* {true && (
        <Image
          src={mic_off}
          alt="mic"
          className="w-7 h-7 bg-white rounded-full p-1 absolute top-4 right-4"
        />
      )} */}
      {true ? (
        <video
          className="h-full bg-black rounded-lg"
          autoPlay
          muted={peerId === socket.id}
          ref={(video) => {
            if (!video) return;
            video.srcObject = stream as MediaProvider;
          }}
        />
      ) : (
        <Image
          src={video_off}
          alt="video"
          className="w-24 h-24 bg-gray-700 rounded-full p-2"
        />
      )}
      <p className="absolute bottom-0 left-0 m-2 font-semibold">
        {peer?.user.name || "You"}
      </p>
    </div>
  );
};

export default VideoContainer;
