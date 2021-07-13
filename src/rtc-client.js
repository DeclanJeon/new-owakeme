import AgoraRTC from 'agora-rtc-sdk-ng'

let rtc = {
    localAudioTrack: null,
    localVideoTrack: null,
    screenVideoTrack: null
};

let options = {
    // Pass your App ID here.
    appId: process.env.REACT_APP_AGORA_APP_ID,
    // Set the channel name.
    channel: "owake",
    // Pass your temp token here.
    token: null,
    // Set the user ID.
    uid: 0
};


export default class RTCClient {
    constructor(){
        this._client = null
        this._joined = false
        this._localStream = null
        this._params = {}
        this._uid = 0
        this._showProfile = false
        this._subscribed = false
        this._created = false
    }

    createClient (data) {
        this._client = AgoraRTC.createClient({ mode: data.mode, codec: data.codec })
        return this._client
    }

    async setClientRole (role) {
        await this._client.setClientRole(role)
    }

    async join () {
        await this._client.join(options.appId, options.channel, options.token, options.uid)
        this.createRTCTrack();
    }

    async createRTCTrack () {
        rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();

        this._client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);

        rtc.localVideoTrack.play("local-player")
    }

    async share(){
        this.createShareScreenTrack();
    }

    async createShareScreenTrack(){
        rtc.screenVideoTrack = await AgoraRTC.createScreenVideoTrack({encoderConfig: "1080p_1"},"enable");

        this._client.publish(rtc.screenVideoTrack);


    }
}