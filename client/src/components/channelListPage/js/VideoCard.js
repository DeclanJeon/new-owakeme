import React from "react";
import "../css/VideoCard.css";
import { Avatar } from "@material-ui/core";

function VideoCard(props) {
  const { image, title, channel, views, timestamp, channelImage } = props;

  return (
    <div className="videoCard">
      {/* 
        작성자 : 전형동
        작성일 : 210823
        내용 : 이미지 추가할 때까지 대기
      */}
      {/* <img className="videoCard__thumbnail" src={image} alt="" /> */}
      <div className="videoCard__info">
        <Avatar
          className="videoCard__avatar"
          alt={channel}
          src={channelImage}
        />
        <div className="videoCard__text">
          <h4>{title}</h4>
          <p>{channel}</p>
          <p>
            {views} ● {timestamp}
          </p>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
