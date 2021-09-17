import { SET_LOCAL_TRACK, SET_LEAVE_LOCAL_TRACK, SET_ON_LOCAL_SHARE, SET_OFF_LOCAL_SHARE, SET_USE_SHARING, SET_DONT_USE_SHARING } from '../actions/track'

const initState = {
    localVideo: undefined,
    localAudio: undefined,
    localClient: undefined,
    shareClient: undefined,
    shareTrack: undefined,
    sharing: true,
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
        case SET_ON_LOCAL_SHARE:
            return {
                ...state,
                shareClient: action.shareClient,
                shareTrack: action.shareTrack
            }
        case SET_OFF_LOCAL_SHARE:
            return {
                ...state,
                shareClient: undefined,
                shareTrack: undefined
            }
        case SET_USE_SHARING:
            return {
                ...state,
                sharing: true
            }
        case SET_DONT_USE_SHARING:
            return {
                ...state,
                sharing: false
            }
        default:
            return state
    }
}

export default trackReducer;