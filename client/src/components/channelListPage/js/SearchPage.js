import React from "react";
import "../css/SearchPage.css";
import TuneOutlinedIcon from "@material-ui/icons/TuneOutlined";
import ChannelRow from "./ChannelRow";
import VideoRow from "./VideoRow";

function SearchPage() {
  return (
    <div className="searchPage">
      <div className="searchPage__filter">
        <TuneOutlinedIcon />
        <h2>FILTER</h2>
      </div>
      <hr />

      <ChannelRow
        image="https://yt3.ggpht.com/ytc/AKedOLQM_eJbQWnorWEjBPHDhQoAk_vxcL12c8C39v2b3A=s176-c-k-c0x00ffffff-no-rj"
        channel="EZ DO BAND"
        verified
        subs="11400K"
        noOfVideos={419}
        description="You can find awesome Cover Songs"
      />
      <hr />

      <VideoRow
        views="1.4M"
        subs="11400K"
        description="Do you wnat a Free Videos"
        timestamp="59 seconds ago"
        channel="EZ DO BAND"
        title="Let's Build a Youtube Cover"
        image="https://i.ytimg.com/vi/6FJXakx7-fQ/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBJhmDv3R3m0AuVehrJXm6PIZaJ-Q"
      />
    </div>
  );
}

export default SearchPage;
