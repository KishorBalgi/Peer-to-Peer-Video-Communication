"use client";
import React, { useRef, useEffect } from "react";
import VideoContainer from "./VideoContainer";

const peers = [1, 2, 3, 4, 5, 6];
const VideoGrid = () => {
  const gridRef = useRef(null);

  useEffect(() => {
    if (gridRef.current === null) return;

    const gridElement = gridRef.current as HTMLDivElement;
    const members = peers.length;

    let numCols = 1;
    if (members > 4) numCols = 3;
    else if (members > 1) numCols = 2;

    gridElement.classList.remove("grid-cols-1", "grid-cols-2", "grid-cols-3");
    gridElement.classList.add(`grid-cols-${numCols}`);
  }, [peers]);

  return (
    <div
      ref={gridRef}
      className="video-grid w-full grid h-[100vh] grid-cols-3 gap-2 px-5 pb-24 pt-5"
    >
      {peers.map((peer: any, index: number) => {
        return <VideoContainer key={index} />;
      })}
    </div>
  );
};

export default VideoGrid;
