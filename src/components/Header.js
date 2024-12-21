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
import { FiSearch, FiHome } from "react-icons/fi";
import { IoIosLogIn } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import MyAccount from "./MyAccount";

const Header = () => {
	const [showAccountMenu, setShowAccountMenu] = useState(false);
	const [timeOutId, setTimeOutId] = useState();

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
	const isSearchPage = location.pathname.includes("/search");

	const handleMenuOpen = () => {
		dispatch(toggleMobileMenu(!isMobileMenuOpen));
	};

	const handleGptSearchClick = (isLogo = false) => {
		if (isMobileMenuOpen) {
			dispatch(toggleMobileMenu(false));
		}
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

	const handleMouseEnter = () => {
		clearTimeout(timeOutId);
		setShowAccountMenu(true);
	};

	const handleMouseLeave = () => {
		const timeId = setTimeout(() => {
			setShowAccountMenu(false);
		}, 500);

		setTimeOutId(timeId);
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
				if (!isSingleMoviePage && !isSearchPage) {
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
			className={`header cursor-pointer flex items-center justify-between w-screen px-1 md:py-4 px-2 md:px-8 pr-0 fixed z-[2] text-white ${
				!isSearchPage ? "bg-black" : "bg-gradient-to-b from-black"
			} `}
		>
			<Link
				to="/"
				className="cursor-pointer"
				onClick={() => handleGptSearchClick(true)}
			>
				<img
					className="w-[100px] md:w-[120px] lg:w-[150px]"
					src={LOGO}
					alt="Netflix Logo"
				/>
			</Link>
			{user && (
				<>
					<div className="nav-desktop hidden md:flex items-center gap-4">
						{showGptSearch && (
							<select
								className="text-black rounded-[4px]"
								onChange={handleLanguageChange}
							>
								{SUPPORTED_LANGS.map((lang) => (
									<option key={lang.identifier} value={lang.identifier}>
										{lang.name}
									</option>
								))}
							</select>
						)}
						{!isSearchPage && (
							<Link to="/search">
								<button
									className="bg-red-700 text-white px-4 py-2 rounded-lg"
									onClick={() => handleGptSearchClick(false)}
								>
									GPT Search
								</button>
							</Link>
						)}

						<div
							className="flex gap-1 items-center cursor-pointer relative group"
							onMouseEnter={handleMouseEnter}
							onMouseLeave={handleMouseLeave}
						>
							<img
								src={user?.photoURL}
								className="w-8 rounded"
								alt="User Profile Image"
							/>
							<span className="caret border-solid border-t-white border-l-transparent border-r-transparent border-b-transparent border-t-[5px] border-l-[5px] border-r-[5px] h-0 w-0 transform transition-transform group-hover:rotate-180" />
							{showAccountMenu && (
								<MyAccount
									setShowAccountMenu={setShowAccountMenu}
									handleSignOut={handleSignOut}
								/>
							)}
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
									className="fixed left-0 right-0 top-[48px] py-8 bg-black h-full"
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
											{!isSearchPage && (
												<Link to="/search">
													<button
														className="text-white rounded-lg flex justify-between items-center w-full"
														onClick={() => handleGptSearchClick(false)}
													>
														<span className="text-white">GPT Search</span>
														<FiSearch />
													</button>
												</Link>
											)}
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
													<button className="text-white cursor-pointer">
														Sign Out
													</button>
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
