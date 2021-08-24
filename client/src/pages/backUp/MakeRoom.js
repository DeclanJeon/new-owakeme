import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import clsx from 'clsx'
import axios from 'axios'


const useStyles = makeStyles({
    root: {
        minWidth: 275,
        boxShadow: 'none'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    button: {
        background: 'rgb(114,71,197)',
        background: 'linear-gradient(90deg, rgba(114,71,197,1) 0%, rgba(225,92,143,1) 100%)',
        color: '#fff',
        borderRadius: '15px',
        boxShadow: '4px 6px 27px -1px #C6F5FF'
    },
    labelTitle: {
        columnCount: '2'
    },
    formControl: {
        display: 'flex',
        columnCount: '2'
    }
});

export default function RoomMakeCard() {
    const classes = useStyles()

    const [roomNumber, setRoomNumber] = useState('')
    const [roomPassword, setRoomPassword] = useState('')

    const saveClick = () => {
        if (roomPassword == '') {
            alert('Please enter the password')
            return
        }

        const reqData = {
            roomNumber: roomNumber,
            roomPassword: roomPassword,
            makeUserName: '형길'
        }

        axios.post('/api/room/register', reqData)
            .then(res => {
                if (res.data.success) {
                    alert("To room setting is success")
                    setRoomNumber('')
                    setRoomPassword('')
                }
            });
    }

    const changeRoomNumber = (event) => {
        if (isNaN(event.currentTarget.value)) {
            alert('Enter only number')
            return;
        }
        setRoomNumber(event.currentTarget.value);
    };

    const changeRoomPassword = (event) => {
        setRoomPassword(event.currentTarget.value);
    };

    return (
        <Card className={classes.root}>
            <CardContent>
                <div className={classes.labelTitle}>
                    <InputLabel htmlFor="channelName" style={{ color: '#000' }}>Room Number</InputLabel>
                    <InputLabel htmlFor="channelName" style={{ color: '#000', marginLeft: '-5px' }}>Room Password</InputLabel>
                </div>

                <div className={classes.formControl}>
                    <FormControl className={clsx(classes.input, classes.grid)}>

                        <InputLabel htmlFor="channelName" style={{ fontSize: '10px', fontWeight: 'bold' }}>Enter the Room Number</InputLabel>
                        <Input
                            type="text"
                            id="roomNumber"
                            name="roomNumber"
                            value={roomNumber}
                            onChange={changeRoomNumber}
                        />

                        <div style={{ marginTop: '30px', display: 'grid' }}>
                            <Button onClick={saveClick} variant="contained" className={classes.button}>
                                Create a Room
                            </Button>
                        </div>
                    </FormControl>

                    &nbsp;&nbsp;&nbsp;

                    <FormControl className={clsx(classes.input, classes.grid)}>

                        <InputLabel htmlFor="password" style={{ fontSize: '10px', fontWeight: 'bold' }}>Enter the Room Password</InputLabel>
                        <Input
                            type="password"
                            id="password"
                            name="password"
                            value={roomPassword}
                            onChange={changeRoomPassword}
                        />
                    </FormControl>
                </div>
            </CardContent>
        </Card >
    );
}