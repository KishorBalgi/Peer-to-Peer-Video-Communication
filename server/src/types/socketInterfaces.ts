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
  user: {
    id: string;
    name: string;
  };
};

// Leave Call:
export type TLeaveCall = {
  callId: string;
  userSocketId: string;
};

// Create Call:
export type TCreateCall = {
  userSocketId: string;
  userId: string;
};

// Chat message:
export type TChatMessage = {
  from: string;
  to: string;
  room: string;
  message: string;
};

// Signalling message:
export type TSignallingMessage = {
  to: string;
  from: string;
  room: string;
  type: "offer" | "answer" | "candidate";
  data: RTCSessionDescriptionInit | RTCIceCandidateInit;
};

export interface ServerToClientEvents {
  user_joined: (id: string) => void;
  signal_msg: (data: TSignallingMessage) => void;
  chat_msg: (data: TChatMessage) => void;
  user_left: (id: string) => void;
}

export interface ClientToServerEvents {
  start_new_call: (
    data: TCreateCall,
    callback: (res: TCallbackResponse) => void
  ) => void;
  join_call: (data: TJoinCall) => void;
  signal_msg: (data: TSignallingMessage) => void;
  chat_msg: (data: TChatMessage) => void;
  leave_call: (data: TLeaveCall) => void;
}
