import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Shimmer = () => {
	return (
		<>
			<Header />
			<div className="flex flex-col pt-[60px] md:mt-0 md:flex-row items-center gap-8 px-8 py-8 h-full animate-pulse">
				<div className="bg-white opacity-10 rounded-xl w-full h-1/2 md:w-[30%] md:h-[70%]"></div>
				<div className="bg-white opacity-10 rounded-xl w-full h-1/2 md:w-[80%] md:h-[70%]"></div>
			</div>
			<Footer />
		</>
	);
};

export default Shimmer;
