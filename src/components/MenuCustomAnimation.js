import {
	Menu,
	MenuHandler,
	MenuList,
	MenuItem,
	Button,
} from "@material-tailwind/react";
import { IoFilterOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { movieGenres } from "../utils/movieGeneres";

const MenuCustomAnimation = () => {
	const myListMovies = useSelector((store) => store.movies.wishlist);
	const myListMoviesGenreIds = myListMovies.map((movie) => movie.genre_ids);

	const flattenedGenreIds = myListMoviesGenreIds.flat();
	const uniqueGenreIdsSet = new Set(flattenedGenreIds);
	const uniqueGenreIds = Array.from(uniqueGenreIdsSet);

	return (
		<Menu
			animate={{
				mount: { y: 0 },
				unmount: { y: 25 },
			}}
			placement="top-end"
		>
			<MenuHandler>
				<Button className="capitalize text-xl font-normal">
					<div className="flex items-center gap-2">
						Filter
						<IoFilterOutline className="" />
					</div>
				</Button>
			</MenuHandler>
			<MenuList className="z-20 w-64 py-2 bg-black/80 focus:outline-none">
				{uniqueGenreIds.map((id) => (
					<MenuItem className="text-white hover:scale-150 pb-2">
						{movieGenres[id]}
					</MenuItem>
				))}
			</MenuList>
		</Menu>
	);
};

export default MenuCustomAnimation;
