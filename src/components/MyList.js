import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const MyList = () => {
	const myListMovies = useSelector((store) => store.movies.wishlist) || [];

	return (
		<div className="my-list flex flex-col min-h-screen overflow-hidden justify-between">
			<Header />
			<div>
				{myListMovies.length > 0 ? (
					<MovieList title="My List" movies={myListMovies} />
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
			<Footer />
		</div>
	);
};

export default MyList;
