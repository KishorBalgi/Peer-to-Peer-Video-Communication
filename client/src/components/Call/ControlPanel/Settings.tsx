import React, { useState, useEffect } from "react";
import { socket } from "@/services/socket/socket.services";
import { getPeer } from "@/redux/features/call/peerStore";
import { updateTracks } from "@/services/webRTC/peerConnection";

const Settings = () => {
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedVideoDevice, setSelectedVideoDevice] = useState<string>("");
  const [selectedAudioDevice, setSelectedAudioDevice] = useState<string>("");

  useEffect(() => {
    const getMediaDevices = async () => {
      try {
        // Get the current stream:
        const stream = getPeer(socket.id)?.stream;

        // Get all the devices:
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput"
        );
        const audioDevices = devices.filter(
          (device) => device.kind === "audioinput"
        );

        setVideoDevices(videoDevices);
        setAudioDevices(audioDevices);

        if (!stream) return;
        const currentVideoTrack = stream.getVideoTracks()[0];
        const currentAudioTrack = stream.getAudioTracks()[0];

        setSelectedVideoDevice(
          currentVideoTrack.getSettings().deviceId as string
        );
        setSelectedAudioDevice(
          currentAudioTrack.getSettings().deviceId as string
        );
      } catch (error) {
        console.error("Error enumerating media devices:", error);
      }
    };

    getMediaDevices();
  }, []);

  const handleVideoChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newSelectedVideoDevice = event.target.value;
    setSelectedVideoDevice(newSelectedVideoDevice);

    const stream = getPeer(socket.id)?.stream;

    if (!stream) return;
    const currentVideoTrack = stream.getVideoTracks()[0];

    const constraints: MediaStreamConstraints = {
      video: { deviceId: newSelectedVideoDevice },
    };

    const newStream = await navigator.mediaDevices.getUserMedia(constraints);
    const newVideoTrack = newStream.getVideoTracks()[0];
    newVideoTrack.enabled = currentVideoTrack.enabled;

    stream.addTrack(newVideoTrack);
    stream.removeTrack(currentVideoTrack);
    currentVideoTrack.stop();

    // Update the tracks for all the peers:
    updateTracks(stream);
  };

  const handleAudioChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newSelectedAudioDevice = event.target.value;
    setSelectedAudioDevice(newSelectedAudioDevice);

    const stream = getPeer(socket.id)?.stream;

    if (!stream) return;
    const currentAudioTrack = stream.getAudioTracks()[0];

    const constraints: MediaStreamConstraints = {
      audio: { deviceId: newSelectedAudioDevice },
    };

    const newStream = await navigator.mediaDevices.getUserMedia(constraints);
    const newAudioTrack = newStream.getAudioTracks()[0];
    newAudioTrack.enabled = currentAudioTrack.enabled;

    stream.addTrack(newAudioTrack);
    stream.removeTrack(currentAudioTrack);
    currentAudioTrack.stop();

    // Update the tracks for all the peers:
    updateTracks(stream);
  };

  return (
    <div className="absolute flex flex-col gap-2 bg-white w-full left-36 bottom-20 rounded-lg text-black p-2">
      <div className="my-2">
        <label>Video Devices:</label>

        <select
          className=" bg-gray-200 rounded-lg focus:outline-none p-2 w-full"
          value={selectedVideoDevice}
          onChange={handleVideoChange}
        >
          {videoDevices.map((device) => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label}
            </option>
          ))}
        </select>
      </div>

      <div className="my-2">
        <label>Audio Devices:</label>
        <select
          className=" bg-gray-200 rounded-lg focus:outline-none p-2 w-full"
          value={selectedAudioDevice}
          onChange={handleAudioChange}
        >
          {audioDevices.map((device) => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Settings;
