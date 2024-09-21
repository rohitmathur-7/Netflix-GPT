import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    movies && (
      <div className="secondary-container bg-black">
        <div className="-mt-64 z-[1] relative">
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
        </div>
      </div>
    )
  );
};

export default SecondaryContainer;
