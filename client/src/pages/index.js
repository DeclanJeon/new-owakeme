import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import useRouter from "../utils/use-router";
import { Button } from "@material-ui/core";
import GoogleLoginForm from "../components/googleLoginForm";
import { channelEnter } from "../reducer/actions/channel";
import { setDeviceList } from "../reducer/actions/deviceList";
import AgoraRTC from "agora-rtc-sdk-ng";
import axios from "axios";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import { IconButton } from '@material-ui/core';
import "../assets/css/mainpage.css";

export default function SignIn() {
  const routerCtx = useRouter();
  const isLogin = useSelector(state => state.userReducer.isLogin);
  const dispatch = useDispatch();

  useEffect(() => {
    AgoraRTC.getDevices().then((devices) => {
      dispatch(setDeviceList(devices));
    });
  }, []);

  const [channelName, setChannelName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const videoPreview = document.getElementById("videoPreview");
    async function getMedia() {
      try{
          videoPreview.srcObject = await navigator.mediaDevices.getUserMedia({
              audio: true,
              video: true
          });
      }catch(e){
          console.log(e);
      }
    };
    getMedia();
  }, []);

  const onChanelName = useCallback((e) => {
      setChannelName(e.currentTarget.value);
    }, [channelName]);

  const onPassword = useCallback((e) => {
      setPassword(e.currentTarget.value);
    }, [password]);

  const onUserName = useCallback((e) => {
      setUserName(e.currentTarget.value);
    }, [userName]);

  // 일반 로그인
  const onEnterChanel = useCallback((e) => {
      if (channelName === "") {
        return alert("Please enter the channelName");
      }
      if (userName === "") {
        return alert("Please enter the userName");
      }

      dispatch(channelEnter(channelName));

      const param = {
        channelName: channelName,
        roomPassword: password,
        userName: userName
      };
      
      axios.post('/api/room/getRoomInfo', param).then(res => {
        if (res.data.passwordCheckResult) {
          
          axios.post("/api/save/roomUserName", param).then((res) => {
            if (res.data.success === true) {
              routerCtx.history.push({ pathname: `/meeting` });
            }
          });

        }else{
          alert(res.data.error);
          setPassword('');
        }
      });
    }, [userName, password, channelName]);

  const onRoomList = useCallback(() => {
    routerCtx.history.push({ pathname: `/channelList` });
  }, [])

  return (
    <div className="container">
      <div className="row_container">
        <div className="inline_container">
          <div className="logo"></div>

          <div id="title_copyright">
            <p>
              Hyper Augmented Omni <br />
              Communication Chnnel_OWAKE
            </p>
          </div>

          <div className="btn_container">
            <div className="left_image_container">
              <video id="videoPreview" autoPlay width="400px" />
            </div>
            <div className="right_btn_container">
              {isLogin &&
                <> 
                  <div id="Name_Your_Channel">
                    <input
                      id="Name_Your_Channel_input"
                      placeholder="Name Your Channel"
                      onChange={onChanelName}
                    />
                  </div>
                  <div id="Name_Password">
                    <input
                      id="Name_Password_input"
                      placeholder="Password"
                      type="password"
                      onChange={onPassword}
                    />
                  </div>
                  <div>
                    <input
                      id="Name_Your_Channel_input"
                      placeholder="User Name"
                      onChange={onUserName}
                      value={userName}
                      disabled="true"
                    />
                  </div>
                  <div id="Create_Channel">
                    <Button onClick={onEnterChanel} style={{ width: '200px', height: '35px', borderRadius: '20px' }} >Join Channel</Button>
                  </div>
                </>
              }
              <div>
                <GoogleLoginForm setUserName={setUserName} />
              </div>
            </div>
          </div>

          <div className="icon__btn__container">
            <IconButton color="primary" disabled={!isLogin&&true} onClick={onRoomList}>
              <LibraryBooksIcon />
            </IconButton>
          </div>

          <div id="footer">
            <footer>
              <span id="left">@Copyright 2021 built by Owakeme.com</span>
                <br />
              <span id="right">Sponsored by Kronosa.org</span>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
