import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import useRouter from "../utils/use-router";
import GoogleLoginForm from "../components/googleLoginForm";
import { channelEnter } from "../reducer/actions/channel";
import { setDeviceList } from "../reducer/actions/deviceList";
import AgoraRTC from "agora-rtc-sdk-ng";
import axios from "axios";
import "../assets/css/mainpage.css";
import new_owake_logo_black from "../assets/img/new_owake_logo_black.svg";
import main_join from "../assets/img/main_join.png";
import main_list from "../assets/img/main_list.png";
import demo from "../assets/img/demo.png";
import CreateRoom from '../components/createRoom';

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
              audio: false,
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

  // 일반 로그인
  const onEnterChanel = useCallback((e) => {
      if (channelName === "") {
        return alert("Please enter the channelName");
      }
      if (password === "") {
        return alert("Please enter the Password");
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
    routerCtx.history.push({ pathname: `/roomList` });
  }, [])

  return (
    <div>
      <div className="index_header">
        <div className="logo">
          <img src={new_owake_logo_black} />
        </div>
        <div className="demo">
          <a href="https://url.kr/e1qs6g"><img src={demo} /></a>
        </div>
      </div>
      <div className="index_section">
        <div className="total_container">

          <div className="left_container">
            <div className="left_header"></div>
            <div className="left_section">
              <span>Check the Video, Audio</span>
              <video id="videoPreview" autoPlay width="400px" />
            </div>
            <div className="left_footer">
                <span>{isLogin ? "You have logged in" : "Sign in"}</span>
                <div className="googleLogin">
                  <GoogleLoginForm setUserName={setUserName} />
                </div>
            </div>
          </div>

          <div className="right_container">
            <div className="right_header">
              Hyper Augmented Omni Communication Chnnel, <strong>OWAKE</strong>
            </div>
            <div className="right_section">
              <div className="join_room">
                <span>Join The Room</span>
                <div className="img"><img src={main_join} /></div>
                <div className="input_join">
                  <div className="input_join_list">
                    <div className="join_room_number"><input className="input_room_number" type="text" placeholder="Room Number" disabled={!isLogin&&true} onChange={onChanelName} /></div>
                    <div className="join_room_password"><input className="input_room_password" type="password" placeholder="Room Password" disabled={!isLogin&&true} onChange={onPassword} /></div>
                  </div>
                </div>
                <div className="join_button">
                  <button onClick={onEnterChanel} disabled={!isLogin&&true}>Join</button>
                </div>
              </div>

              <div className="room_list">
                <span>Check the Room list</span>
                <div className="img"><img src={main_list} /></div>
                <div className="input_list">
                  
                </div>
                <div className="list_button">
                  <button onClick={onRoomList} disabled={!isLogin&&true}>Room list</button>
                </div>
              </div>

              <div className="create_room">
                <CreateRoom />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="index_footer">
        <span className="sentence">
          @Copyright 2021 built by Owakeme.com @ Sponsored by Kronosa.org
        </span>
      </div>
    </div>
  );
}
