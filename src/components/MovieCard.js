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
	firstMovie,
	lastMovie,
	lastList,
	onHoverChange, // Receive function from MovieList
}) => {
	const [showSingleMovie, setShowSingleMovie] = useState(false);
	const [isHover, setIsHover] = useState(false);
	const cardRef = useRef(null); // To track the card's position
	const hoverTimeoutRef = useRef(null); // To store the timeout ID
	const [cardLeftPosition, setCardLeftPosition] = useState(0);
	const [imgWidth, setImgWidth] = useState(0);
	const movieCardImgRef = useRef(null);
	const movieGenereIds = movie.genre_ids.slice(0, 2);

	useEffect(() => {
		if (movieCardImgRef.current) {
			setImgWidth(movieCardImgRef.current.clientWidth);
		}
	}, [posterPath, isHover]);

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
			onHoverChange(true); // Increase z-index in MovieList

			// Calculate the left position of the movie-card-hover
		}, 800);
	};

	const handleMouseLeave = () => {
		clearTimeout(hoverTimeoutRef.current);
		setIsHover(false);
		onHoverChange(false); // Reset z-index in MovieList
	};

	const handleMouseLeaveMain = () => {
		// Clear the timeout and reset isHover
		clearTimeout(hoverTimeoutRef.current);
		// setIsHover(false);
	};

	return !showSingleMovie ? (
		<div ref={cardRef}>
			<div
				className={`movie-card h-full cursor-pointer relative z-10`}
				onClick={handleMovieClick}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeaveMain}
			>
				<img
					alt="Movie Card"
					src={IMG_CDN_URL + posterPath}
					className="rounded-md"
					ref={movieCardImgRef}
				/>
			</div>
			{isHover && (
				<div
					className={`movie-card-hover cursor-pointer absolute z-[100] transition-transform`}
					style={{
						top: lastList ? "-8%" : "0",
						transform: `translateX(${
							firstMovie ? "45px" : lastMovie ? "-45px" : "0"
						}) scale(1.3)`,
					}}
					onMouseLeave={handleMouseLeave}
				>
					<div>
						<img
							alt="Movie Card"
							src={IMG_CDN_URL + posterPath}
							className="rounded-md"
							style={{
								width: imgWidth,
							}}
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
