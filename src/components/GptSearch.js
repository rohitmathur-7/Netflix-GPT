import React from "react";
import GptSearchBar from "./GptSearchBar";
import { HOME_BG } from "../utils/constants";

const GptSearch = () => {
  return (
    <div>
      <img
        src={HOME_BG}
        alt="Home background"
        className="w-screen h-screen object-cover absolute"
      />
      <GptSearchBar />
    </div>
  );
};

export default GptSearch;
