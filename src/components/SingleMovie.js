import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useSingleMovieDetails from "../hooks/useSingleMovieDetails";
import { IMG_CDN_URL } from "../utils/constants";
import { useSelector } from "react-redux";
import Header from "./Header";

const SingleMovie = () => {
	const { movieId } = useParams(); // Get the dynamic title from the URL

	useSingleMovieDetails(movieId);

	const movieData = useSelector((store) => store.movies?.singleMovie);
	// Check if movieData is available before destructuring
	if (!movieData) {
		return <div>Loading...</div>; // You can replace this with a loading spinner if needed
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
	// Title, overview, vote average, genres, release date, runtime

	const hours = Math.floor(runtime / 60);
	const minutes = runtime - hours * 60;

	const date = new Date(release_date);

	// Convert the date to "30 April 2024"
	const releaseDate = date.toLocaleDateString("en-GB", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});

	return (
		<>
			<Header />
			<div className="movie-single pt-[48px] md:pt-0">
				<div className="movie-container flex-col flex md:flex-row gap-8 bg-black text-white md:h-screen py-4 px-4 md:px-8">
					<div className="movie-poster order-2 md:order-1 flex items-center basis-[40%] overflow-hidden">
						<img
							alt="Movie Card"
							src={IMG_CDN_URL + poster_path}
							className="object-cover w-full"
						/>
					</div>
					<div className="movie-content md:order-2 flex flex-col justify-center gap-8 basis-[60%]">
						<div>
							<h2 className="text-[clamp(1.5rem,0.582rem+2.449vw,4.5rem)] pb-4">
								{title}
							</h2>
							<p className="text-xl">{overview}</p>
						</div>
						<div>
							{genres.map((genre, index) => (
								<span key={genre.name}>
									{genre.name}
									{index < genres.length - 1 ? " |" : ""}{" "}
								</span>
							))}
						</div>
						<div className="flex justify-between max-w-[80%] md:max-w-[50%]">
							<span>⭐️{Math.floor(vote_average)}/10</span>
							<span>
								{hours}hr {minutes}mins
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
