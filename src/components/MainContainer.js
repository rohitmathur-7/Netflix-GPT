import React from "react";
import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {
	const movies = useSelector((store) => store.movies?.nowPlayingMovies);

	if (!movies) return;

	const mainMovie = movies[0];

	const { title, overview, id } = mainMovie;

	return (
		<div className="main-container bg-gradient-to-r from-black relative">
			<VideoTitle title={title} overview={overview} />
			<VideoBackground movieId={id} />
		</div>
	);
};

export default MainContainer;
