import React, { useState, useRef, useEffect } from "react";
import { IMG_CDN_URL } from "../utils/constants";
import SingleMovie from "./SingleMovie";
import { CiCirclePlus } from "react-icons/ci";
import { IoPlayCircleOutline } from "react-icons/io5";
import { movieGenres } from "../utils/movieGeneres";

const MovieCard = ({
	movie,
	posterPath,
	isGptMovies,
	scrollOffset,
	containerOffsetLeft,
	firstMovie,
	lastMovie,
	lastList,
	cardWidth,
}) => {
	console.log("🚀 ~ cardWidth:", cardWidth);
	const [showSingleMovie, setShowSingleMovie] = useState(false);
	const [isHover, setIsHover] = useState(false);
	const cardRef = useRef(null); // To track the card's position
	const hoverTimeoutRef = useRef(null); // To store the timeout ID
	const [cardLeftPosition, setCardLeftPosition] = useState(0);

	const movieGenereIds = movie.genre_ids.slice(0, 2);

	// Calculate the card's position unconditionally
	useEffect(() => {
		if (cardRef.current) {
			// Calculate the card's position relative to the container
			const cardPosition = cardRef.current.offsetLeft - containerOffsetLeft;
			setCardLeftPosition(cardPosition - scrollOffset);
		}
	}, [scrollOffset, containerOffsetLeft]);

	// If no posterPath is provided, render null (outside the hook)
	if (!posterPath) {
		return null;
	}

	const handleMovieClick = () => {
		setShowSingleMovie(true);
	};

	const handleMouseEnter = () => {
		hoverTimeoutRef.current = setTimeout(() => {
			setIsHover(true);
		}, 800);
	};

	const handleMouseLeave = () => {
		clearTimeout(hoverTimeoutRef.current);
		setIsHover(false);
	};

	const handleMouseLeaveMain = () => {
		// Clear the timeout and reset isHover
		clearTimeout(hoverTimeoutRef.current);
		// setIsHover(false);
	};

	return !showSingleMovie ? (
		<div ref={cardRef}>
			<div
				className={`h-full cursor-pointer`}
				onClick={handleMovieClick}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeaveMain}
				style={{
					width: cardWidth,
				}}
			>
				<img
					alt="Movie Card"
					src={IMG_CDN_URL + posterPath}
					className="rounded-md"
				/>
			</div>
			{isHover && (
				<div
					className={`movie-card-hover h-full cursor-pointer absolute z-10 transition-transform transform scale-[1.3]`}
					style={{
						width: cardWidth,
						left: firstMovie
							? `${cardLeftPosition + 60}px`
							: lastMovie
							? `${cardLeftPosition}px`
							: `${cardLeftPosition + 30}px`,
						top: lastList ? "-8%" : "0",
					}}
					onMouseLeave={handleMouseLeave}
				>
					<div>
						<img
							alt="Movie Card"
							src={IMG_CDN_URL + posterPath}
							className="rounded-md"
						/>
						<div className="flex flex-col gap-2 bg-[#141414] text-white p-4">
							<div className="flex">
								<IoPlayCircleOutline
									size={24}
									className="text-gray-400 hover:text-white"
								/>
								<CiCirclePlus
									size={24}
									className="text-gray-400 hover:text-white"
								/>
							</div>
							<div className="flex flex-wrap gap-1 text-xs">
								{movieGenereIds.map((id, idx) => (
									<p key={id}>
										{idx === 1
											? movieGenres[id]
											: `${movieGenres[id]} ${
													movieGenereIds.length > 1 ? "|" : ""
											  }`}
									</p>
								))}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	) : (
		<SingleMovie />
	);
};

export default MovieCard;
