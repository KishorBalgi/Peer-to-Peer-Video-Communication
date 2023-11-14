"use client";
import React, { useRef, useEffect } from "react";
import VideoContainer from "./VideoContainer";
import { useLocalStream } from "@/contexts/LocalStreamContext";
import { useRemoteStreams } from "@/contexts/RemoteStreamsContext";

const VideoGrid = () => {
  const { localStream } = useLocalStream();
  const { remoteStreams } = useRemoteStreams();
  const gridRef = useRef(null);

  useEffect(() => {
    if (gridRef.current === null) return;

    const gridElement = gridRef.current as HTMLDivElement;
    const members = remoteStreams?.length || 0;

    let numCols = 1;
    if (members > 4) numCols = 3;
    else if (members > 1) numCols = 2;

    gridElement.classList.remove("grid-cols-1", "grid-cols-2", "grid-cols-3");
    gridElement.classList.add(`grid-cols-${numCols}`);
  }, [remoteStreams, localStream]);

  return (
    <div
      ref={gridRef}
      className="video-grid w-full grid h-[100vh] grid-cols-3 gap-2 px-5 pb-24 pt-5"
    >
      {localStream && <VideoContainer stream={localStream} />}
      {remoteStreams?.map((peer: any, index: number) => {
        return <VideoContainer key={index} stream={peer} />;
      })}
    </div>
  );
};

export default VideoGrid;
