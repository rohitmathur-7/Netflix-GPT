import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
	const movies = useSelector((store) => store.movies);

	return (
		movies && (
			<div className="secondary-container bg-black">
				<div className="[@media(width<=550px)]:mt-0 -mt-[10%] md:-mt-[15%] z-[1] relative flex flex-col gap-4 pb-[150px]">
					<MovieList
						title={"Now Playing"}
						movies={movies.nowPlayingMovies}
						isGptMovies={false}
					/>
					<MovieList
						title={"Popular Movies"}
						movies={movies.popularMovies}
						isGptMovies={false}
					/>
					<MovieList
						title={"Now Playing"}
						movies={movies.nowPlayingMovies}
						isGptMovies={false}
					/>
					<MovieList
						title={"Popular Movies"}
						movies={movies.popularMovies}
						isGptMovies={false}
						lastList={true}
					/>
				</div>
			</div>
		)
	);
};

export default SecondaryContainer;
