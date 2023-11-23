// Callback response:
export type TCallbackResponse = {
  status: string;
  message: string;
  data: any;
};

// User Joined:
export type TUserJoined = {
  userSocketId: string;
  user: {
    id: string;
    name: string;
  };
};

// Signalling message:
export type TSignallingMessage = {
  to: string;
  from: string;
  user?: {
    id: string;
    name: string;
  };
  room?: string;
  type: "offer" | "answer" | "candidate";
  data: RTCSessionDescriptionInit | RTCIceCandidateInit;
};

// Chat message:
export type TChatMessage = {
  from: string;
  to: string;
  room: string;
  message: string;
};
