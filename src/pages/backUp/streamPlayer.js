import React, { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'

const StreamPlayer = (props) => {
    const container = useRef(null)
    const userName = useSelector(state => state.userReducer.userName)

    useEffect(() => {
        debugger;
        if (!container.current) return;
        props.videoTrack?.play(container.current);

        return () => {
            props.videoTrack?.stop();
        };
    }, [container, props.videoTrack])
    useEffect(() => {
        props.audioTrack?.play();

        return () => {
            props.audioTrack?.stop();
        };
    }, [props.audioTrack])

    return (
        <>
            <div ref={container} style={{ width: "480px", height: "320px"}}>
                
            </div>
            <div>{userName}</div>
        </>
    )
}

export default React.memo(StreamPlayer)