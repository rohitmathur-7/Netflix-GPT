import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieRecommendations = () => {
	const { movieResults } = useSelector((store) => store.gpt);

	if (!movieResults) return;

	return (
		<div className="movie-recommendations overflow-y-visible relative z-0 bg-opacity-80 bg-black mt-[50px] py-[20px]">
			<MovieList
				title="Suggested Movies"
				movies={movieResults}
				isGptMovies={true}
			/>
		</div>
	);
};

export default GptMovieRecommendations;
