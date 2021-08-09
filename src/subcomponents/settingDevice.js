import React, { useCallback } from 'react';
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
                    >
                        {devices.map((obj) => {
                            if(obj.kind === 'videoinput'){
                                return <MenuItem value={obj.deviceId} key={obj.deviceId} >{obj.label}</MenuItem>
                            }
                        })}
                    </Select>
                </FormControl>
            </div>
            <div>
                <FormControl className={classes.deviceSection}>
                    <InputLabel>Audio</InputLabel>
                    <Select
                        onChange={selectAudio}
                    >
                        {devices.map((obj) => {
                            if(obj.kind === 'audioinput'){
                                return <MenuItem value={obj.deviceId} key={obj.deviceId} >{obj.label}</MenuItem>
                            }
                        })}
                    </Select>
                </FormControl>
            </div>
        </>
    )
}

export default React.memo(SettingDevice)
