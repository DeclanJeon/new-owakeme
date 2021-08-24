import React, { useCallback, useState } from "react";
import "../css/VideoCard.css";
import { Button, Input, Avatar } from '@material-ui/core';
import axios from 'axios';

function VideoCard({ channel, channelImage, roomNumber, makeUserName }) {
  const [enterPassword, setEnterPassword] = useState('');
  const [roomName, setRoomName] = useState('');

  const onEnterRoom = useCallback((roomName) => {
    //비밀번호 확인
    const body = {
      channelName: roomName,
      roomPassword: enterPassword
    }
    axios.post('/api/room/getRoomInfo', body).then(res => {
      if (!res.data.passwordCheckResult) {
        return
      }
    })
  }, [roomName, enterPassword]);

  const onChangeEnterPassword = useCallback((e) => {
    setEnterPassword(e.target.value);
  }, []);

  return (
    <div className="videoCard">
      {/* 
        작성자 : 전형동
        작성일 : 210823
        내용 : 이미지 추가할 때까지 대기
      */}
      {/* <img className="videoCard__thumbnail" src={image} alt="" /> */}
      <div className="videoCard__info">
        <Avatar
          className="videoCard__avatar"
          alt={channel}
          src={channelImage}
        />
        <div className="videoCard__text">
          <h3>Room Number: {roomNumber}</h3>
          <Input
              onChange={onChangeEnterPassword}
              placeholder="Enter a Password"
            />
          <b>Made by : {makeUserName}</b>
          <div>
            <Button variant="contained" onClick={() => onEnterRoom()}>
              Enter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(VideoCard);