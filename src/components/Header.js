import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGS } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
import { toggleMobileMenu } from "../utils/configSlice";
import { Link } from "react-router-dom";
import { Squash as Hamburger } from "hamburger-react";
import { FiSearch } from "react-icons/fi";
import { IoIosLogIn } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";

const Header = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const user = useSelector((store) => store.user);
	const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
	const isMobileMenuOpen = useSelector(
		(store) => store.config.isMobileMenuOpen
	);

	const dispatch = useDispatch();

	const isBrowsePage = location.pathname.includes("/browse");
	const isSingleMoviePage = location.pathname.includes("/movie");

	const handleMenuOpen = () => {
		dispatch(toggleMobileMenu(!isMobileMenuOpen));
	};

	const handleGptSearchClick = (isLogo = false) => {
		if (isLogo) {
			dispatch(toggleGptSearchView(true));
			return;
		}
		dispatch(toggleGptSearchView(false));
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
			className={`header cursor-pointer flex items-center justify-between w-screen px-2 md:px-8 fixed z-[2] text-white ${
				(isBrowsePage && !showGptSearch) || isSingleMoviePage
					? "bg-black"
					: "bg-gradient-to-b from-black"
			} `}
		>
			<Link
				to="/"
				className="cursor-pointer"
				onClick={() => handleGptSearchClick(true)}
			>
				<img
					className="w-[100px] md:w-[150px] lg:w-[200px]"
					src={LOGO}
					alt="Logo"
				/>
			</Link>
			{user && (
				<>
					<div className="nav-desktop hidden md:flex items-center gap-4">
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
							onClick={() => handleGptSearchClick(false)}
						>
							{showGptSearch ? "HomePage" : "GPT Search"}
						</button>
						<div className="flex flex-col">
							<img src={user?.photoURL} className="w-12 h-12" />
							<button onClick={handleSignOut}>Sign Out</button>
						</div>
					</div>
					<div className="nav-mobile flex items-center md:hidden">
						<Hamburger
							toggled={isMobileMenuOpen}
							size={20}
							toggle={handleMenuOpen}
						/>
						<AnimatePresence>
							{isMobileMenuOpen && (
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.2 }}
									className="fixed left-0 right-0 top-[48px] py-8 bg-black"
								>
									<ul className="flex flex-col px-4 gap-8">
										<motion.li
											initial={{ scale: 0, opacity: 0 }}
											animate={{ scale: 1, opacity: 1 }}
											transition={{
												type: "spring",
												stiffness: 260,
												damping: 20,
												delay: 0.1,
											}}
										>
											<button
												className="text-white rounded-lg flex justify-between items-center w-full"
												onClick={() => handleGptSearchClick(false)}
											>
												<span className="text-white">
													{showGptSearch ? "HomePage" : "GPT Search"}
												</span>
												<FiSearch />
											</button>
										</motion.li>
										<motion.li
											initial={{ scale: 0, opacity: 0 }}
											animate={{ scale: 1, opacity: 1 }}
											transition={{
												type: "spring",
												stiffness: 260,
												damping: 20,
												delay: 0.2,
											}}
										>
											<div className="flex flex-col">
												<button
													className="text-white flex justify-between items-center w-full"
													onClick={handleSignOut}
												>
													<span className="text-white">Sign Out</span>
													<IoIosLogIn />
												</button>
											</div>
										</motion.li>
									</ul>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</>
			)}
		</div>
	);
};

export default Header;
