import React from "react";
import Header from "./Header";

const NotFound = () => {
	return (
		<div>
			<Header />
			<div className="px-8">
				<h1 className="text-white text-2xl">Oops Page Not Found</h1>
				<a href="/broswe" className="text-red-600  text-xl">
					Browse Movies
				</a>
			</div>
		</div>
	);
};

export default NotFound;
