import React, { useState, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import StreamPlayer from '../components/streamPlayer';
import NavBar from '../components/navBar';
import AgoraRTC from 'agora-rtc-sdk-ng';
import RTCClient from '../rtc-client';
import { IonIcon } from '@ionic/react'
import { clipboardOutline, micOutline, micOffOutline, videocamOutline, videocamOffOutline, shareOutline, logOutOutline } from 'ionicons/icons'
import '../assets/css/channel.css';
import useRouter from '../utils/use-router';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
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
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const client = AgoraRTC.createClient({ codec: 'h264', mode: 'rtc' });

const Room = () => {
  const classes = useStyles();
  const routerCtx = useRouter();
  const channelName = useSelector(state => state.channelReducer.channelName)
  const [useMic, setUseMic] = useState(true)
  const [useVideocam, setUseVideocam] = useState(true)
  
  const {
    localAudioTrack, localVideoTrack, leave, join, remoteUsers
  } = RTCClient(client);

  const onMic = useCallback((localAudioTrack) => {
    setUseMic(!useMic)
    debugger;
    localAudioTrack.setMuted(useMic)
  }, [useMic])

  const onVideocam = useCallback(() => {
    setUseVideocam(!useVideocam)
    localVideoTrack.setMuted(useVideocam)
  }, [useVideocam])

  const onLeaveChannel = useCallback(() => {
    leave();
    routerCtx.history.push({ pathname: '/' })
  }, [])

  return (
    <>
        <div className="container">
            <div className="nav_container">
                <div className="top_navbar">
                    <div className="channel_name">
                        {channelName}
                    </div>
                    |
                    <NavBar />

                    <div className="channel_clipboard">                 
                        <IonIcon icon={clipboardOutline} />
                    </div>
                    
                </div>
            </div>
            <div className="view_container">
              <Container className={classes.cardGrid} maxWidth="md">
                {/* End hero unit */}
                    <div>
                      <StreamPlayer audioTrack={localAudioTrack} videoTrack={localVideoTrack} style={{ flex: 1 }} />
                    </div>
                    {remoteUsers.map((user) => (
                        <div key={user.uid}>
                            <StreamPlayer audioTrack={user.audioTrack} videoTrack={user.videoTrack} />
                        </div>
                    ))}
              </Container>
            </div>
            <div className="bottom_container">
                <div className="view_mic">
                  {useMic ? <IonIcon icon={micOutline} onClick={onMic} /> : <IonIcon icon={micOffOutline} onClick={onMic} /> }
                </div>
                <div className="view_video">
                  {useVideocam ? <IonIcon icon={videocamOutline} onClick={onVideocam} /> : <IonIcon icon={videocamOffOutline} onClick={onVideocam} /> }
                </div>
                <div className="view_share">
                    <IonIcon icon={shareOutline} />
                </div>
                <div className="view_out">
                    <IonIcon icon={logOutOutline} onClick={onLeaveChannel} />
                </div>
            </div>
        </div>
     </>
  );
}

export default Room;