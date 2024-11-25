import React from "react";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";

const MovieList = ({ title, movies, isGptMovies }) => {
	return (
		<div className="p-4">
			<h1 className="text-2xl pb-4 text-white">{title}</h1>
			<div className="flex overflow-x-auto">
				<div className="flex gap-4">
					{movies?.map((movie) => (
						<Link to={"/movie/" + movie.id} key={movie.id}>
							<MovieCard
								movie={movie}
								key={movie.id}
								posterPath={movie.poster_path}
								isGptMovies={isGptMovies}
							/>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export default MovieList;
