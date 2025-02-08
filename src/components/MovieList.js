import React, { useRef, useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MovieList = ({ title, movies, isGptMovies, lastList = false }) => {
	const safeMovies = Array.isArray(movies) ? movies : [];
	const duplicatedMovies = [...safeMovies, ...safeMovies]; // Two sets are enough for viewport-width scrolling
	const [isHovered, setIsHovered] = useState(false);

	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 5,
		slidesToScroll: 5,
	};

	return (
		<div
			className="movie-list relative z-[5]"
			style={{ zIndex: isHovered ? 10 : 5, position: "relative" }}
		>
			<h1 className="text-2xl pb-4 text-white">{title}</h1>
			<div className="relative">
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
