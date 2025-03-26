import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import Header from "./Header";
import Footer from "./Footer";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import { useSelector } from "react-redux";

const Browse = () => {
	useNowPlayingMovies();
	usePopularMovies();

	return (
		<div className="flex justify-betwee flex-col">
			<Header />
			<div className="px-4 overflow-hidden">
				<MainContainer />
				<SecondaryContainer />
			</div>
			<Footer />
		</div>
	);
};

export default Browse;
