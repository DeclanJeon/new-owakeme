import { SET_LOCAL_AUDIO_TRACK, SET_LOCAL_VIDEO_TRACK, SET_REMOTE_USERS } from '../actions/track'

const initState = {
    localVideoTrack: undefined,
    localAudioTrack: undefined,
    remoteUsers: [],
    isLocal: false,
    isRemote: false
}

const trackReducer = (state = initState, action) => {
    switch(action.type) {
        case SET_LOCAL_AUDIO_TRACK:
            return {
                ...state,
                localAudioTrack: action.localAudioTrack,
                isLocal: true
            };
        case SET_LOCAL_VIDEO_TRACK:
            return {
                ...state,
                localVideoTrack: action.localVideoTrack,
                isLocal: true
            }
        case SET_REMOTE_USERS:
            return {
                ...state,
                remoteUsers: action.remoteUsers,
                isLocal: false,
                isRemote: true
            }
        default:
            return state;
    }
}

export default trackReducer;