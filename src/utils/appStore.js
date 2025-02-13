import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // Default storage (localStorage)
import { persistReducer, persistStore } from "redux-persist";
import userReducer from "./userSlice";
import moviesReducer from "./movieSlice";
import gptReducer from "./gptSlice";
import configReducer from "./configSlice";

// Persist configuration for gptSlice
const gptPersistConfig = {
	key: "gpt", // The key under which the persisted data is stored
	storage, // Storage method (localStorage in this case)
	whitelist: ["movieNames", "movieResults"], // Only persist these fields
};

const moviePersistConfig = {
	key: "movies",
	storage,
	whitelist: ["wishlist"], // Persist only the wishlist
};

const persistedGptReducer = persistReducer(gptPersistConfig, gptReducer);
const persistedMovieReducer = persistReducer(moviePersistConfig, moviesReducer);

const appStore = configureStore({
	reducer: {
		user: userReducer,
		movies: persistedMovieReducer,
		gpt: persistedGptReducer,
		config: configReducer,
	},
});

export const persistor = persistStore(appStore);
export default appStore;
