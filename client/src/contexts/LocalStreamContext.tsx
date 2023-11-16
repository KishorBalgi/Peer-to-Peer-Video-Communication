"use client";

import React, { useState, useContext, createContext } from "react";

const LocalStreamsContext = createContext<{
  localStream: MediaStream | null;
  setLocalStream: React.Dispatch<React.SetStateAction<MediaStream | null>>;
}>({ localStream: null, setLocalStream: () => {} });

export const useLocalStream = () => useContext(LocalStreamsContext);

export const LocalStreamsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);

  return (
    <LocalStreamsContext.Provider value={{ localStream, setLocalStream }}>
      {children}
    </LocalStreamsContext.Provider>
  );
};
