import React from "react";
import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath, isGptMovies }) => {
  if (!posterPath) return;

  return (
    <div className={isGptMovies ? "w-48" : "w-32"}>
      <img alt="Movie Card" src={IMG_CDN_URL + posterPath} />
    </div>
  );
};

export default MovieCard;
