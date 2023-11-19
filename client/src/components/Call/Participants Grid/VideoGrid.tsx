"use client";
import React, { useRef, useEffect } from "react";
import VideoContainer from "./VideoContainer";
import { useSelector } from "react-redux";
import { IRootState, IStream } from "@/types/redux";
import { socket } from "@/services/socket/socket.services";

const VideoGrid = () => {
  const gridRef = useRef(null);
  const localStream = useSelector(
    (state: IRootState) => state.call.localStream
  );
  const remoteStreams = useSelector(
    (state: IRootState) => state.call.remoteStreams
  );

  useEffect(() => {
    if (gridRef.current === null) return;

    const gridElement = gridRef.current as HTMLDivElement;
    const members = remoteStreams?.length + 1 || 0;

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
      {localStream && <VideoContainer {...localStream} />}
      {remoteStreams?.map((peer: IStream) => {
        return <VideoContainer key={peer.peerId} {...peer} />;
      })}
    </div>
  );
};

export default VideoGrid;
