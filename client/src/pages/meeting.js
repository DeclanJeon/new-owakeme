import React, { useState, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import StreamPlayer from '../components/streamPlayer';
import NavBar from '../components/navBar';
import AgoraRTC from 'agora-rtc-sdk-ng';
import RTCClient from '../rtc-client';
import { IonIcon } from '@ionic/react'
import { micOutline, micOffOutline, videocamOutline, videocamOffOutline, shareOutline, logOutOutline } from 'ionicons/icons'
import useRouter from '../utils/use-router';
import axios from 'axios';
import { userLogOut } from '../reducer/actions/user';
import { dontUseSharing } from '../reducer/actions/track';
import "../assets/css/meeting.css";
import "../assets/css/navigator.css";
import new_owake_logo_white from "../assets/img/new_owake_logo_white.svg";
import setting from '../assets/img/settings.svg';
import owake_icon_mic from '../assets/img/owake_icon_mic.png';
import owake_icon_cam from '../assets/img/owake_icon_cam.png';
import owake_icon_close from '../assets/img/owake_icon_close.png';
import owake_icon_share from '../assets/img/owake_icon_share.png';
import disable_mic from '../assets/img/disable_mic.png';
import disable_cam from '../assets/img/disable_cam.png';
import disable_share from '../assets/img/disable_share.png';
import Chatting from '../subcomponents/chatting';

const Room = () => {
  const routerCtx = useRouter();
  const { sharing } = useSelector(state => state.trackReducer);
  const [useMic, setUseMic] = useState(true);
  const [useVideocam, setUseVideocam] = useState(true);
  const [useSetting, setUseSetting] = useState(false);
  const dispatch = useDispatch();

  const client = useMemo(() => {
    return AgoraRTC.createClient({ codec: 'h264', mode: 'rtc' });
  }, [])

  const {
    localVideoTrack, localAudioTrack, remoteUsers, localUid, share, leave
  } = RTCClient(client);
  
  const onMic = () => {
    setUseMic(!useMic)
    localAudioTrack.setMuted(useMic)
  }

  const onVideocam = () => {
    setUseVideocam(!useVideocam)
    localVideoTrack.setMuted(useVideocam)
  }

  const onShareScreen = async function() {
    dispatch(dontUseSharing());
    await share();
  }

  const onLeaveChannel = () => {
    leave(localVideoTrack, localAudioTrack, client);
    dispatch(userLogOut());
    routerCtx.history.push({ pathname: '/' });
  }

  const onUseSetting = useCallback(() => {
    setUseSetting(!useSetting);
  }, [useSetting]);

  window.onunload = function() {
    onLeaveChannel();

    return "";
  };	    	

  return (
    <> 
      <div className="video_container">

        <div className="header__container">
            <div className="logo">
                <img src={new_owake_logo_white} alt="" />
            </div>
            <div className="navbar">
                <div className="setting__icon">
                    <img src={setting} alt="" onClick={onUseSetting} />
                </div>
            </div>
        </div>

          <div className="body__container">
              <div className="body__video__box">
                  <div className="left__box">
                      <div className="display__box">
                      <StreamPlayer videoTrack={localVideoTrack} type='local' uid={localUid} showUid={true} />
                      {remoteUsers.map((user) => (
                          <div key={user.uid}>
                              <StreamPlayer audioTrack={user.audioTrack} videoTrack={user.videoTrack} type='remote' uid={user.uid} showUid={true} />
                          </div>
                      ))}
                      </div>
                  </div>
                  <div className="right__box">

                    <Chatting useSetting={useSetting} onUseSetting={onUseSetting} />

                  </div>
                </div>
            </div>
        </div>

        

        <div className="footer__container">
          <div className="footer__navigator">
              <div className="empty__footer"></div>

              <div className="navigator__icons">
                  <div className="icons icon__mic">
                      <img src={useMic ? owake_icon_mic : disable_mic} alt="" onClick={onMic} />
                      <p>MIC</p>
                  </div>
                  <div className="icons icon__cam">
                      <img src={useVideocam ? owake_icon_cam : disable_cam} alt="" onClick={onVideocam} />
                      <p>CAM</p>
                  </div>
                  <div className="icons icon__share">
                      <img src={sharing ? owake_icon_share : disable_share} alt="" onClick={onShareScreen} />
                      <p>SHARE SCREEN</p>
                  </div>
                  <div className="icons icon__close">
                      <img src={owake_icon_close} alt="" onClick={onLeaveChannel} />
                      <p>LEAVE</p>
                  </div>
              </div>

              <div className="empty__footer"></div>
          </div>
        </div>
     </>
  );
}

export default Room;