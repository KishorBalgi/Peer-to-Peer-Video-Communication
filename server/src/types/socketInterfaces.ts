// Callback response:
export type ICallbackResponse = {
  status: string;
  message: string;
  data: any;
};

// Join Call:
export type IJoinCall = {
  callId: string;
  userSocketId: string;
};

// Create Call:
export type ICreateCall = {
  userSocketId: string;
};

export interface ServerToClientEvents {}

export interface ClientToServerEvents {
  start_new_call: (
    data: ICreateCall,
    callback: (res: ICallbackResponse) => void
  ) => void;
  join_call: (data: IJoinCall) => void;
}
