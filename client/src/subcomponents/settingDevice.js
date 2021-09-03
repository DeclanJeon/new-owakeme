import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import { setCameraId, setAudioId } from '../reducer/actions/deviceList';

const useStyle = makeStyles({
    deviceSection: {
        width: '30vw',
        height: '100%'
      },
})

const SettingDevice = () => {
    const classes = useStyle();
    const devices = useSelector(state => state.deviceReducer.deviceList);
    const [audioDevices, setAudioDevices] = useState(devices.filter(device => device.kind == "audioinput"));
    const [videoDevices, setVideoDevices] = useState(devices.filter(device => device.kind == "videoinput"));
    debugger;
    const dispatch = useDispatch();
    
    const selectVideo = useCallback((e) => {
        dispatch(setCameraId(e.target.value))
    }, [])

    const selectAudio = useCallback((e) => {
        dispatch(setAudioId(e.target.value))
    }, [])

    return (
        <>
            <div>
                <FormControl className={classes.deviceSection}>
                    <InputLabel>Video</InputLabel>
                    <Select
                        onChange={selectVideo}
                        value={videoDevices[0].deviceId}
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
                        value={audioDevices[0].deviceId}
                    >
                        {audioDevices.map((obj) => {
                            return <MenuItem value={obj.deviceId} key={obj.deviceId} >{obj.label}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </div>
        </>
    )
}

export default React.memo(SettingDevice)
