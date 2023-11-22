import { useRouter } from "next/navigation";
import { store } from "@/redux/store";
import { socket } from "../socket/socket.services";
import {
  addRemoteStream,
  removeLocalStream,
  removeRemoteStream,
} from "@/redux/features/call/call.slice";
import webRTCConfig from "@/configs/webRTC.config.json";
import { leaveCall, sendSignallingMessage } from "../socket/call.services";
import { TSignallingMessage } from "@/types/socket";
import { addPeer, getPeer, removePeer } from "@/redux/features/call/peerStore";
import { removeCallListeners } from "../socket/socket.cleanup";
import {
  toastLoading,
  toastMessage,
  toastUpdate,
} from "@/components/Notifications/toasts";

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
        room: socket.callId,
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
    room: socket.callId,
    type: "offer",
    data: offer,
  });
};

// Create answer:
const createAnswer = async (message: TSignallingMessage) => {
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
    room: socket.callId,
    type: "answer",
    data: answer,
  });
};

// Add answer:
const addAnswer = async (message: TSignallingMessage) => {
  console.log("Adding answer from peer: ", message.from);

  const peerConnection = getPeer(message.from)?.connection;

  if (!peerConnection)
    return console.log("Add answer: Peer connection not found");

  if (!peerConnection.currentRemoteDescription) {
    await peerConnection.setRemoteDescription(
      message.data as RTCSessionDescriptionInit
    );
  }

  toastMessage({ type: "info", message: `${message.from} joined` });
};

// Handle ICE candidate event:
const handleICECandidateEvent = (message: TSignallingMessage) => {
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

// Leave call:
export const leaveCallHandler = (navigate: ReturnType<typeof useRouter>) => {
  const loadingToastId = toastLoading("Leaving call...");

  // Get all peer ids:
  const peerIds = store
    .getState()
    .call.remoteStreams.map((stream) => stream.peerId);

  // Close all peer connections and remove remote streams:
  peerIds.forEach((peerId) => {
    const peerConnection = getPeer(peerId)?.connection;
    if (!peerConnection) return console.log("Leave call: Peer not found");
    peerConnection.close();
    removePeer(peerId);
    store.dispatch(removeRemoteStream(peerId));
  });

  // Close local stream:
  const localStream = getPeer(socket.id)?.stream;
  if (!localStream) return console.log("Local stream not found");
  localStream.getTracks().forEach((track) => track.stop());
  removePeer(socket.id);
  store.dispatch(removeLocalStream());
  // Send user left socket event:
  leaveCall();

  // Socket cleanup:
  removeCallListeners();

  toastUpdate(loadingToastId, "success", "You left", false);

  // Redirect to home page:
  navigate.push("/");
};

// User left call:
export const userLeftCallHandler = (peerId: string) => {
  const peerConnection = getPeer(peerId)?.connection;
  if (!peerConnection) return console.log("User left call: Peer not found");
  peerConnection.close();
  removePeer(peerId);
  store.dispatch(removeRemoteStream(peerId));
};
