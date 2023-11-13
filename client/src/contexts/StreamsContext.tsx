"use client";
import React, { useState, createContext, useContext } from "react";

const StreamsContext = createContext<{
  streams: MediaStream[] | null;
  setStreams: React.Dispatch<React.SetStateAction<MediaStream[]>>;
}>({ streams: [], setStreams: () => {} });

export const useStreams = () => useContext(StreamsContext);

export const StreamsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [streams, setStreams] = useState<MediaStream[]>([]);

  return (
    <StreamsContext.Provider value={{ streams, setStreams }}>
      {children}
    </StreamsContext.Provider>
  );
};
