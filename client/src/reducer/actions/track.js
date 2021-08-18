export const SET_LOCAL_VIDEO_TRACK = 'SET_LOCAL_VIDEO_TRACK'
export const SET_LOCAL_AUDIO_TRACK = 'ET_LOCAL_AUDIO_TRACK'
export const SET_REMOTE_USERS = 'SET_REMOTE_USERS'

export const onLocalVideoTrack = (videoTrack) => {
    return {
        type: SET_LOCAL_VIDEO_TRACK,
        localVideoTrack: videoTrack
    }
}

export const onLocalAudioTrack = (audioTrack) => {
    return {
        type: SET_LOCAL_AUDIO_TRACK,
        localAudioTrack: audioTrack
    }
}

export const onRemoteUsers = (remoteUsers) => {
    return {
        type: SET_REMOTE_USERS,
        remoteUsers: remoteUsers
    }
}