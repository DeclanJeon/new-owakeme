import React, { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'

const StreamPlayer = ({audioTrack, videoTrack, shareTrack, type, uid}) => {
    const container = useRef(null)

    const userName = useSelector(state => state.userReducer.userName)
    
    useEffect(() => {
        if (!container.current) return;
        videoTrack?.play(container.current);

        return () => {
            videoTrack?.stop()
        };
    }, [container, videoTrack])
    useEffect(() => {
        audioTrack?.play();

        return () => {
            audioTrack?.stop();
        };
    }, [audioTrack]) 

    return (
        <>
            <div ref={container} style={{ width: "480px", height: "320px"}}>
                
            </div>
            {/* <span>{type === 'local' ? 'local ' + userName : 'remote ' + uid}</span> */}
        </>
    )
}

export default StreamPlayer