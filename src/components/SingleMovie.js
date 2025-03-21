import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useSingleMovieDetails from "../hooks/useSingleMovieDetails";
import { IMG_CDN_URL } from "../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import Header from "./Header";
import Footer from "./Footer";
import Shimmer from "./Shimmer";
import { resetSingleMovie } from "../utils/movieSlice";
import { CiCirclePlus, CiCircleCheck } from "react-icons/ci";
import { addToWishlist, removeFromWishlist } from "../utils/movieSlice";

const SingleMovie = () => {
	const { movieId } = useParams(); // Get the dynamic movie ID from the URL
	const dispatch = useDispatch();

	const wishlist = useSelector((state) => state.movies.wishlist); // Get wishlist from Redux store

	// Custom hook to fetch movie details
	useSingleMovieDetails(movieId);

	// Fetch movie data from the Redux store
	const movieData = useSelector((store) => store.movies?.singleMovie);

	// Clear movie data on unmount
	useEffect(() => {
		return () => {
			dispatch(resetSingleMovie());
		};
	}, [dispatch]);

	// Show a loader if movie data isn't available yet
	if (!movieData) {
		return <Shimmer />;
	}

	const {
		poster_path,
		title,
		overview,
		vote_average,
		runtime,
		release_date,
		genres,
	} = movieData;

	// Calculate runtime in hours and minutes
	const hours = Math.floor(runtime / 60);
	const minutes = runtime % 60;

	// Format release date as "30 April 2024"
	const releaseDate = new Date(release_date).toLocaleDateString("en-GB", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});

	const genreIds = movieData?.genres?.map((genre) => genre.id) || [];

	const updatedMovieData = {
		...movieData,
		genre_ids: genreIds,
	};

	const isMovieInWishlist = wishlist.some((m) => m.id === Number(movieId));

	const handleWishlistToggle = (e) => {
		e.preventDefault();

		if (isMovieInWishlist) {
			// If the movie is in the wishlist, remove it
			dispatch(removeFromWishlist(Number(movieId)));
		} else {
			// If the movie is not in the wishlist, add it
			dispatch(addToWishlist(updatedMovieData));
		}
	};

	return (
		<>
			<Header />
			<div className="movie-single relative pt-[50px] md:pt-[84px] lg:pt-[96px] pb-[100px]">
				<div className="movie-container flex flex-col lg:flex-row gap-16 bg-black text-white h-full lg:h-[calc(100vh-95px)] px-4 lg:px-8 overflow-hidden">
					{/* Movie Poster */}
					<div className="movie-poster order-2 lg:order-1 flex items-center justify-center overflow-hidden">
						<img
							alt="Movie Poster"
							src={`${IMG_CDN_URL}${poster_path}`}
							className="h-full w-full object-contain object-left rounded-lg"
						/>
					</div>

					{/* Movie Content */}
					<div className="movie-content lg:order-2 flex flex-col flex-[1_1_50%] justify-center gap-8 basis-[60%] overflow-y-auto">
						{/* Title and Overview */}
						<div>
							<h2 className="text-[clamp(1.5rem,0.582rem+2.449vw,4.5rem)] pb-4">
								{title}
							</h2>
							<p className="text-xl">{overview}</p>
						</div>

						{/* Genres */}
						<div>
							<span>{genres.map((genre) => genre.name).join(" | ")}</span>
						</div>

						{/* Stats */}
						<div className="flex justify-between [@media(width<=1100px)]:max-w-full [@media(width>1100px)]:max-w-[50%] w-full">
							<span>⭐️ {Math.floor(vote_average)}/10</span>
							<span>
								{hours}hr {minutes}min
							</span>
							<span>{releaseDate}</span>
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
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default SingleMovie;
