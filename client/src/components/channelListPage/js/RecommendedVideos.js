import React, { useState, useEffect } from "react";
import "../css/RecommendedVideos.css";
import VideoCard from "./VideoCard";
import axios from 'axios';

function RecommendedVideo() {
  const [roomList, setRoomList] = useState([]);

  useEffect(() => {
    axios.get('/api/room/roomList').then(res => {
      setRoomList(res.data.roomList);
    })
  }, [])

  return (
    <>
    {
      roomList.map((obj, index) => {
        return (
          <div className="recommendedVideos">
            <h2>OPEN CHANNELS</h2>
            <div className="recommendedVideos__videos__container">
              <div className="recommendedVideos__videos">
                <VideoCard
                  channelImage="https://yt3.ggpht.com/ytc/AKedOLT3V53iXJyH3C_1lHpx9HzRY7RInhQjmW8VocWY4A=s68-c-k-c0x00ffffff-no-rj"
                  channel="Christian Guzman"
                  roomNumber={obj.roomNumber}
                  makeUserName={obj.makeUserName}
                />
              </div>
            </div>
          </div>
        )
      })
    }
    </>
  );
}

export default RecommendedVideo;
