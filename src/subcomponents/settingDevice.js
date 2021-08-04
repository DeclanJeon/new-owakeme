import React from 'react';
import { useSelector } from 'react-redux';
import { Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';

const SettingDevice = () => {
    const devices = useSelector(state => state.deviceReducer.deviceList)
    
    return (
        <div>
            <FormControl>
                <InputLabel>Video</InputLabel>
                <Select>
                    {devices.map((obj, index) => {
                        return <MenuItem value={index}>{obj.label}</MenuItem>
                    })}
                </Select>
            </FormControl>
        </div>
    )
}

export default React.memo(SettingDevice)
