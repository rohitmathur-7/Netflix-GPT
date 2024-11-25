import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
	name: "gpt",
	initialState: {
		showGptSearch: false,
		movieNames: null,
		movieResults: null,
	},
	reducers: {
		toggleGptSearchView: (state, action) => {
			if (action.payload) {
				state.showGptSearch = false;
				return;
			}
			state.showGptSearch = !state.showGptSearch;
		},
		addGeminiMovieResults: (state, action) => {
			const { movieNames, movieResults } = action.payload;
			state.movieNames = movieNames;
			state.movieResults = movieResults;
		},
	},
});

export const { toggleGptSearchView, addGeminiMovieResults } = gptSlice.actions;
export default gptSlice.reducer;
