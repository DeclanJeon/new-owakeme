import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import StreamPlayer from '../components/streamPlayer';
import AgoraRTC from 'agora-rtc-sdk-ng';
import RTCClient from '../rtc-client';
import { IonIcon } from '@ionic/react'
import { clipboardOutline, peopleOutline, chatboxEllipsesOutline, gridOutline, settingsOutline, micOutline, micOffOutline, videocamOutline, videocamOffOutline, shareOutline, logOutOutline } from 'ionicons/icons'
import '../assets/css/channel.css';
import Chatting from '../components/chatting';
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
  const [useMic, setUseMic] = useState(false)
  const [useVideocam, setUseVideocam] = useState(false)

  const {
    localAudioTrack, localVideoTrack, leave, join, joinState, remoteUsers, channelName, userName
  } = RTCClient(client);

  const onMic = () => {
    setUseMic(!useMic)
    localAudioTrack.setEnabled(useMic)
  }

  const onVideocam = () => {
    setUseVideocam(!useVideocam)
    localVideoTrack.setEnabled(useVideocam)
  }

  const onLeaveChannel = () => {
    leave();
    routerCtx.history.push({ pathname: '/' })
  }

  return (
    <>
        <div class="container">
            <div class="nav_container">
                <div class="top_navbar">
                    <div class="channel_name">
                        {channelName}
                    </div>
                    |
                    <div class="channel_clipboard">                 
                        <IonIcon icon={clipboardOutline} />
                    </div>
                    <div class="row_nav_container">
                        <div class="navigaitner">
                            <div id="connect_user_list">
                                <IonIcon icon={peopleOutline} />
                            </div>
                            <div id="chat">
                                <IonIcon icon={chatboxEllipsesOutline} />
                            </div>
                            <div id="view_grid">
                                <IonIcon icon={gridOutline} />
                            </div>
                            <div id="setting">
                                <IonIcon icon={settingsOutline} />
                            </div>
                        </div>

                        <Chatting userName={userName} channelName={channelName} />
                    </div>
                </div>
            </div>
            <div class="view_container">
              <Container className={classes.cardGrid} maxWidth="md">
                {/* End hero unit */}
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={6} md={4}>
                    <div>
                      <StreamPlayer audioTrack={localAudioTrack} videoTrack={localVideoTrack} style={{ flex: 1 }} />
                    </div>
                    {remoteUsers.map((user) => (
                        <div key={user.uid}>
                            <StreamPlayer audioTrack={user.audioTrack} videoTrack={user.videoTrack} />
                        </div>
                    ))}
                  </Grid>
                </Grid>
              </Container>
            </div>
            <div class="bottom_container">
                <div class="view_mic">
                  {!useMic ? <IonIcon icon={micOutline} onClick={onMic} /> : <IonIcon icon={micOffOutline} onClick={onMic} /> }
                </div>
                <div class="view_video">
                  {!useVideocam ? <IonIcon icon={videocamOutline} onClick={onVideocam} /> : <IonIcon icon={videocamOffOutline} onClick={onVideocam} /> }
                </div>
                <div class="view_share">
                    <IonIcon icon={shareOutline} />
                </div>
                <div class="view_out">
                    <IonIcon icon={logOutOutline} onClick={onLeaveChannel} />
                </div>
            </div>
        </div>
     </>
  );
}

export default Room;