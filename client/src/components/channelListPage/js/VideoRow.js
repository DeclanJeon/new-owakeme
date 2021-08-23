import React from "react";
import "../css/VideoRow.css";

function VideoRow({
  views,
  subs,
  description,
  timestamp,
  channel,
  title,
  image,
}) {
  return (
    <div className="videoRow">
      {/* 
        작성자 : 전형동
        작성일 : 210823
        내용 : 구글 프로필 연동할 것
      */}
      <img src={image} alt="" />
      <div className="videoRow__text">
        <h3>{title}</h3>
        <p className="videoRow__headline">
          {channel} ●{" "}
          <span className="videoRow__subs">
            <span className="videoRow__subsNumber">{subs}</span> Subscripers
          </span>{" "}
          {views} views ● {timestamp}
        </p>
        <p className="videoRow__description">{description}</p>
      </div>
    </div>
  );
}

export default VideoRow;
