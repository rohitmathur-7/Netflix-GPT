import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies, isGptMovies }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl pb-4 text-white">{title}</h1>
      <div className="flex overflow-x-auto">
        <div className="flex gap-4">
          {movies?.map((movie) => (
            <MovieCard
              key={movie.id}
              posterPath={movie.poster_path}
              isGptMovies={isGptMovies}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
