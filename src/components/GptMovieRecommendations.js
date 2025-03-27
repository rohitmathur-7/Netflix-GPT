import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import ShimmerGptSearch from "./ShimmerGptSearch";

const GptMovieRecommendations = () => {
	const { movieResults, loading } = useSelector((store) => store.gpt);

	if (loading) return <ShimmerGptSearch />;

	if (null == movieResults) return;

	return (
		<div className="movie-recommendations overflow-y-visible relative z-0 bg-opacity-80 bg-black mt-[50px] py-[20px] px-4">
			<MovieList
				title="Suggested Movies"
				movies={movieResults}
				isGptMovies={true}
			/>
		</div>
	);
};

export default GptMovieRecommendations;
