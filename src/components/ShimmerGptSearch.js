import React from "react";

const ShimmerGptSearch = () => {
	return (
		<div className="flex flex-col gap-4 mt-[50px] bg-opacity-80 bg-black py-[20px] px-4 relative z-[1]">
			<h1 className="text-2xl pb-4 text-white pl-4">Suggested Movies</h1>
			<div className="flex gap-4 z-[1]">
				<div className="bg-neutral-500 opacity-30 w-[275px] h-[155px] animate-pulse"></div>
				<div className="bg-neutral-500 opacity-30 w-[275px] h-[155px] animate-pulse"></div>
				<div className="bg-neutral-500 opacity-30 w-[275px] h-[155px] animate-pulse"></div>
				<div className="bg-neutral-500 opacity-30 w-[275px] h-[155px] animate-pulse"></div>
				<div className="bg-neutral-500 opacity-30 w-[275px] h-[155px] animate-pulse"></div>
			</div>
		</div>
	);
};

export default ShimmerGptSearch;
