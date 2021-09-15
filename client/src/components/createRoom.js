import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import main_create from "../assets/img/main_create.png";
import axios from 'axios';

function CreateRoom() {
  const isLogin = useSelector(state => state.userReducer.isLogin);

  const [roomName, setRoomName] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [roomPassword, setRoomPassword] = useState('');
  
  const { userName, photoURL } = useSelector(state => state.userReducer);

  const saveClick = useCallback(() => {
    if (roomPassword == '') {
      alert('Please enter the password')
      return
    }

    const reqData = {
      roomName: roomName,
      roomNumber: roomNumber,
      roomPassword: roomPassword,
      makeUserName: userName,
      photoURL: photoURL
    }
    
    axios.post('/api/room/register', reqData)
      .then(res => {
          if (res.data.success) {
            alert("To room setting is success")
          }else{
            alert(`RoomNumber ${roomNumber} is already existed. please choice another number`)
          }

          setRoomName('');
          setRoomNumber('');
          setRoomPassword('');
      });
  }, [roomName, roomNumber, roomPassword]);

  const changeRoomName = (event) => {
    setRoomName(event.target.value);
  };

  const changeRoomNumber = (event) => {
    if (isNaN(event.target.value)) {
        alert('Enter only number')
        return;
    }
    setRoomNumber(event.target.value);
  };

  const changeRoomPassword = (event) => {
    setRoomPassword(event.target.value);
  };

  return (
    <>
      <span>Create a Room</span>
        <div className="img"><img src={main_create} /></div>
        <div className="input_create">
          <div className="input_create_list">
            <div className="create_room_name">
              <input className="input_room_name" type="text" placeholder="Room Name" disabled={!isLogin&&true} onChange={changeRoomName} value={roomName} />
            </div>
            <div className="create_room_number">
              <input className="input_room_number" type="text" placeholder="Room Number" disabled={!isLogin&&true} onChange={changeRoomNumber} value={roomNumber} />
            </div>
            <div className="create_room_password">
              <input className="input_room_password" type="password" placeholder="Room Password" disabled={!isLogin&&true} onChange={changeRoomPassword} value={roomPassword} />
            </div>
          </div>
        </div>
        <div className="create_button">
          <button disabled={!isLogin&&true} onClick={saveClick}>Create</button>
        </div>
    </>
  )
}

export default CreateRoom
