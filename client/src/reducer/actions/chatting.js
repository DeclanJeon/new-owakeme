export const CHANNEL_CHATTING = 'CHANNEL_CHATTING';

export const ChannelChatting = (channelName, userName, message, messageTime, track, fileStorage) => {
    return {
        type: CHANNEL_CHATTING,
        channelName: channelName,
        userName: userName,
        message: message,
        messageTime: messageTime,
        track: track,
        fileStorage: fileStorage
    }
}