import React, { useRef, useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";

const MovieList = ({ title, movies, isGptMovies }) => {
	const scrollContainerRef = useRef(null);
	const [scrollOffset, setScrollOffset] = useState(0);
	const [containerOffsetLeft, setContainerOffsetLeft] = useState(0);

	const handleScroll = () => {
		// Update the current scroll offset
		if (scrollContainerRef.current) {
			setScrollOffset(scrollContainerRef.current.scrollLeft);
		}
	};

	useEffect(() => {
		// Get the container's offsetLeft on mount
		if (scrollContainerRef.current) {
			setContainerOffsetLeft(
				scrollContainerRef.current.getBoundingClientRect().left
			);
		}
	}, []);

	return (
		<div className="movie-list p-4 relative">
			<h1 className="text-2xl pb-4 text-white">{title}</h1>
			<div
				className="flex overflow-x-auto no-scrollbar"
				ref={scrollContainerRef}
				onScroll={handleScroll}
			>
				<div className="flex gap-4">
					{movies?.map((movie, idx) => (
						<Link to={"/movie/" + movie.id} key={movie.id}>
							<MovieCard
								movie={movie}
								key={movie.id}
								posterPath={movie.poster_path}
								isGptMovies={isGptMovies}
								scrollOffset={scrollOffset} // Pass scroll offset
								containerOffsetLeft={containerOffsetLeft} // Pass container offset
								firstMovie={idx === 0 ? 1 : 0}
								lastMovie={idx === movies.length - 1 ? 1 : 0}
							/>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export default MovieList;
