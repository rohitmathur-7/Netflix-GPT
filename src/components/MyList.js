import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import MovieList from "./MovieList";
import MenuCustomAnimation from "./MenuCustomAnimation";
import { useSelector } from "react-redux";
import { movieGenres } from "../utils/movieGeneres";

const MyList = () => {
	const [movieGenreId, setmovieGenreId] = useState(null);
	const myListMovies = useSelector((store) => store.movies.wishlist) || [];

	const genreFilteredMovies = myListMovies.filter((movie) =>
		movie.genre_ids.includes(movieGenreId)
	);

	const showMovies =
		genreFilteredMovies.length > 0 ? genreFilteredMovies : myListMovies;

	return (
		<div className="my-list flex flex-col min-h-screen overflow-hidden justify-between">
			<div>
				<Header />
				<div className="mt-8 px-4">
					<div className="flex items-center justify-between">
						<h2 className="text-2xl text-white">My List</h2>
						<div className>
							<MenuCustomAnimation
								genreName={movieGenres[movieGenreId]}
								setmovieGenreId={setmovieGenreId}
							/>
						</div>
					</div>
					{showMovies.length > 0 ? (
						<MovieList movies={showMovies} />
					) : (
						<div className="flex-1 flex flex-col items-center justify-center text-white">
							<h1 className="text-lg text-gray-400">
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
