import { SET_LOCAL_TRACK, SET_LEAVE_LOCAL_TRACK } from '../actions/track'

const initState = {
    localVideo: undefined,
    localAudio: undefined,
    localClient: undefined,
    isLocal: false,
}

const trackReducer = (state = initState, action) => {
    switch(action.type) {
        case SET_LOCAL_TRACK:
            return {
                ...state,
                localAudio: action.localAudio,
                localVideo: action.localVideo,
                localClient: action.localClient,
                isLocal: true
            };
        case SET_LEAVE_LOCAL_TRACK:
            return {
                ...state,
                localAudio: undefined,
                localVideo: undefined,
                localClient: undefined,
                isLocal: false
            }
        default:
            return state;
    }
}

export default trackReducer;