import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import useRouter from '../utils/use-router';
import '../assets/css/style.css';
import { Button } from '@material-ui/core';
import GoogleLoginForm from '../components/googleLoginForm';
import { userLogIn } from '../reducer/actions/user';
import { channelEnter } from '../reducer/actions/channel';
import { setDeviceList } from '../reducer/actions/deviceList';
import AgoraRTC from 'agora-rtc-sdk-ng';
import axios from 'axios';
import { googleLogIn } from '../reducer/actions/user';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const routerCtx = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    AgoraRTC.getDevices().then(devices => {
      dispatch(setDeviceList(devices));
    })
  }, [])
  
  const [channelName, setChannelName] = useState('')
  const [userName, setUserName] = useState('')

  const onChanelName = useCallback((e) => {
    setChannelName(e.currentTarget.value)
  },[channelName])

  const onUserName = useCallback((e) => {
    setUserName(e.currentTarget.value)
  },[userName])

  // 구글 로그인
  const onGoogleLoginSuccess = useCallback((e) => {
    if(channelName === ''){
      return alert("Please enter the channelName");
    }

    dispatch(channelEnter(channelName))
    dispatch(googleLogIn(e.profileObj.name))

    const param = {
      channelName: channelName,
      userName: e.profileObj.name
    };

    axios.post('/api/save/roomUserName', param)
      .then((res) => {
        if(res.data.success === true){
          routerCtx.history.push({ pathname: `/meeting` });
        }
      })
  }, [userName, channelName])

  // 일반 로그인
  const onEnterChanel = useCallback((e) => {
    if(channelName === ''){
      return alert("Please enter the channelName");
    }
    if(userName === ''){
      return alert("Please enter the userName");
    }

    dispatch(userLogIn(userName))
    dispatch(channelEnter(channelName))

    const param = {
      channelName: channelName,
      userName: userName
    };

    axios.post('/api/save/roomUserName', param)
      .then((res) => {
        if(res.data.success === true){
          routerCtx.history.push({ pathname: `/meeting` });
        }
      })
  }, [userName, channelName])

  return (
    <div className="container">
        <div className="row_container">
            <div id="logo">
                <h1 className="title">OWAKE</h1>
            </div>

            <div id="title_copyright">
                <span>Hyper Augmented Omni <br />Communication Chnnel_OWAKE</span>
            </div>

            <div className="btn_container">
                <div className="row">
                    <div id="Name_Your_Channel">
                        <input id="Name_Your_Channel_input" placeholder="Name Your Channel" onChange={onChanelName} value={channelName} />
                    </div>
                    <div>
                        <input id="Name_Your_Channel_input" placeholder="User Name" onChange={onUserName} value={userName} />
                    </div>
                    <div id="Create_Channel">
                        <Button style={{ width: '35vw', height: '5vh' }} onClick={onEnterChanel}>Join Channel</Button>
                    </div>
                </div>

                <GoogleLoginForm onGoogleLoginSuccess={onGoogleLoginSuccess} />
            </div>

            <footer id="footer">
                <span id="left">@Copyright 2021 build by Owakeme.com
                </span>
                <span id="right">Sponsored by Kronosa.org</span>
            </footer>
        </div>
    </div>
  );
}