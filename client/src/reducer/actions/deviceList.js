export const SET_DEVICE_LIST = 'SET_DEVICE_LIST';
export const SET_CAMERA_ID = 'SET_CAMERA_ID';
export const SET_AUDIO_ID = 'SET_AUDIO_ID';

export const setDeviceList = (devices) => {
    return {
        type: SET_DEVICE_LIST,
        deviceList: devices
    }
}

export const setCameraId = (cameraId) => {
    return {
        type: SET_CAMERA_ID,
        cameraId: cameraId
    }
}

export const setAudioId = (audioId) => {
    return {
        type: SET_AUDIO_ID,
        audioId: audioId
    }
}