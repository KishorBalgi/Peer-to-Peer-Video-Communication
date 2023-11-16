import { store } from "@/redux/store";
import { addLocalStream } from "@/redux/features/call/call.slice";
import {
  newUserJoinedCall,
  receiveSignallingMessage,
} from "../socket/call.services";
import { IStream } from "@/types/redux";

export const initLocalStream = async () => {
  try {
    const localStream = new MediaStream();

    store.dispatch(addLocalStream({ id: "me", stream: localStream }));

    // Event listener for new user joined the call:
    newUserJoinedCall(localStream);

    // Event listener for receiving signalling message:
    receiveSignallingMessage(localStream);
  } catch (err) {
    console.log(err); //🚩 local stream error
  }
};

// Turn on/off video and audio:
export const toggleVideoAudio = async (
  streamData: IStream,
  toggle: "video" | "audio"
) => {
  // console.log("Stream: ", stream);
  // // Print stream event listeners:
  // console.log(stream.onaddtrack);
  // console.log(stream.onremovetrack);
  // For video:
  if (toggle === "video") {
    try {
      const videoTrack = streamData.stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        videoTrack.stop();
        return streamData.stream.removeTrack(videoTrack);
      }
      const newVideoTrack = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      streamData.stream.addTrack(newVideoTrack.getVideoTracks()[0]);
    } catch (err) {
      console.log(err); //🚩 video track error
    }
  }

  // For audio:
  if (toggle === "audio") {
    try {
      const audioTrack = streamData.stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        audioTrack.stop();
        return streamData.stream.removeTrack(audioTrack);
      }
      const newAudioTrack = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      streamData.stream.addTrack(newAudioTrack.getAudioTracks()[0]);
    } catch (err) {
      console.log(err); //🚩 audio track error
    }
  }
};
