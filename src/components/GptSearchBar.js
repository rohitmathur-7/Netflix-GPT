import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import lang from "../utils/languageConstants";
import { GEMINI_API_KEY, API_OPTIONS } from "../utils/constants";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { addGeminiMovieResults } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = async () => {
    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      ". only give me names of atleast 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    const data = await model.generateContent(gptQuery);
    const result = data.response.text();
    const movies = result.split(",");
    const geminiSuggestedMovies = movies.map((movie) => movie.trim());

    const promiseArray = geminiSuggestedMovies.map((movie) =>
      searchMovieTMDB(movie)
    );

    const res = await Promise.all(promiseArray);
    const flattenedResults = res.flat();

    const tmdbResults = flattenedResults.filter((movie) => {
      return geminiSuggestedMovies.includes(movie.original_title);
    });

    dispatch(
      addGeminiMovieResults({
        movieNames: geminiSuggestedMovies,
        movieResults: tmdbResults,
      })
    );
  };

  return (
    <div className="pt-[10%] w-1/2 m-auto relative z-0">
      <form
        className="bg-black flex justify-between py-8 px-4 rounded-lg gap-4 shadow-2xl"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          placeholder={lang[langKey].gptSearchPlaceholder}
          className="bg-black text-white w-full outline-none"
        />
        <button
          className="bg-red-700 text-white px-8 py-2 rounded-lg"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
