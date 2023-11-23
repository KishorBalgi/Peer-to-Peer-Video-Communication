import { store } from "@/redux/store";
import { socket } from "../socket/socket.services";
import { addPeer, getPeer } from "@/redux/features/call/peerStore";
import { addLocalStream } from "@/redux/features/call/call.slice";
import {
  newUserJoinedCall,
  receiveSignallingMessage,
  userLeftCall,
} from "../socket/call.services";
import { IStream } from "@/types/redux";
import { receiveInCallMessage } from "../socket/chat.services";
import { addMessage } from "@/redux/features/chat/chat.slice";

export const initLocalStream = async () => {
  try {
    // const localStream = new MediaStream();
    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    // disable video and audio tracks:
    localStream.getVideoTracks()[0].enabled = false;
    localStream.getAudioTracks()[0].enabled = false;

    addPeer(socket.id, { stream: localStream, connection: null });
    store.dispatch(
      addLocalStream({
        peerId: socket.id,
        user: {
          id: store.getState().user.id,
          name: store.getState().user.name,
        },
      })
    );

    // New user joined the call:
    newUserJoinedCall();

    // User left the call:
    userLeftCall();

    // Receive signalling message:
    receiveSignallingMessage();

    // Receive chat message:
    receiveInCallMessage((data) => {
      store.dispatch(addMessage(data));
    });
  } catch (err) {
    console.log(err); //🚩 local stream error
  }
};

// Turn on/off video and audio:
export const toggleVideoAudio = async (
  streamData: IStream,
  toggle: "video" | "audio"
) => {
  const stream = getPeer(streamData.peerId)?.stream;
  if (!stream) return console.log("Stream not found");

  // For video:
  if (toggle === "video") {
    try {
      // console.log(stream.getVideoTracks());
      const videoTrack = stream.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      // if (videoTrack) {
      //   videoTrack.enabled = !videoTrack.enabled;
      //   videoTrack.stop();
      //   return stream.removeTrack(videoTrack);
      // }
      // const newVideoTrack = await navigator.mediaDevices.getUserMedia({
      //   video: true,
      // });
      // stream.addTrack(newVideoTrack.getVideoTracks()[0]);
    } catch (err) {
      console.log(err); //🚩 video track error
    }
  }

  // For audio:
  if (toggle === "audio") {
    try {
      const audioTrack = stream.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      // if (audioTrack) {
      //   audioTrack.enabled = !audioTrack.enabled;
      //   audioTrack.stop();
      //   return stream.removeTrack(audioTrack);
      // }
      // const newAudioTrack = await navigator.mediaDevices.getUserMedia({
      //   audio: true,
      // });
      // stream.addTrack(newAudioTrack.getAudioTracks()[0]);
    } catch (err) {
      console.log(err); //🚩 audio track error
    }
  }
};
