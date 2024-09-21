import React, { useState } from "react";
import { IMG_CDN_URL } from "../utils/constants";
import SingleMovie from "./SingleMovie";

const MovieCard = ({ movie, posterPath, isGptMovies }) => {
  const [showSingleMovie, setShowSingleMovie] = useState(false);

  if (!posterPath) return;

  const handleMovieClick = () => {
    setShowSingleMovie(true);
  };

  return !showSingleMovie ? (
    <div
      className={`${isGptMovies ? "w-48" : "w-32"} cursor-pointer`}
      onClick={handleMovieClick}
    >
      <img alt="Movie Card" src={IMG_CDN_URL + posterPath} />
    </div>
  ) : (
    <SingleMovie />
  );
};

export default MovieCard;
