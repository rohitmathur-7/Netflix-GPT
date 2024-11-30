import React from "react";
import user from "../assets/images/user.jpg";
import { useSelector } from "react-redux";

const MyAccount = ({ showAccountMenu, setShowAccountMenu, handleSignOut }) => {
	const userName = useSelector((store) => store.user.displayName);

	return (
		<div className="user-details-container absolute flex flex-col justify-center py-4 opacity-90 gap-4 w-[120px] top-[50px] right-0 bg-black">
			<div className="user-details flex items-center justify-center gap-2">
				<img className="w-8 rounded" src={user} />
				<span>{userName}</span>
			</div>
			<button
				className="whitespace-nowrap underline cursor-pointer"
				onClick={handleSignOut}
			>
				Sign Out
			</button>{" "}
		</div>
	);
};

export default MyAccount;
