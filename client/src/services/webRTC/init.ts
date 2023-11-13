export const initLocalStream = async (
  setLocalStream: React.Dispatch<React.SetStateAction<MediaStream | null>>
) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    // Turn off video and audio tracks by default:
    stream.getTracks().forEach((track) => {
      track.enabled = false;
    });

    setLocalStream(stream);
  } catch (err) {
    console.log(err); //🚩 local stream error
  }
};
