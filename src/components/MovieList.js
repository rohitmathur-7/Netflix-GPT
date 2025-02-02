import React, { useRef, useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";
const MovieList = ({ title, movies, isGptMovies, lastList = false }) => {
	const safeMovies = Array.isArray(movies) ? movies : [];
	const duplicatedMovies = [...safeMovies, ...safeMovies]; // Two sets are enough for viewport-width scrolling

	const scrollContainerRef = useRef(null);
	const [scrollOffset, setScrollOffset] = useState(0);
	const [containerOffsetLeft, setContainerOffsetLeft] = useState(0);
	const [showPrevButton, setShowPrevButton] = useState(false);
	const [showNextButton, setShowNextButton] = useState(true);

	const handleScroll = () => {
		if (scrollContainerRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } =
				scrollContainerRef.current;
			setScrollOffset(scrollLeft);

			// Show/hide navigation buttons
			setShowPrevButton((prevState) => {
				if (!prevState) {
					return scrollLeft > 0;
				}
				return prevState;
			});
			setShowNextButton(scrollLeft < scrollWidth - clientWidth - 10);

			// When reaching the end of the duplicated set, reset to the original set
			if (scrollLeft >= scrollWidth - clientWidth - 10) {
				scrollContainerRef.current.scrollLeft = 0;
			}
			// When reaching the start and going backwards, jump to the duplicated set
			else if (scrollLeft <= 0) {
				scrollContainerRef.current.scrollLeft = scrollWidth / 2;
			}
		}
	};

	const scrollToNext = () => {
		if (scrollContainerRef.current) {
			const { scrollLeft, clientWidth } = scrollContainerRef.current;
			scrollContainerRef.current.scrollTo({
				left: scrollLeft + clientWidth,
				behavior: "smooth",
			});
		}
	};

	const scrollToPrev = () => {
		if (scrollContainerRef.current) {
			const { scrollLeft, clientWidth } = scrollContainerRef.current;

			scrollContainerRef.current.scrollTo({
				left: scrollLeft - clientWidth,
				behavior: "smooth",
			});
		}
	};

	useEffect(() => {
		if (scrollContainerRef.current) {
			setContainerOffsetLeft(
				scrollContainerRef.current.getBoundingClientRect().left
			);
			// Start from the beginning of the first set
			scrollContainerRef.current.scrollLeft = 0;

			// Add scroll event listener
			const container = scrollContainerRef.current;
			container.addEventListener("scroll", handleScroll);
			return () => container.removeEventListener("scroll", handleScroll);
		}
	}, []);

	console.log(scrollContainerRef.current?.clientWidth);

	return (
		<div className="movie-list relative">
			<h1 className="text-2xl pb-4 text-white">{title}</h1>
			<div className="relative">
				{showPrevButton && (
					<button
						className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
						onClick={scrollToPrev}
					>
						&lt;
					</button>
				)}
				<div
					className="flex overflow-x-auto no-scrollbar"
					ref={scrollContainerRef}
				>
					<div className="flex gap-4">
						{duplicatedMovies?.map((movie, idx) => (
							<Link to={"/movie/" + movie.id} key={idx}>
								<MovieCard
									movie={movie}
									key={idx}
									posterPath={movie.poster_path}
									isGptMovies={isGptMovies}
									scrollOffset={scrollOffset}
									containerOffsetLeft={containerOffsetLeft}
									firstMovie={idx === 0 ? 1 : 0}
									lastMovie={idx === duplicatedMovies.length - 1 ? 1 : 0}
									lastList={lastList}
									cardWidth={
										Math.floor(
											(scrollContainerRef.current?.clientWidth - 80) / 5
										) || 0
									}
								/>
							</Link>
						))}
					</div>
				</div>
				{showNextButton && (
					<button
						className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
						onClick={scrollToNext}
					>
						&gt;
					</button>
				)}
			</div>
		</div>
	);
};

export default MovieList;
