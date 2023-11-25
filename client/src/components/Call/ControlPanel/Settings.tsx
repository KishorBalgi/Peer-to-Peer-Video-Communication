import React, { useState, useEffect } from "react";
import { socket } from "@/services/socket/socket.services";
import { getPeer } from "@/redux/features/call/peerStore";
import { updateTracks } from "@/services/webRTC/peerConnection";

const Settings: React.FC = () => {
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedVideoDevice, setSelectedVideoDevice] = useState<string>("");
  const [selectedAudioDevice, setSelectedAudioDevice] = useState<string>("");

  useEffect(() => {
    const getMediaDevices = async () => {
      try {
        const stream = getPeer(socket.id)?.stream;

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
    console.log("selected video device:", newSelectedVideoDevice);
    const stream = getPeer(socket.id)?.stream;

    if (!stream) return;
    const currentVideoTrack = stream.getVideoTracks()[0];

    const constraints: MediaStreamConstraints = {
      video: { deviceId: newSelectedVideoDevice },
    };

    console.log("constraints:", constraints);
    console.log("current video track:", selectedVideoDevice);

    const newStream = await navigator.mediaDevices.getUserMedia(constraints);
    const newVideoTrack = newStream.getVideoTracks()[0];
    newVideoTrack.enabled = currentVideoTrack.enabled;

    stream.addTrack(newVideoTrack);
    stream.removeTrack(currentVideoTrack);
    currentVideoTrack.stop();

    updateTracks(stream);
  };

  const handleAudioChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newSelectedAudioDevice = event.target.value;
    setSelectedAudioDevice(newSelectedAudioDevice);
    console.log("selected audio device:", newSelectedAudioDevice);
    const stream = getPeer(socket.id)?.stream;

    if (!stream) return;
    const currentAudioTrack = stream.getAudioTracks()[0];

    const constraints: MediaStreamConstraints = {
      audio: { deviceId: newSelectedAudioDevice },
    };

    console.log("constraints:", constraints);
    console.log("current audio track:", selectedAudioDevice);

    const newStream = await navigator.mediaDevices.getUserMedia(constraints);
    const newAudioTrack = newStream.getAudioTracks()[0];
    newAudioTrack.enabled = currentAudioTrack.enabled;
    stream.addTrack(newAudioTrack);
    stream.removeTrack(currentAudioTrack);
    currentAudioTrack.stop();
  };

  return (
    <div className="absolute flex flex-col gap-2 bg-white bottom-20 rounded-lg text-black p-2">
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
