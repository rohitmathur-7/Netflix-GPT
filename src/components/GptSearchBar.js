import React from "react";
import { useSelector } from "react-redux";
import lang from "../utils/languageConstants";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);

  return (
    <div className="pt-[10%] w-1/2 m-auto relative z-0">
      <form className="bg-black flex justify-between py-8 px-4 rounded-lg gap-4 shadow-2xl">
        <input
          type="text"
          placeholder={lang[langKey].gptSearchPlaceholder}
          className="bg-black text-white w-full outline-none"
        />
        <button className="bg-red-700 text-white px-8 py-2 rounded-lg">
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
