import React from "react";

const ShimmerGptSearch = () => {
	return (
		<div className="flex flex-col gap-4 mt-[50px] bg-opacity-80 bg-black py-[20px] px-4 relative z-[1]">
			<h1 className="text-2xl pb-4 text-white pl-4">Suggested Movies</h1>
			<div className="flex gap-4 z-[1] justify-center">
				{window.innerWidth >= 1024 && (
					<>
						<div className="bg-neutral-500 opacity-30 w-[191px] h-[108px] md:w-[232px] md:h-[133px] [@media(width>=1024px)]:w-[275px] [@media(width>=1024px)]:h-[155px] animate-pulse"></div>
						<div className="bg-neutral-500 opacity-30 w-[191px] h-[108px] md:w-[232px] md:h-[133px] [@media(width>=1024px)]:w-[275px] [@media(width>=1024px)]:h-[155px] animate-pulse"></div>
					</>
				)}
				{((window.innerWidth < 1024 && window.innerWidth > 600) ||
					window.innerWidth >= 1024) && (
					<div className="bg-neutral-500 opacity-30 w-[191px] h-[108px] md:w-[232px] md:h-[133px] [@media(width>=1024px)]:w-[275px] [@media(width>=1024px)]:h-[155px] animate-pulse"></div>
				)}
				<div className="bg-neutral-500 opacity-30 w-[191px] h-[108px] md:w-[232px] md:h-[133px] [@media(width>=1024px)]:w-[275px] [@media(width>=1024px)]:h-[155px] animate-pulse"></div>
				<div className="bg-neutral-500 opacity-30 w-[191px] h-[108px] md:w-[232px] md:h-[133px] [@media(width>=1024px)]:w-[275px] [@media(width>=1024px)]:h-[155px] animate-pulse"></div>{" "}
			</div>
		</div>
	);
};

export default ShimmerGptSearch;
