// Callback response:
export type TCallbackResponse = {
  status: string;
  message: string;
  data: any;
};

// Join Call:
export type TJoinCall = {
  callId: string;
  userSocketId: string;
};

// Create Call:
export type TCreateCall = {
  userSocketId: string;
};

// Signalling message:
export type TSignallingMessage = {
  to: string;
  type: "offer" | "answer" | "candidate";
  data: RTCSessionDescriptionInit | RTCIceCandidateInit;
};

export interface ServerToClientEvents {
  user_joined: (id: string) => void;
}

export interface ClientToServerEvents {
  start_new_call: (
    data: TCreateCall,
    callback: (res: TCallbackResponse) => void
  ) => void;
  join_call: (data: TJoinCall) => void;
}
