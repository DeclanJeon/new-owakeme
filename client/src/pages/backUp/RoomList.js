import React, { useEffect, useState, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { blue } from '@material-ui/core/colors';
import axios from 'axios'
import { Button, GridList, Input, InputLabel, Box } from '@material-ui/core';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  roomNumberTitle: {
    background: 'rgb(114,71,197)',
    background: 'linear-gradient(90deg, rgba(114,71,197,1) 0%, rgba(225,92,143,1) 100%)',
    height: '32px',
    width: '160px',
    margin: '20px auto',
    display: 'flex',
    fontSize: '15px',
    fontWeight: '100',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: '13px',
    color: '#fff',
    boxShadow: '4px 6px 27px -1px #C6F5FF'
  },
  menuTitle: {
    color: '#333333',
    textAlign: 'center',
    fontSize: 'h6.fontSize',
    position: 'relative',
    top: '7px'
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    textAlign: 'center'
  },
  gridList: {
    width: '500px',
    height: '450px',
    transform: 'translateZ(0)',
    justifyContent: 'center'
  },
  avatar: {
    width: '20px',
    height: '20px',
    backgroundColor: blue[300],
  },
  enterBtn: {
    backgroundColor: '#fff',
    width: '160px',
    height: '32px',
    color: '#000',
    boxShadow: '4px 6px 27px -1px #D5D3D7',
    borderRadius: '12px',
    marginTop: '10px',
  },
  passwordInput: {
    width: '160px',
    height: '32px',
    marginBottom: '10px',
    fontSize: '9px',
  }

}));

export default function CardPage() {
  const classes = useStyles();
  const [roomList, setRoomList] = useState([]);
  const [enterPassword, setEnterPassword] = useState('');
  const [roomName, setRoomName] = useState('');

  useEffect(() => {
    axios.get('/api/room/roomList').then(res => {
      setRoomList(res.data.roomList);
    })
  }, [])

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
  }, [roomName, enterPassword])

  const onChangeEnterPassword = useCallback((e) => {
    setEnterPassword(e.target.value);
  }, [])

  return (
    <Box flex="1" display="flex" flexDirection="column">
      <Link to="/" className='back-btn' />
      <div className={classes.root}>

        <GridList cellHeight={200} spacing={1} className={classes.gridList} cols={2} >
          {
            roomList.map((obj, index) => {
              return (
                <Card key={index} style={{ margin: '15px', width: '190px', borderRadius: '20px' }} variant="outlined">
                  <CardContent>
                    <div className={classes.roomNumberTitle}>
                      <p><span style={{ fontWeight: 'bold' }}>Room Number {obj.roomNumber}</span></p>
                    </div>

                    <Input className={clsx(classes.grid, classes.passwordInput)}
                      onChange={onChangeEnterPassword}
                      placeholder="Enter a Password"
                    />
                    <span>{obj.makeUserName}</span>
                    <Button className={classes.enterBtn} variant="contained" onClick={() => onEnterRoom(obj)}>
                      Enter
                    </Button>
                  </CardContent>
                </Card>
              )
            })
          }
        </GridList>
      </div>
    </Box>
  );
}
