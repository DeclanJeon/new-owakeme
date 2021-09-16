export const SET_LOCAL_TRACK = 'SET_LOCAL_TRACK'
export const SET_LEAVE_LOCAL_TRACK = 'SET_LEAVE_LOCAL_TRACK'

export const onLocalTrack = (videoTrack, audioTrack, client) => {
    return {
        type: SET_LOCAL_TRACK,
        localVideo: videoTrack,
        localAudio: audioTrack,
        localClient: client
    }
}

export const onLeaveLocalTrack = () => {
    return {
        type: SET_LEAVE_LOCAL_TRACK,
    }
}

