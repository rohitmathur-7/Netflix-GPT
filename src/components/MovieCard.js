import React, { useState, useRef, useEffect } from "react";
import { IMG_CDN_URL } from "../utils/constants";
import SingleMovie from "./SingleMovie";
import { CiCirclePlus, CiCircleCheck } from "react-icons/ci";
import { IoPlayCircleOutline } from "react-icons/io5";
import { movieGenres } from "../utils/movieGeneres";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../utils/movieSlice";

const MovieCard = ({
	movie,
	posterPath,
	isGptMovies,
	firstMovie,
	lastMovie,
	lastList,
	onHoverChange,
}) => {
	const dispatch = useDispatch();
	const wishlist = useSelector((state) => state.movies.wishlist); // Get wishlist from Redux store
	const [showSingleMovie, setShowSingleMovie] = useState(false);
	const [isHover, setIsHover] = useState(false);
	const [imgWidth, setImgWidth] = useState(0);
	const [isScalingDown, setIsScalingDown] = useState(false);
	const cardRef = useRef(null);
	const hoverTimeoutRef = useRef(null);
	const movieCardImgRef = useRef(null);
	const movieGenereIds = movie.genre_ids.slice(0, 2);

	// Check if the current movie is in the wishlist
	const isMovieInWishlist = wishlist.some((m) => m.id === movie.id);

	useEffect(() => {
		if (movieCardImgRef.current) {
			setImgWidth(movieCardImgRef.current.clientWidth);
		}
	}, [posterPath, isHover]);

	if (!posterPath) {
		return null;
	}

	const handleMovieClick = (e) => {
		setShowSingleMovie(true);
	};

	const handleMouseEnter = () => {
		hoverTimeoutRef.current = setTimeout(() => {
			setIsHover(true);
			onHoverChange(true);
		}, 800);
	};

	const handleMouseLeave = () => {
		clearTimeout(hoverTimeoutRef.current);

		setIsScalingDown(true); // Trigger scale-down animation
		setTimeout(() => {
			setIsHover(false);
			onHoverChange(false);
			setIsScalingDown(false); // Reset scale-down state
		}, 100);
	};

	const handleMouseLeaveMain = () => {
		clearTimeout(hoverTimeoutRef.current);
	};

	const handleWishlistToggle = (e) => {
		e.preventDefault();
		if (isMovieInWishlist) {
			// If the movie is in the wishlist, remove it
			dispatch(removeFromWishlist(movie.id));
		} else {
			// If the movie is not in the wishlist, add it
			dispatch(addToWishlist(movie));
		}
	};

	return !showSingleMovie ? (
		<div ref={cardRef} className="relative">
			<div
				className="movie-card h-full cursor-pointer relative z-10"
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeaveMain}
				onClick={handleMovieClick}
			>
				<img
					alt="Movie Card"
					src={IMG_CDN_URL + posterPath}
					className="rounded-md rounded-b-none"
					ref={movieCardImgRef}
				/>
			</div>
			{isHover && (
				<div
					className={`movie-card-hover cursor-pointer absolute z-[100] transition-all duration-300 ease-in-out ${
						isScalingDown ? "scale-down" : ""
					}`}
					style={{
						top: lastList ? "-3%" : "0",
						transformOrigin: firstMovie
							? "left"
							: lastMovie
							? "right"
							: "center",
					}}
					onMouseLeave={handleMouseLeave}
				>
					<div>
						<img
							alt="Movie Card"
							src={IMG_CDN_URL + posterPath}
							className="rounded-md rounded-b-none"
							style={{
								width: imgWidth,
							}}
						/>
						<div className="flex flex-col gap-2 bg-[#141414] text-white p-4 rounded-md rounded-t-none">
							<div className="flex">
								<IoPlayCircleOutline
									size={24}
									className="text-gray-400 hover:text-white"
								/>
								{isMovieInWishlist ? (
									<CiCircleCheck
										size={24}
										className="text-green-400 hover:text-green-500 cursor-pointer wishlist-icon"
										onClick={handleWishlistToggle}
									/>
								) : (
									<CiCirclePlus
										size={24}
										className="text-gray-400 hover:text-white cursor-pointer wishlist-icon"
										onClick={handleWishlistToggle}
									/>
								)}
							</div>
							<div>
								<h3>{movie.title}</h3>
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
