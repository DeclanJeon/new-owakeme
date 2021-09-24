import React, { useCallback, useState } from "react";
import axios from 'axios';
import useRouter from '../utils/use-router';
import userIcon from '../assets/img/user-icon.png';


function RoomCard({ roomName, roomNumber, makeUserName, photoURL }) {
  const routerCtx = useRouter();
  const [enterPassword, setEnterPassword] = useState('');
  
  const onEnterRoom = useCallback((roomName) => {
    //비밀번호 확인
    const body = {
      channelName: roomNumber,
      roomPassword: enterPassword
    }
    axios.post('/api/room/getRoomInfo', body).then(res => {
      if (res.data.passwordCheckResult) {
        routerCtx.history.push({ pathname: `/meeting` });
      }else{
        alert(res.data.error);
        setEnterPassword('');
      }
    })
  }, [enterPassword]);

  const onChangeEnterPassword = useCallback((e) => {
    setEnterPassword(e.target.value);
  }, []);

  return (
    <>
      <div className="channel__box">
        <div className="channel__inner__box">
          <div className="profile"><img src={userIcon} /></div>
          <div className="makeUserName">{makeUserName}</div>
          <div className="room__number"><input type="text" value={roomName} disabled="true" /></div>
          <div className="room__name"><input type="text" placeholder="Room Name" value={roomNumber} disabled="true" /></div>
          <div className="room__password"><input type="password" placeholder="Password" value={enterPassword} onChange={onChangeEnterPassword} /></div>
          <div className="room_button"><button onClick={onEnterRoom}>Enter</button></div>
        </div>
      </div>
    </>
  )
}

export default RoomCard
