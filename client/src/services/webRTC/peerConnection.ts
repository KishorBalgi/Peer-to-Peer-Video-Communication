import { useRouter } from "next/navigation";
import { store } from "@/redux/store";

import {
  toastLoading,
  toastMessage,
  toastUpdate,
} from "@/components/Notifications/toasts";
import {
  addRemoteStream,
  removeLocalStream,
  removeRemoteStream,
} from "@/redux/features/call/call.slice";
import { addPeer, getPeer, removePeer } from "@/redux/features/call/peerStore";

import { socket } from "../socket/socket.services";
import { leaveCall, sendSignallingMessage } from "../socket/call.services";
import { removeCallListeners } from "../socket/socket.cleanup";
import webRTCConfig from "@/configs/webRTC.config.json";
import { TSignallingMessage, TUserJoined } from "@/types/socket";

// STUN servers:
const configuration = {
  iceServers: [{ urls: webRTCConfig.stun_servers }],
};

// Create RTC peer connection:
const createRTCPeerConnection = async (data: TUserJoined) => {
  const { userSocketId, user } = data;
  let peerConnection: RTCPeerConnection = new RTCPeerConnection(configuration);

  const localStream = getPeer(socket.id)?.stream;

  if (!localStream) return console.log("Local stream not found");

  // Add local stream to peer connection:
  localStream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, localStream);
  });

  let remoteStream: MediaStream = new MediaStream();

  // Add peer to peerStore and redux store:
  addPeer(userSocketId, { stream: remoteStream, connection: peerConnection });
  store.dispatch(
    addRemoteStream({
      peerId: userSocketId,
      user,
    })
  );

  // Event listener for remote stream:
  peerConnection.ontrack = (event) => {
    event.streams[0].getTracks().forEach((track) => {
      remoteStream.addTrack(track);
    });
  };

  // Event listener for ICE candidate:
  peerConnection.onicecandidate = (event) => {
    // Send ICE candidate to peer:
    if (event.candidate) {
      sendSignallingMessage({
        to: userSocketId,
        from: socket.id,
        room: socket.callId,
        type: "candidate",
        data: event.candidate,
      });
    }
  };
};

// Create offer:
export const createOffer = async (data: TUserJoined) => {
  const { userSocketId } = data;

  await createRTCPeerConnection(data);

  const peerConnection = getPeer(userSocketId)?.connection;

  if (!peerConnection)
    return console.log("Create Offer: Peer connection not found");

  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);

  // 🚩 Send offer to peer:
  sendSignallingMessage({
    to: userSocketId,
    from: socket.id,
    user: {
      id: socket.id,
      name: store.getState().user.name,
    },
    room: socket.callId,
    type: "offer",
    data: offer,
  });
};

// Create answer:
const createAnswer = async (message: TSignallingMessage) => {
  await createRTCPeerConnection({
    userSocketId: message.from,
    user: message.user as TUserJoined["user"],
  });

  const peerConnection = getPeer(message.from)?.connection;

  if (!peerConnection) return;

  await peerConnection.setRemoteDescription(
    message.data as RTCSessionDescriptionInit
  );

  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);

  // Send answer to peer:
  sendSignallingMessage({
    to: message.from,
    from: socket.id,
    user: {
      id: socket.id,
      name: store.getState().user.name,
    },
    room: socket.callId,
    type: "answer",
    data: answer,
  });
};

// Add answer:
const addAnswer = async (message: TSignallingMessage) => {
  const peerConnection = getPeer(message.from)?.connection;

  if (!peerConnection) return;

  if (!peerConnection.currentRemoteDescription) {
    await peerConnection.setRemoteDescription(
      message.data as RTCSessionDescriptionInit
    );
  }

  toastMessage({ type: "info", message: `${message.user?.name} joined` });
};

// Handle ICE candidate event:
const handleICECandidateEvent = (message: TSignallingMessage) => {
  const peerConnection = getPeer(message.from)?.connection;

  if (!peerConnection) return;

  try {
    peerConnection.addIceCandidate(message.data as RTCIceCandidate);
  } catch (err) {
    console.log(err);
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
    if (peerConnection) {
      peerConnection.close();
      removePeer(peerId);
    }
    // Remove remote stream:
    store.dispatch(removeRemoteStream(peerId));
  });

  // Close local stream:
  const localStream = getPeer(socket.id)?.stream;
  if (localStream) {
    localStream.getTracks().forEach((track) => track.stop());
    removePeer(socket.id);
    store.dispatch(removeLocalStream());
  }
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
  const peer = store
    .getState()
    .call.remoteStreams.find((p) => p.peerId === peerId);
  if (!peerConnection) return;

  peerConnection.close();
  removePeer(peerId);
  store.dispatch(removeRemoteStream(peerId));

  toastMessage({ type: "info", message: `${peer?.user.name} left` });
};

// Update tracks:
export const updateTracks = (stream: MediaStream) => {
  const peers = store.getState().call.remoteStreams;

  peers.forEach((peer) => {
    const peerConnection = getPeer(peer.peerId)?.connection;

    if (!peerConnection) return;

    // Replace tracks:
    peerConnection.getSenders().forEach((sender) => {
      if (sender.track?.kind === "audio") {
        sender.replaceTrack(stream.getAudioTracks()[0]);
      }
      if (sender.track?.kind === "video") {
        sender.replaceTrack(stream.getVideoTracks()[0]);
      }
    });
  });
};
