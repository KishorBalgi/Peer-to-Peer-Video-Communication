import { store } from "@/redux/store";
import { addRemoteStream } from "@/redux/features/call/call.slice";
import webRTCConfig from "@/configs/webRTC.config.json";
import { sendSignallingMessage } from "../socket/call.services";
import { TSignallingMessage } from "@/types/socket";

// STUN servers:
const configuration = {
  iceServers: [{ urls: webRTCConfig.stun_servers }],
};

// Create RTC peer connection:
let peerConnection: RTCPeerConnection = new RTCPeerConnection(configuration);
const createRTCPeerConnection = (localStream: MediaStream, userId: string) => {
  // Add local stream to peer connection:
  localStream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, localStream);
  });

  let remoteStream: MediaStream = new MediaStream();
  store.dispatch(addRemoteStream({ id: userId, stream: remoteStream }));

  // Event listener for remote stream:
  peerConnection.ontrack = (event) => {
    event.streams[0].getTracks().forEach((track) => {
      remoteStream.addTrack(track);
    });
  };

  // Event listener for ICE candidate:
  peerConnection.onicecandidate = (event) => {
    // 🚩 Send ICE candidate to peer:
    if (event.candidate) {
      sendSignallingMessage({
        type: "candidate",
        to: userId,
        data: event.candidate,
      });
    }
  };
};

// Create offer:
export const createOffer = async (localStream: MediaStream, userId: string) => {
  await createRTCPeerConnection(localStream, userId);

  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);

  // 🚩 Send offer to peer:
  console.log("Creating offer");
  sendSignallingMessage({
    type: "offer",
    to: userId,
    data: offer,
  });
};

// Create answer:
export const createAnswer = async (
  localStream: MediaStream,
  userId: string,
  offer: RTCSessionDescriptionInit
) => {
  console.log("Creating answer");
  await createRTCPeerConnection(localStream, userId);

  await peerConnection
    .setRemoteDescription(offer)
    .then(() => {
      console.log("Remote description set");
    })
    .catch((err) => {
      console.log(err);
    });

  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);

  // 🚩 Send answer to peer:
  sendSignallingMessage({
    type: "answer",
    to: userId,
    data: answer,
  });
};

// Add answer:
export const addAnswer = async (answer: RTCSessionDescriptionInit) => {
  console.log("Adding answer");
  await peerConnection
    .setRemoteDescription(answer)
    .then(() => {
      console.log("Remote description set");
    })
    .catch((err) => {
      console.log(err);
    });
};

// Handle ICE candidate event:
export const handleICECandidateEvent = async (
  candidate: RTCIceCandidateInit
) => {
  console.log("Handling ICE candidate event");
  try {
    await peerConnection.addIceCandidate(candidate);
  } catch (err) {
    console.log(err); //🚩 ICE candidate error
  }
};

// Handle signalling message:
export const handleSignallingMessage = async (
  message: TSignallingMessage,
  localStream: MediaStream
) => {
  switch (message.type) {
    case "offer":
      await createAnswer(
        localStream,
        message.to,
        message.data as RTCSessionDescriptionInit
      );
      break;
    case "answer":
      await addAnswer(message.data as RTCSessionDescriptionInit);
      break;
    case "candidate":
      await handleICECandidateEvent(message.data as RTCIceCandidateInit);
      break;
  }
};
