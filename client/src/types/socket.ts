// Callback response:
export type TCallbackResponse = {
  status: string;
  message: string;
  data: any;
};

// Signalling message:
export type TSignallingMessage = {
  to: string;
  type: "offer" | "answer" | "candidate";
  data: RTCSessionDescriptionInit | RTCIceCandidateInit;
};
