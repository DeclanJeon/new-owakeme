import React, { useState, useCallback } from "react";
import "../css/ChannelCreate.css";
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "50ch",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function ChannelCreate({ onClose }) {
  const classes = useStyles();
  //const handleChange = (event) => {};

  const [roomNumber, setRoomNumber] = useState('');
  const [roomPassword, setRoomPassword] = useState('');
  const [useName, setUserName] = useState('');

  const saveClick = useCallback(() => {
      if (roomPassword == '') {
          alert('Please enter the password')
          return
      }

      const reqData = {
          roomNumber: roomNumber,
          roomPassword: roomPassword,
          makeUserName: useName
      }

      axios.post('/api/room/register', reqData)
          .then(res => {
              if (res.data.success) {
                  alert("To room setting is success")
                  setRoomNumber('');
                  setRoomPassword('');
                  setUserName('');
                  onClose();
                  window.location.reload();
              }
          });
  }, [roomNumber, roomPassword, useName])

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

  const changeUserName = (event) => {
    setUserName(event.target.value);
  }

  return (
    <div className="channel__container">
      <div className="channel__inner__container">
        {/* 
          작성자 : 전형동
          수정 날짜 : 21-08-21
          구현 대기 중
         */}
        <div className="thumbnail__container">
          <div className="thumbnail__image"></div>
        </div>

        <div className="channel__introduction__container">
          <div className="channel__description">
            {/* 
              작성자 : 전형동
              수정 날짜 : 21-08-21
              구현 대기 중
             */}

            {/* 
              <div className="thumbnail__upload__btn">
              <Button variant="contained" color="primary">
                Profile Upload
              </Button>
            </div> 
            */}

            <FormControl className={classes.formControl}>
              {/*
              <Select native onChange={handleChange}>
                <option>Public</option>
                <option>Primary</option>
              </Select>
              */}
              <div className="channel__title">
                <Input type="string" placeholder="Channel Number" onChange={changeRoomNumber} />
              </div>
              <div className="channel__userName">
                <Input type="string" placeholder="User Name" onChange={changeUserName} />
              </div>
              <Input type="password" placeholder="Please enter your password" onChange={changeRoomPassword} />
            </FormControl>
          </div>

          <div className="channel__create__btn">
            <Button variant="contained" color="primary" onClick={saveClick}>
              Create
            </Button>
            <Button variant="outlined" onClick={onClose}>
              X
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChannelCreate;
