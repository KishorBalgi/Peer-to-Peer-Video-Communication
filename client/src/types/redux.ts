// Stream:
export interface IStream {
  id: string;
  stream: MediaStream;
}

// Call:
export interface ICall {
  localStream: IStream | null;
  remoteStreams: IStream[];
}
