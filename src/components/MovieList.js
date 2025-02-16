import React, { useRef, useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MovieList = ({ title, movies, isGptMovies, lastList = false }) => {
	const safeMovies = Array.isArray(movies)
		? movies.filter((movie) => movie.backdrop_path)
		: [];
	const [isHovered, setIsHovered] = useState(false);
	const [isHoveredMovieList, setIsHoveredMovieList] = useState(false);
	const shouldShowArrows = safeMovies.length > 5;
	const shouldEnableInfinite = safeMovies.length > 5;

	const settings = {
		dots: false,
		infinite: shouldEnableInfinite,
		speed: 500,
		slidesToShow: 5,
		slidesToScroll: 5,
		arrows:
			shouldShowArrows && (window.innerWidth <= 1024 || isHoveredMovieList),
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					arrows: 3,
					infinite: 3,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					arrows: 2,
					infinite: 2,
				},
			},
		],
	};

	return (
		<div
			className="movie-list relative z-[5]"
			style={{ zIndex: isHovered ? 10 : 5, position: "relative" }}
		>
			<h1 className="text-2xl pb-4 text-white pl-4">{title}</h1>
			<div
				className="relative"
				onMouseEnter={() => setIsHoveredMovieList(true)}
				onMouseLeave={() => setIsHoveredMovieList(false)}
			>
				<Slider {...settings}>
					{safeMovies?.map((movie, idx) => (
						<Link to={"/movie/" + movie.id} key={idx}>
							<MovieCard
								movie={movie}
								key={idx}
								posterPath={movie.backdrop_path}
								isGptMovies={isGptMovies}
								firstMovie={idx === 0 || idx % 5 === 0 ? 1 : 0}
								lastMovie={(idx + 1) % 5 === 0 ? 1 : 0}
								lastList={lastList}
								onHoverChange={setIsHovered} // Pass the function to change z-index
							/>
						</Link>
					))}
				</Slider>
			</div>
		</div>
	);
};

export default MovieList;
