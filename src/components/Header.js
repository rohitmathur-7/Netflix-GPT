import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { toggleMobileMenu } from "../utils/configSlice";
import { Link } from "react-router-dom";
import { Squash as Hamburger } from "hamburger-react";
import { FiSearch } from "react-icons/fi";
import { PiListStarDuotone } from "react-icons/pi";
import { IoIosLogIn } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import MyAccount from "./MyAccount";
import { SlStar } from "react-icons/sl";

const Header = () => {
	const [showAccountMenu, setShowAccountMenu] = useState(false);
	const [timeOutId, setTimeOutId] = useState();

	const location = useLocation();
	const navigate = useNavigate();

	const user = useSelector((store) => store.user);
	const isMobileMenuOpen = useSelector(
		(store) => store.config.isMobileMenuOpen
	);

	const dispatch = useDispatch();

	const isBrowsePage = location.pathname === "/browse";
	const isSingleMoviePage = /^\/movie\/[^/]+$/.test(location.pathname);
	const isSearchPage = location.pathname === "/search";
	const isMyListPage = location.pathname === "/my-list";
	const isLoginPage = !isBrowsePage && !isSingleMoviePage && !isSearchPage;

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

	const handleMouseEnter = () => {
		clearTimeout(timeOutId);
		setShowAccountMenu(true);
	};

	const handleMouseLeave = () => {
		const timeId = setTimeout(() => {
			setShowAccountMenu(false);
		}, 200);

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
				if (
					!isBrowsePage &&
					!isSingleMoviePage &&
					!isSearchPage &&
					!isMyListPage
				) {
					console.log("Here");
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
			className={`header cursor-pointer flex items-center justify-between w-screen md:py-4 px-2 md:px-8 md:pl-[18px] pr-0 ${
				!isLoginPage && "fixed"
			} z-[2] text-white ${
				isBrowsePage || isSingleMoviePage || isMobileMenuOpen
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
					className="w-[100px] md:w-[120px] lg:w-[150px]"
					src={LOGO}
					alt="Netflix Logo"
				/>
			</Link>
			{user && (
				<>
					<div className="nav-desktop hidden md:flex items-center gap-8">
						<Link to="/my-list" className="cursor-pointer">
							<button
								className="group relative text-white rounded-lg flex items-center justify-between gap-2 cursor-pointer"
								onClick={() => handleGptSearchClick(false)}
							>
								My List
								<SlStar />
								<span class="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-white group-hover:w-full"></span>
							</button>
						</Link>

						{!isSearchPage && (
							<Link to="/search" className="cursor-pointer">
								<button
									className="group relative text-white rounded-lg flex items-center justify-between gap-2 cursor-pointer"
									onClick={() => handleGptSearchClick(false)}
								>
									GPT Search
									<span class="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-white group-hover:w-full"></span>
									<FiSearch />
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
							<AnimatePresence>
								{showAccountMenu && (
									<MyAccount
										setShowAccountMenu={setShowAccountMenu}
										handleSignOut={handleSignOut}
									/>
								)}
							</AnimatePresence>
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
									className="fixed left-0 right-0 top-[48px] py-8 bg-black h-full z-10"
								>
									<ul className="flex flex-col px-4 gap-6">
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
											<Link to="/my-list">
												<button
													className="text-white w-full rounded-lg flex items-center justify-between gap-2 cursor-pointer"
													onClick={() => handleGptSearchClick(false)}
												>
													My List
													<PiListStarDuotone />
												</button>
											</Link>
										</motion.li>
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
