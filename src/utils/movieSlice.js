import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
	name: "movies",
	initialState: {
		nowPlayingMovies: null,
		popularMovies: null,
		trailerVideo: null,
		singleMovie: null,
	},
	reducers: {
		addNowPlayingMovies: (state, action) => {
			state.nowPlayingMovies = action.payload;
		},
		addPopularMovies: (state, action) => {
			state.popularMovies = action.payload;
		},
		addTrailerVideo: (state, action) => {
			state.trailerVideo = action.payload;
		},
		addSingleMovie: (state, action) => {
			state.singleMovie = action.payload;
		},
		resetSingleMovie: (state) => {
			state.singleMovie = null;
		},
	},
});

export const {
	addNowPlayingMovies,
	addPopularMovies,
	addTrailerVideo,
	addSingleMovie,
	resetSingleMovie,
} = movieSlice.actions;

export default movieSlice.reducer;
