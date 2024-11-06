import React, { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { LOGO, SUPPORTED_LANGS } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
import { Link } from "react-router-dom";

const Header = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const user = useSelector((store) => store.user);
	const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

	const dispatch = useDispatch();

	const isBrowsePage = location.pathname.includes("/browse");
	const isSingleMoviePage = location.pathname.includes("/movie");

	const handleGptSearchClick = () => {
		// Toggle GptSearch
		dispatch(toggleGptSearchView());
	};

	const handleSignOut = () => {
		signOut(auth)
			.then(() => {
				// Sign-out successful.
			})
			.catch((error) => {
				// An error happened.
				navigate("/error");
			});
	};

	const handleLanguageChange = (e) => {
		dispatch(changeLanguage(e.target.value));
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				// User is signed in
				const { uid, email, displayName, photoURL } = user;
				dispatch(
					addUser({
						uid: uid,
						email: email,
						displayName: displayName,
						photoURL: photoURL,
					})
				);
				// If the current URL does not include "/movie", navigate to /browse
				if (!isSingleMoviePage) {
					navigate("/browse");
				}
			} else {
				// User is signed out
				dispatch(removeUser());
				navigate("/");
			}
		});

		// Unsubscribe when component unmounts.
		return () => unsubscribe();
	}, []);

	return (
		<div
			className={`header cursor-pointer flex justify-center lg:justify-between w-screen px-8 relative z-[1] text-white ${
				(isBrowsePage && !showGptSearch) || isSingleMoviePage
					? "bg-black"
					: "bg-gradient-to-b from-black"
			} `}
		>
			<Link to="/" className="cursor-pointer">
				<img width={200} src={LOGO} alt="Logo" />
			</Link>
			{user && (
				<div className="flex items-center gap-4">
					{showGptSearch && (
						<select className="text-black" onChange={handleLanguageChange}>
							{SUPPORTED_LANGS.map((lang) => (
								<option key={lang.identifier} value={lang.identifier}>
									{lang.name}
								</option>
							))}
						</select>
					)}
					<button
						className="bg-red-700 text-white px-4 py-2 rounded-lg"
						onClick={handleGptSearchClick}
					>
						{showGptSearch ? "HomePage" : "GPT Search"}
					</button>
					<div className="flex flex-col">
						<img src={user?.photoURL} className="w-12 h-12" />
						<button onClick={handleSignOut}>Sign Out</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Header;
