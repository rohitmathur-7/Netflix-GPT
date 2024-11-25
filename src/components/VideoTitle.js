import React from "react";
import play from "../../src/assets/images/play.svg";
import info from "../../src/assets/images/info.svg";

const VideoTitle = ({ title, overview }) => {
	return (
		<div className="flex justify-center pt-[5%] md:pt-0 md:mt-[-2.5%] gap-4 flex-col pl-4 md:pl-8 absolute z-[1] text-white bg-gradient-to-r from-black w-screen aspect-video">
			<div className="md:max-w-[40%]">
				<h1 className="text-[clamp(1.5rem,0.582rem+2.449vw,4.5rem)]">
					{title}
				</h1>
			</div>
			<div className="flex gap-4 btn-container md:pt-4 ">
				<button className="flex items-center text-xs md:text-base gap-2 px-3 py-2 md:px-5 md:py-3 rounded-lg bg-white text-black hover:opacity-80">
					<div>
						<img className="w-[16px] md:w-[24px]" src={play} />
					</div>
					<span>Play</span>
				</button>
				<button className="flex items-center text-xs md:text-base gap-2 bg-slate-600 text-white opacity-90 px-3 py-2 md:px-5 md:py-3 rounded-lg hover:opacity-80">
					<div>
						<img className="w-[16px] md:w-[24px]" src={info} />
					</div>
					<span>More Info</span>
				</button>
			</div>
		</div>
	);
};

export default VideoTitle;
