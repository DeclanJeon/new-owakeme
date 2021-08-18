import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import AgoraRTC  from 'agora-rtc-sdk-ng';

let screenClient = null;
let screenTrack = null;

export default function RTCClient(client) {
  const channelName = useSelector(state => state.channelReducer.channelName);
  const userName = useSelector(state => state.userReducer.userName)
  const cameraId = useSelector(state => state.deviceReducer.cameraId)
  const audioId = useSelector(state => state.deviceReducer.audioId)
  
  const [localVideoTrack, setLocalVideoTrack] = useState(undefined)
  const [localAudioTrack, setLocalAudioTrack] = useState(undefined)
  const [remoteUsers, setRemoteUsers] = useState([]);
  const dispatch = useDispatch();

  async function createLocalTracks() {
    const microphoneTrack = await AgoraRTC.createMicrophoneAudioTrack({ AEC: true, AGC: true, ANS: true, audioId: audioId });
    const cameraTrack = await AgoraRTC.createCameraVideoTrack({ cameraId: cameraId });

    setLocalVideoTrack(cameraTrack)
    setLocalAudioTrack(microphoneTrack)

    return [microphoneTrack, cameraTrack];
  }

  async function join() {
    if (!client) return;
    const [microphoneTrack, cameraTrack] = await createLocalTracks();
    await client.join(process.env.REACT_APP_AGORA_APP_ID, channelName, null);
    await client.publish([microphoneTrack, cameraTrack]);
  }

  async function leave() {
    if (localAudioTrack) {
      localAudioTrack.stop();
      localAudioTrack.close();
    }
    if (localVideoTrack) {
      localVideoTrack.stop();
      localVideoTrack.close();
    }
    setRemoteUsers([]);
    await client?.leave();
  }

  async function share() {
    if(screenClient){
      screenClient.unpublish(screenTrack);
      if(screenTrack){
        screenTrack.stop();
        screenTrack.close();
      }
      screenClient.leave();
      screenClient = null;
      screenTrack = null; 
    }else{
      screenClient = AgoraRTC.createClient({ codec: 'h264', mode: 'rtc' });
      await screenClient.join(process.env.REACT_APP_AGORA_APP_ID, channelName, null);

      screenTrack = await AgoraRTC.createScreenVideoTrack({encoderConfig: "1080p_1"});
      await screenClient.publish(screenTrack);

      screenTrack.on("track-ended", () => {
        screenClient.unpublish(screenTrack);
        screenTrack.stop();
        screenTrack.close();
        screenClient.leave();

        screenClient = null;
        screenTrack = null;
      })
      return screenTrack;
    }
    
  }

  function onUseRtcMic(useYn) {
    localAudioTrack.setMuted(useYn);
  }

  function onUseRtcVideoCam(useYn) {
    localVideoTrack.setMuted(useYn);
  }

  useEffect(() => {
    if (!client) return;
    join();

    const handleUserPublished = async (user, mediaType) => {
      await client.subscribe(user, mediaType);
      setRemoteUsers(remoteUsers => Array.from(client.remoteUsers));
    }
    const handleUserUnpublished = (user) => {
      //setRemoteUsers(remoteUsers => Array.from(client.remoteUsers));
    }
    const handleUserJoined = (user) => {
      //setRemoteUsers(remoteUsers => Array.from(client.remoteUsers));
    }
    const handleUserLeft = (user) => {
      //setRemoteUsers(remoteUsers => Array.from(client.remoteUsers));
    }
    const handleConnectionStateChange = (curState, prevState) => {
      
    }

    client.on('user-published', handleUserPublished);
    client.on('user-unpublished', handleUserUnpublished);
    client.on('user-joined', handleUserJoined);
    client.on('user-left', handleUserLeft);
    client.on('connection-state-change', handleConnectionStateChange);
    return () => {
      client.off('user-published', handleUserPublished);
      client.off('user-unpublished', handleUserUnpublished);
      client.off('user-joined', handleUserJoined);
      client.off('user-left', handleUserLeft);
      client.off('connection-state-change', handleConnectionStateChange)
    };
  }, [client]);

  return {
    localVideoTrack,
    localAudioTrack,
    remoteUsers,
    share,
    leave,
    onUseRtcMic,
    onUseRtcVideoCam
  };
}