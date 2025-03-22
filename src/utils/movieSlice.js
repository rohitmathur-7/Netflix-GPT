import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
	name: "movies",
	initialState: {
		nowPlayingMovies: null,
		popularMovies: null,
		trailerVideo: null,
		singleMovie: null,
		wishlist: [],
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
		// Add to wishlist reducer
		addToWishlist: (state, action) => {
			const movie = action.payload;
			if (!state.wishlist.some((m) => m.id === movie.id)) {
				state.wishlist.push(movie);
			}
		},
		// Remove from wishlist reducer
		removeFromWishlist: (state, action) => {
			const movieId = action.payload;
			state.wishlist = state.wishlist.filter((m) => m.id !== movieId);
			state.wishlist = state.wishlist.filter((m) => m !== movieId);
		},
	},
});

export const {
	addNowPlayingMovies,
	addPopularMovies,
	addTrailerVideo,
	addSingleMovie,
	resetSingleMovie,
	addToWishlist,
	removeFromWishlist,
} = movieSlice.actions;

export default movieSlice.reducer;
