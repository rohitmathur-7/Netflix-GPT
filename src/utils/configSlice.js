import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
	name: "config",
	initialState: {
		lang: "en",
		isMobileMenuOpen: false,
	},
	reducers: {
		changeLanguage: (state, action) => {
			state.lang = action.payload;
		},
		toggleMobileMenu: (state, action) => {
			state.isMobileMenuOpen = !state.isMobileMenuOpen;
		},
	},
});

export const { changeLanguage, toggleMobileMenu } = configSlice.actions;
export default configSlice.reducer;
