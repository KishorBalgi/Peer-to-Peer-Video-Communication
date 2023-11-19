// Callback response:
export type TCallbackResponse = {
  status: string;
  message: string;
  data: any;
};

// Signalling message:
export type TSignallingMessage = {
  to: string;
  from: string;
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
