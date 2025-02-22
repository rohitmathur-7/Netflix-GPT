import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import MovieList from "./MovieList";
import MenuCustomAnimation from "./MenuCustomAnimation";
import { useSelector } from "react-redux";

const MyList = () => {
	const myListMovies = useSelector((store) => store.movies.wishlist) || [];

	return (
		<div className="my-list flex flex-col min-h-screen overflow-hidden justify-between">
			<div>
				<Header />
				<div className="mt-8">
					<div className="flex items-center justify-between px-8">
						<h2 className="text-2xl text-white">My List</h2>
						<div>
							<MenuCustomAnimation />
						</div>
					</div>
					{myListMovies.length > 0 ? (
						<MovieList movies={myListMovies} />
					) : (
						<div className="flex-1 flex flex-col items-center justify-center text-white">
							<h1
								className="t
					ext-lg text-gray-400"
							>
								You haven't added any movies to your list
							</h1>
						</div>
					)}
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default MyList;
