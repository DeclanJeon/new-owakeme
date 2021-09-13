import { SET_DEVICE_LIST, SET_CAMERA_ID, SET_AUDIO_ID, SET_RESOLUTION } from '../actions/deviceList'

const initState = {
    deviceList: [],
    cameraId: '',
    audioId: '',
    resolution: ''
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
        case SET_RESOLUTION:
            return {
                ...state,
                resolution: action.resolution
            }
        default:
            return state;
    }
}

export default deviceReducer;