import React, { useState, useRef, useEffect } from "react";
import { IMG_CDN_URL } from "../utils/constants";
import SingleMovie from "./SingleMovie";

const MovieCard = ({
	movie,
	posterPath,
	isGptMovies,
	scrollOffset,
	containerOffsetLeft,
	firstMovie,
	lastMovie,
}) => {
	const [showSingleMovie, setShowSingleMovie] = useState(false);
	const [isHover, setIsHover] = useState(false);
	const cardRef = useRef(null); // To track the card's position
	const hoverTimeoutRef = useRef(null); // To store the timeout ID
	const [cardLeftPosition, setCardLeftPosition] = useState(0);

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
				className={`w-48 h-full cursor-pointer`}
				onClick={handleMovieClick}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeaveMain}
			>
				<img
					alt="Movie Card"
					src={IMG_CDN_URL + posterPath}
					className="rounded-md"
				/>
			</div>
			{isHover && (
				<div
					className={`movie-card-hover w-48 h-full cursor-pointer absolute z-10 transition-transform transform scale-[1.5]`}
					style={{
						left: firstMovie
							? `${cardLeftPosition + 80}px`
							: lastMovie
							? `${cardLeftPosition}px`
							: `${cardLeftPosition + 50}px`,
						top: "25%",
					}}
					onMouseLeave={handleMouseLeave}
				>
					<img
						alt="Movie Card"
						src={IMG_CDN_URL + posterPath}
						className="rounded-md"
					/>
				</div>
			)}
		</div>
	) : (
		<SingleMovie />
	);
};

export default MovieCard;
