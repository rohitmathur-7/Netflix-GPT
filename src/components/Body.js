import {
	createBrowserRouter,
	RouterProvider,
	ScrollRestoration,
} from "react-router-dom";
import Browse from "./Browse";
import Login from "./Login";
import SingleMovie from "./SingleMovie";
import GptSearch from "./GptSearch";
import { useSelector } from "react-redux";
import MyList from "./MyList";
import TermsOfUse from "./TermsOfUse";
import Policy from "./Policy";
import NotFound from "./404";

// Create a layout component that includes ScrollRestoration
const Layout = ({ children }) => {
	return (
		<>
			{children}
			<ScrollRestoration />
		</>
	);
};

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<Layout>
				<Login />
			</Layout>
		),
	},
	{
		path: "/browse",
		element: (
			<Layout>
				<Browse />
			</Layout>
		),
	},
	{
		path: "/movie/:movieId", // Dynamic route for single movie based on title
		element: (
			<Layout>
				<SingleMovie />
			</Layout>
		),
	},
	{
		path: "/search", // Dynamic route for single movie based on title
		element: (
			<Layout>
				<GptSearch />
			</Layout>
		),
	},
	{
		path: "/my-list",
		element: (
			<Layout>
				<MyList />
			</Layout>
		),
	},
	{
		path: "/terms-of-use",
		element: (
			<Layout>
				<TermsOfUse />
			</Layout>
		),
	},
	{
		path: "/policy",
		element: (
			<Layout>
				<Policy />
			</Layout>
		),
	},
	{
		path: "*",
		element: (
			<Layout>
				<NotFound />
			</Layout>
		),
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
