"use client";
import React, { useRef, useEffect } from "react";
import VideoContainer from "./VideoContainer";
import { useLocalStream } from "@/contexts/LocalStreamContext";
import { useStreams } from "@/contexts/StreamsContext";

const VideoGrid = () => {
  const { localStream } = useLocalStream();
  const { streams } = useStreams();
  const gridRef = useRef(null);

  useEffect(() => {
    if (gridRef.current === null) return;

    const gridElement = gridRef.current as HTMLDivElement;
    const members = streams?.length || 0;

    let numCols = 1;
    if (members > 4) numCols = 3;
    else if (members > 1) numCols = 2;

    gridElement.classList.remove("grid-cols-1", "grid-cols-2", "grid-cols-3");
    gridElement.classList.add(`grid-cols-${numCols}`);
  }, [streams, localStream]);

  return (
    <div
      ref={gridRef}
      className="video-grid w-full grid h-[100vh] grid-cols-3 gap-2 px-5 pb-24 pt-5"
    >
      {localStream && <VideoContainer stream={localStream} />}
      {streams?.map((peer: any, index: number) => {
        return <VideoContainer key={index} stream={peer} />;
      })}
    </div>
  );
};

export default VideoGrid;
