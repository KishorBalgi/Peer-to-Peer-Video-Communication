import webRTCConfig from "@/configs/webRTC.config.json";

// STUN servers:
const configuration = {
  iceServers: [{ urls: webRTCConfig.stun_servers }],
};

class PeerConnection {
  private peerConnection: RTCPeerConnection;

  constructor() {
    this.peerConnection = new RTCPeerConnection(configuration);
  }

  public getPeerConnection() {
    return this.peerConnection;
  }

  public addTrack(track: MediaStreamTrack, stream: MediaStream) {
    this.peerConnection.addTrack(track, stream);
  }

  public onTrack(callback: (event: RTCTrackEvent) => void) {
    this.peerConnection.ontrack = callback;
  }

  public onIceCandidate(callback: (event: RTCPeerConnectionIceEvent) => void) {
    this.peerConnection.onicecandidate = callback;
  }

  public async createOffer() {
    const offer = await this.peerConnection.createOffer();
    await this.peerConnection.setLocalDescription(offer);
    return offer;
  }

  public async createAnswer() {
    const answer = await this.peerConnection.createAnswer();
    await this.peerConnection.setLocalDescription(answer);
    return answer;
  }

  public setRemoteDescription(description: RTCSessionDescriptionInit) {
    this.peerConnection.setRemoteDescription(description);
  }

  public addIceCandidate(candidate: RTCIceCandidate) {
    this.peerConnection.addIceCandidate(candidate);
  }

  public close() {
    this.peerConnection.close();
  }
}

export default PeerConnection;
