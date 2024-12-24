import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useSingleMovieDetails from "../hooks/useSingleMovieDetails";
import { IMG_CDN_URL } from "../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import Header from "./Header";
import Shimmer from "./Shimmer";
import { resetSingleMovie } from "../utils/movieSlice";

const SingleMovie = () => {
	const { movieId } = useParams(); // Get the dynamic movie ID from the URL
	const dispatch = useDispatch();

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

	return (
		<>
			<Header />
			<div className="movie-single relative pt-[50px] md:pt-[84px] lg:pt-[96px]">
				<div className="movie-container flex flex-col md:flex-row gap-16 bg-black text-white h-full md:h-[calc(100vh-95px)] px-4 md:px-8 overflow-hidden">
					{/* Movie Poster */}
					<div className="movie-poster order-2 md:order-1 flex items-center justify-center overflow-hidden">
						<img
							alt="Movie Poster"
							src={`${IMG_CDN_URL}${poster_path}`}
							className="h-full w-auto md:w-full object-contain object-left rounded-lg"
						/>
					</div>

					{/* Movie Content */}
					<div className="movie-content md:order-2 flex flex-col flex-[1_1_50%] justify-center gap-8 basis-[60%] overflow-y-auto">
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
						<div className="flex justify-between [@media(width<=1100px)]:max-w-full [@media(width>1100px)]:max-w-[50%] ">
							<span>⭐️ {Math.floor(vote_average)}/10</span>
							<span>
								{hours}hr {minutes}min
							</span>
							<span>{releaseDate}</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default SingleMovie;
