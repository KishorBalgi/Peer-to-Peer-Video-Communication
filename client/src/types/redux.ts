// Root State:
export interface IRootState {
  call: ICall;
  chat: IChat;
  user: IUser;
}

// User:
export interface IUser {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  token: string;
}

// Stream:
export interface IStream {
  peerId: string;
  user: Pick<IUser, "id" | "name">;
}

// Call:
export interface ICall {
  localStream: IStream | null;
  remoteStreams: IStream[];
}

// Chat Message:
export interface IChatMessage {
  from: string;
  to: string;
  room: string;
  message: string;
}

// Chat:
export interface IChat {
  chats: IChatMessage[];
}
