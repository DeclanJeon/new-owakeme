import React, { useState, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import StreamPlayer from '../components/streamPlayer';
import NavBar from '../components/navBar';
import AgoraRTC from 'agora-rtc-sdk-ng';
import RTCClient from '../rtc-client';
import { IonIcon } from '@ionic/react'
import { micOutline, micOffOutline, videocamOutline, videocamOffOutline, shareOutline, logOutOutline } from 'ionicons/icons'
import useRouter from '../utils/use-router';
import axios from 'axios';
import { userLogOut } from '../reducer/actions/user';
import "../assets/css/meeting.css";
import "../assets/css/navigator.css";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  view_container: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  }
}));

//const client = AgoraRTC.createClient({ codec: 'h264', mode: 'rtc' });
let shareTrack = undefined;

const Room = () => {
  const classes = useStyles();
  const routerCtx = useRouter();
  const channelName = useSelector(state => state.channelReducer.channelName);
  const { userName, googleLogin } = useSelector(state => state.userReducer);
  const [useMic, setUseMic] = useState(true);
  const [useVideocam, setUseVideocam] = useState(true);
  const dispatch = useDispatch();

  const client = useMemo(() => {
    return AgoraRTC.createClient({ codec: 'h264', mode: 'rtc' });
  }, [])

  const {
    localVideoTrack, localAudioTrack, remoteUsers, share, leave, onUseRtcMic, onUseRtcVideoCam
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
    shareTrack = await share();
  }

  const onLeaveChannel = useCallback(() => {
    leave();
    dispatch(userLogOut());
    const param = {
      channelName: channelName,
      userName: userName
    }
    axios.post('/api/remove/roomUserName', param).then((res) => {
      if(res.data.success === true){
        routerCtx.history.push({ pathname: '/' })
      }
    })
  }, [])

  return (
    <> 
      <div className="container">
        <div className="row">
          <div className="row__nav__container">
            {/*
            <div className="channel_name">
                {channelName}
            </div>
              |
            */}
            <NavBar />

            {/*
            <div className="channel_clipboard">                 
                <IonIcon icon={clipboardOutline} />
            </div>
            */}
          </div>
          <div className="row__view__container">
            <div className="video__container">
              <div className={classes.view_container}>
                <StreamPlayer videoTrack={localVideoTrack} type='local' />
                {remoteUsers.map((user) => (
                    <div key={user.uid}>
                        <StreamPlayer audioTrack={user.audioTrack} videoTrack={user.videoTrack} shareTrack={shareTrack} test={user} type='remote' uid={user.uid} />
                    </div>
                ))}
              </div>
            </div>

            <div className="bottom_container">
              <div className="view_mic">
                {useMic ? <IonIcon icon={micOutline} onClick={onMic} /> : <IonIcon icon={micOffOutline} onClick={onMic} /> }
              </div>
              <div className="view_video">
                {useVideocam ? <IonIcon icon={videocamOutline} onClick={onVideocam} /> : <IonIcon icon={videocamOffOutline} onClick={onVideocam} /> }
              </div>
              <div className="view_share">
                <IonIcon icon={shareOutline} onClick={onShareScreen} />
              </div>
              <div className="view_out">
                <IonIcon icon={logOutOutline} onClick={onLeaveChannel} />
              </div>
            </div>
          </div>
        </div>
      </div>
     </>
  );
}

export default Room;