export const SET_LOCAL_TRACK = 'SET_LOCAL_TRACK';
export const SET_LEAVE_LOCAL_TRACK = 'SET_LEAVE_LOCAL_TRACK';
export const SET_ON_LOCAL_SHARE = 'SET_ON_LOCAL_SHARE';
export const SET_OFF_LOCAL_SHARE = 'SET_OFF_LOCAL_SHARE';
export const SET_USE_SHARING = 'SET_USE_SHARING';
export const SET_DONT_USE_SHARING = 'SET_DONT_USE_SHARING';

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

export const onLocalShare = (shareClient, shareTrack) => {
    return {
        type: SET_ON_LOCAL_SHARE,
        shareClient: shareClient,
        shareTrack: shareTrack
    }
}

export const offLocalShare = () => {
    return {
        type: SET_OFF_LOCAL_SHARE
    }
}

export const useSharing = () => {
    return {
        type: SET_USE_SHARING
    }
}

export const dontUseSharing = () => {
    return {
        type: SET_DONT_USE_SHARING
    }
}