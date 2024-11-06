import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieRecommendations from "./GptMovieRecommendations";
import { HOME_BG } from "../utils/constants";

const GptSearch = () => {
  return (
    <div>
      <img
        src={HOME_BG}
        alt="Home background"
        className="absolute top-0 w-screen h-screen object-cover"
      />
      <GptSearchBar />
      <GptMovieRecommendations />
    </div>
  );
};

export default GptSearch;
