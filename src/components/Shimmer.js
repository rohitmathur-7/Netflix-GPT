import React from "react";
import Header from "./Header";

const Shimmer = () => {
	return (
		<>
			<Header />
			<div className="flex items-center gap-8 px-8 py-8 h-full">
				<div className="bg-gray-400 rounded-xl w-[30%] h-[70%]"></div>
				<div className="bg-gray-400 rounded-xl w-[80%] h-[70%]"></div>
			</div>
		</>
	);
};

export default Shimmer;
