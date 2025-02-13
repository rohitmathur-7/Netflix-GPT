import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Browse from "./Browse";
import Login from "./Login";
import SingleMovie from "./SingleMovie";
import GptSearch from "./GptSearch";
import { useSelector } from "react-redux";
import MyList from "./MyList";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Login />,
	},
	{
		path: "/browse",
		element: <Browse />,
	},
	{
		path: "/movie/:movieId", // Dynamic route for single movie based on title
		element: <SingleMovie />,
	},
	{
		path: "/search", // Dynamic route for single movie based on title
		element: <GptSearch />,
	},
	{
		path: "/my-list",
		element: <MyList />,
	},
]);

const Body = () => {
	const isMobileMenuOpen = useSelector(
		(store) => store.config.isMobileMenuOpen
	);

	return (
		<div
			className={`body w-full h-full ${isMobileMenuOpen && "overflow-hidden"} `}
		>
			<RouterProvider router={router} />
		</div>
	);
};

export default Body;
