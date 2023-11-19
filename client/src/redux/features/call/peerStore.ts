interface IPeerStore {
  stream: MediaStream;
  connection: RTCPeerConnection | null;
}

const mediaStreamStore: Map<string, IPeerStore> = new Map();

export const addPeer = (id: string, peer: IPeerStore): void => {
  mediaStreamStore.set(id, peer);
};

export const getPeer = (id: string): IPeerStore | undefined => {
  return mediaStreamStore.get(id);
};

export const removePeer = (id: string): void => {
  mediaStreamStore.delete(id);
};
