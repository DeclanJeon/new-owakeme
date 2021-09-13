import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Select, MenuItem, InputLabel, FormControl, Button } from '@material-ui/core';
import { setCameraId, setAudioId, setResolutionId } from '../reducer/actions/deviceList';

const useStyle = makeStyles({
    deviceSection: {
        width: '30vw',
        height: '100%',
        padding: '10px'
      },
    menuTitle: {
        color: '#333333',
        textAlign: 'center',
        fontSize: 'h6.fontSize',
        position: 'relative',
        top: '5px'
      },
    menu: {
        margin: '0.4rem 0',
        marginBottom: '50px',
        position: 'relative',
        height: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }
})

const SettingDevice = ({ onUseSetting }) => {
    const classes = useStyle();
    const devices = useSelector(state => state.deviceReducer.deviceList);

    const audioDevices = devices.filter(device => device.kind == "audioinput");
    const videoDevices = devices.filter(device => device.kind == "videoinput");

    const [resolution, setResolution] = useState("480p");
    const [audioDevice, setAudioDevice] = useState(audioDevices[0].deviceId);
    const [videoDevice, setVideoDevice] = useState(videoDevices[0].deviceId);
    
    const dispatch = useDispatch();
    
    const selectResolution = useCallback((e) => {
        setResolution(e.target.value);
        dispatch(setResolutionId(e.target.value));
    }, []);

    const selectVideo = useCallback((e) => {
        setVideoDevice(e.target.value);
        dispatch(setCameraId(e.target.value));
    }, [])

    const selectAudio = useCallback((e) => {
        setAudioDevice(e.target.value);
        dispatch(setAudioId(e.target.value))
    }, [])

    const onApply = useCallback(() => {
        onUseSetting();
    }, [])

    return (
        <>
            <div>
                <FormControl className={classes.menu}>
                    <span className={classes.menuTitle}>Setting</span>
                </FormControl>

                <FormControl className={classes.deviceSection}>
                    <InputLabel>Resolution</InputLabel>
                    <Select
                        onChange={selectResolution}
                        value={resolution}
                    >
                        <MenuItem value="480p">480p</MenuItem>
                        <MenuItem value="720p">720p</MenuItem>
                        <MenuItem value="1080p">1080p</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div>
                <FormControl className={classes.deviceSection}>
                    <InputLabel>Video</InputLabel>
                    <Select
                        onChange={selectVideo}
                        value={videoDevice}
                    >
                        {videoDevices.map((obj) => {
                            return <MenuItem value={obj.deviceId} key={obj.deviceId} >{obj.label}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </div>
            <div>
                <FormControl className={classes.deviceSection}>
                    <InputLabel>Audio</InputLabel>
                    <Select
                        onChange={selectAudio}
                        value={audioDevice}
                    >
                        {audioDevices.map((obj) => {
                            return <MenuItem value={obj.deviceId} key={obj.deviceId} >{obj.label}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </div>
            <Button variant="contained" color="primary" onClick={onApply}>
                Apply
            </Button>
        </>
    )
}

export default React.memo(SettingDevice)
