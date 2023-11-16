"use client";
import React, { useState, createContext, useContext } from "react";

const RemoteStreamsContext = createContext<{
  remoteStreams: MediaStream[] | null;
  setRemoteStreams: React.Dispatch<React.SetStateAction<MediaStream[]>>;
}>({ remoteStreams: [], setRemoteStreams: () => {} });

export const useRemoteStreams = () => useContext(RemoteStreamsContext);

export const RemoteStreamsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [remoteStreams, setRemoteStreams] = useState<MediaStream[]>([]);

  return (
    <RemoteStreamsContext.Provider value={{ remoteStreams, setRemoteStreams }}>
      {children}
    </RemoteStreamsContext.Provider>
  );
};
