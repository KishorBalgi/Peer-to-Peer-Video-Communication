import { store } from "@/redux/store";
import { socket } from "../socket/socket.services";
import { addRemoteStream } from "@/redux/features/call/call.slice";
import webRTCConfig from "@/configs/webRTC.config.json";
import { sendSignallingMessage } from "../socket/call.services";
import { TSignallingMessage } from "@/types/socket";
import { addPeer, getPeer } from "@/redux/features/call/peerStore";

// STUN servers:
const configuration = {
  iceServers: [{ urls: webRTCConfig.stun_servers }],
};

// Create RTC peer connection:
const createRTCPeerConnection = async (userId: string) => {
  let peerConnection: RTCPeerConnection = new RTCPeerConnection(configuration);
  console.log("New Peer Connection:", peerConnection);
  const localStream = getPeer(socket.id)?.stream;

  if (!localStream) return console.log("Local stream not found");

  // Add local stream to peer connection:
  localStream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, localStream);
  });

  let remoteStream: MediaStream = new MediaStream();

  addPeer(userId, { stream: remoteStream, connection: peerConnection });
  store.dispatch(
    addRemoteStream({
      peerId: userId,
    })
  );

  // Event listener for remote stream:
  peerConnection.ontrack = (event) => {
    console.log("Remote stream received");
    event.streams[0].getTracks().forEach((track) => {
      remoteStream.addTrack(track);
    });
  };

  // Event listener for ICE candidate:
  peerConnection.onicecandidate = (event) => {
    // 🚩 Send ICE candidate to peer:
    if (event.candidate) {
      sendSignallingMessage({
        to: userId,
        from: socket.id,
        room: socket.roomId,
        type: "candidate",
        data: event.candidate,
      });
    }
  };
};

// Create offer:
export const createOffer = async (userId: string) => {
  await createRTCPeerConnection(userId);

  const peerConnection = getPeer(userId)?.connection;

  if (!peerConnection)
    return console.log("Create Offer: Peer connection not found");

  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);

  // 🚩 Send offer to peer:
  console.log("Offer sent to peer: ", userId);
  sendSignallingMessage({
    to: userId,
    from: socket.id,
    room: socket.roomId,
    type: "offer",
    data: offer,
  });
};

// Create answer:
export const createAnswer = async (message: TSignallingMessage) => {
  await createRTCPeerConnection(message.from);

  const peerConnection = getPeer(message.from)?.connection;

  if (!peerConnection)
    return console.log("Create Offer: Peer connection not found");

  await peerConnection.setRemoteDescription(
    message.data as RTCSessionDescriptionInit
  );

  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);

  // 🚩 Send answer to peer:
  console.log("Answer sent to peer: ", message.from);
  sendSignallingMessage({
    to: message.from,
    from: socket.id,
    room: socket.roomId,
    type: "answer",
    data: answer,
  });
};

// Add answer:
export const addAnswer = async (message: TSignallingMessage) => {
  console.log("Adding answer from peer: ", message.from);

  const peerConnection = getPeer(message.from)?.connection;

  if (!peerConnection)
    return console.log("Add answer: Peer connection not found");

  if (!peerConnection.currentRemoteDescription) {
    await peerConnection.setRemoteDescription(
      message.data as RTCSessionDescriptionInit
    );
  }
};

// Handle ICE candidate event:
export const handleICECandidateEvent = (message: TSignallingMessage) => {
  // console.log("Handling ICE candidate event");
  const peerConnection = getPeer(message.from)?.connection;

  if (!peerConnection) return console.log("ICE: Peer connection not found");

  try {
    peerConnection.addIceCandidate(message.data as RTCIceCandidate);
  } catch (err) {
    console.log(err); //🚩 ICE candidate error
  }
};

// Handle signalling message:
export const handleSignallingMessage = (message: TSignallingMessage) => {
  switch (message.type) {
    case "offer":
      createAnswer(message);
      break;
    case "answer":
      addAnswer(message);
      break;
    case "candidate":
      handleICECandidateEvent(message);
      break;
  }
};
