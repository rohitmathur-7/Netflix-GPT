import React from "react";
import play from "../../src/assets/images/play.svg";
import info from "../../src/assets/images/info.svg";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="flex gap-4 flex-col pl-8 pt-64 absolute text-white bg-gradient-to-r from-black w-screen aspect-video">
      <div className="max-w-[40%]">
        <h1 className="text-5xl">{title}</h1>
        {/* <p className="text-xl pt-4">{overview}</p> */}
      </div>
      <div className="flex gap-4 btn-container pt-4 ">
        <button className="flex gap-2 px-5 py-3 rounded-lg bg-white text-black hover:opacity-80">
          <div>
            <img src={play} />
          </div>
          <span>Play</span>
        </button>
        <button className="flex gap-2 bg-slate-600 text-white opacity-90 px-5 py-3 rounded-lg hover:opacity-80">
          <div>
            <img src={info} />
          </div>
          <span>More Info</span>
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
