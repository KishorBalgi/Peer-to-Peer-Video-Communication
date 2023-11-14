import {
  newUserJoinedCall,
  receiveSignallingMessage,
} from "../socket/call.services";

export const initLocalStream = async (
  setLocalStream: React.Dispatch<React.SetStateAction<MediaStream | null>>
) => {
  try {
    const localStream = new MediaStream();

    setLocalStream(localStream);

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
  stream: MediaStream,
  toggle: "video" | "audio"
) => {
  // console.log("Stream: ", stream);
  // // Print stream event listeners:
  // console.log(stream.onaddtrack);
  // console.log(stream.onremovetrack);
  // For video:
  if (toggle === "video") {
    try {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        videoTrack.stop();
        return stream.removeTrack(videoTrack);
      }
      const newVideoTrack = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      stream.addTrack(newVideoTrack.getVideoTracks()[0]);
    } catch (err) {
      console.log(err); //🚩 video track error
    }
  }

  // For audio:
  if (toggle === "audio") {
    try {
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        audioTrack.stop();
        return stream.removeTrack(audioTrack);
      }
      const newAudioTrack = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      stream.addTrack(newAudioTrack.getAudioTracks()[0]);
    } catch (err) {
      console.log(err); //🚩 audio track error
    }
  }
};
