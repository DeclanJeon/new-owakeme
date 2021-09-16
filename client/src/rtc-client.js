import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import AgoraRTC  from 'agora-rtc-sdk-ng';
import { onLocalTrack, onLeaveLocalTrack } from './reducer/actions/track';

let screenClient = undefined;
let screenTrack = undefined;

export default function RTCClient(client) {
  const channelName = useSelector(state => state.channelReducer.channelName);
  const { audioId, cameraId, resolution } = useSelector(state => state.deviceReducer);
  const { localVideo, localAudio, localClient } = useSelector(state => state.trackReducer);

  const [localVideoTrack, setLocalVideoTrack] = useState(undefined);
  const [localAudioTrack, setLocalAudioTrack] = useState(undefined);
  const [localUid, setLocalUid] = useState('');
  const [remoteUsers, setRemoteUsers] = useState([]);

  const dispatch = useDispatch();

  async function createLocalTracks() {
    const microphoneTrack = await AgoraRTC.createMicrophoneAudioTrack({ AEC: true, AGC: true, ANS: true, audioId: audioId });
    const cameraTrack = await AgoraRTC.createCameraVideoTrack({ cameraId: cameraId, encoderConfig: resolution});

    dispatch(onLocalTrack(cameraTrack, microphoneTrack, client));
    setLocalVideoTrack(cameraTrack)
    setLocalAudioTrack(microphoneTrack)

    return [microphoneTrack, cameraTrack];
  }

  async function join() {
    if (!client) return;
    const [microphoneTrack, cameraTrack] = await createLocalTracks();
    const uid = await client.join(process.env.REACT_APP_AGORA_APP_ID, channelName, null);
    setLocalUid(uid);
    await client.publish([microphoneTrack, cameraTrack]);
  }

  async function leave(video, audio, userClient) {
    if(screenClient && screenTrack){
      leaveShareScreen(screenClient, screenTrack);
    }

    if (audio) {
      audio.stop();
      audio.close();
    }
    if (video) {
      video.stop();
      video.close();
    }
    dispatch(onLeaveLocalTrack());
    setRemoteUsers([]);
    await userClient?.leave();
  }

  function leaveShareScreen(screenClient, screenTrack) {
    screenClient.unpublish(screenTrack);
    screenTrack.stop();
    screenTrack.close();

    screenClient.leave();
    screenClient = undefined;
    screenTrack = undefined; 
  }

  async function share() {
    if(screenClient && screenTrack){
      leaveShareScreen(screenClient, screenTrack);
    }else{
      screenClient = AgoraRTC.createClient({ codec: 'h264', mode: 'rtc' });
      await screenClient.join(process.env.REACT_APP_AGORA_APP_ID, channelName, null);

      screenTrack = await AgoraRTC.createScreenVideoTrack({encoderConfig: resolution});
      await screenClient.publish(screenTrack);

      screenTrack.on("track-ended", () => {
        leaveShareScreen(screenClient, screenTrack);
        setRemoteUsers(remoteUsers => Array.from(client.remoteUsers));
      })
      return screenTrack;
    }
    
  }

  useEffect(() => {
    if (!client) return;

    if(localClient){
      leave(localVideo, localAudio, localClient).then(() => {
        join();
      });
    }else{
      join();
    }
    
    

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
      setRemoteUsers(remoteUsers => Array.from(client.remoteUsers));
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
    localUid,
    share,
    leave
  };
}