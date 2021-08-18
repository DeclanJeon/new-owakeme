import { SET_DEVICE_LIST, SET_CAMERA_ID, SET_AUDIO_ID } from '../actions/deviceList'

const initState = {
    deviceList: [],
    cameraId: '',
    audioId: ''
}

const deviceReducer = (state = initState, action) => {
    switch(action.type) {
        case SET_DEVICE_LIST:
            return {
                ...state,
                deviceList: action.deviceList
            };
        case SET_CAMERA_ID:
            return {
                ...state,
                cameraId: action.cameraId
            }
        case SET_AUDIO_ID:
            return {
                ...state,
                audioId: action.audioId
            }
        default:
            return state;
    }
}

export default deviceReducer;