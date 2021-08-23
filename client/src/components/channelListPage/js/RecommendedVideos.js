import React, { useState, useEffect } from "react";
import "../css/RecommendedVideos.css";
import VideoCard from "./VideoCard";
import axios from 'axios';

function RecommendedVideo() {
  const [roomList, setRoomList] = useState([]);

  useEffect(() => {
    axios.get('/api/room/roomList').then(res => {
      debugger;
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
                  title="Whether we like it or not..."
                  views="2M Views"
                  timestamp="4 days ago"
                  channelImage="https://yt3.ggpht.com/ytc/AKedOLT3V53iXJyH3C_1lHpx9HzRY7RInhQjmW8VocWY4A=s68-c-k-c0x00ffffff-no-rj"
                  channel="Christian Guzman"
                  image="https://i.ytimg.com/vi/llZ8FCHhsto/hq720_live.jpg?sqp=CMi5lIgG-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBfKqFPaKVuZ2FSlDhxWvDNDrDbzw"
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
