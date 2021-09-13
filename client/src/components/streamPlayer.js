import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";

const StreamPlayer = ({ audioTrack, videoTrack, type, uid, showUid }) => {
  const container = useRef(null);
  const userName = useSelector((state) => state.userReducer.userName);
  
  useEffect(() => {
    if (!container.current) return;
    videoTrack?.play(container.current);

    return () => {
      videoTrack?.stop();
    };
  }, [container, videoTrack]);
  useEffect(() => {
    audioTrack?.play();

    return () => {
      audioTrack?.stop();
    };
  }, [audioTrack]);

  return (
    <>
      <div
        className="view__container"
        ref={container}
      >
          {showUid && 
            <div className="stream__container">
              <div className='stream-uid'>UID: {uid}</div>
            </div>
          }
      </div>
    </>
  );
};

export default React.memo(StreamPlayer);
