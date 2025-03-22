import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { GEMINI_API_KEY, API_OPTIONS } from "../utils/constants";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { addGeminiMovieResults, setLoading } from "../utils/gptSlice";

const GptSearchBar = () => {
	const dispatch = useDispatch();
	const langKey = useSelector((store) => store.config.lang);
	const isLoading = useSelector((store) => store.gpt.loading);
	const searchText = useRef(null);
	const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
	const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

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
		if (isLoading) return; // Prevent multiple clicks while loading
		dispatch(setLoading(true));

		try {
			const gptQuery =
				"Act as a Movie Recommendation system and suggest some movies for the query : " +
				searchText.current.value +
				". only give me names of atleast 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

			const data = await model.generateContent(gptQuery);
			const result = data.response.text();
			const movies = result.split(",");
			const geminiSuggestedMovies = movies.map((movie) => movie.trim());

			const promiseArray = geminiSuggestedMovies.map((movie) =>
				searchMovieTMDB(movie)
			);

			const res = await Promise.all(promiseArray);
			const flattenedResults = res.flat();

			const tmdbResults = flattenedResults.filter((movie) =>
				geminiSuggestedMovies.includes(movie.original_title)
			);

			dispatch(
				addGeminiMovieResults({
					movieNames: geminiSuggestedMovies,
					movieResults: tmdbResults,
				})
			);
		} catch (error) {
			console.error("Error fetching movie recommendations:", error);
		} finally {
			dispatch(setLoading(false));
		}
	};

	return (
		<div className="pt-[15vh] w-full px-4 lg:w-1/2 lg:px-0 m-auto relative z-0">
			<form
				className="bg-black flex justify-between items-center py-8 px-4 rounded-lg gap-4 shadow-2xl [@media(width<=600px)]:flex-col"
				onSubmit={(e) => e.preventDefault()}
			>
				<input
					ref={searchText}
					type="text"
					placeholder={lang[langKey].gptSearchPlaceholder}
					className="bg-black text-white w-full outline-none overflow-scroll [@media(width<=600px)]:text-center"
					disabled={isLoading}
				/>
				<button
					className="w-[120px] h-[40px] bg-red-700 text-white rounded-lg disabled:cursor-not-allowed flex items-center justify-center"
					onClick={handleGptSearchClick}
					disabled={isLoading}
				>
					{isLoading ? (
						<svg
							aria-hidden="true"
							className="w-5 h-5 text-white animate-spin"
							viewBox="0 0 100 101"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M100 50.5C100 78.2714 77.6142 100.5 50 100.5C22.3858 100.5 0 78.2714 0 50.5C0 22.7286 22.3858 0.5 50 0.5C57.4463 0.5 64.6178 1.82089 71.1656 4.30689C77.7134 6.7929 83.5115 10.3733 88.2843 14.9154L80.8899 22.0655C77.1414 18.5563 72.7081 15.7784 67.8811 13.8916C63.0541 12.0048 57.9433 11.0516 52.75 11.1012C27.6766 11.3406 7.69288 31.5579 7.69288 56.7079C7.69288 78.8263 27.0824 97.5 50 97.5C72.9176 97.5 92.3071 78.8263 92.3071 56.7079H100Z"
								fill="currentColor"
							/>
						</svg>
					) : (
						lang[langKey].search
					)}
				</button>
			</form>
		</div>
	);
};

export default GptSearchBar;
