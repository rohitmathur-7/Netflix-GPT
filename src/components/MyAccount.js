import React, { useState } from "react";
import user from "../assets/images/user.jpg";
import { useSelector } from "react-redux";

const MyAccount = ({ showAccountMenu, setShowAccountMenu, handleSignOut }) => {
	const [showUnderline, setShowUnderline] = useState(false);
	const userName = useSelector((store) => store.user.displayName);

	return (
		<div className="user-details-container absolute flex flex-col justify-center items-center pt-4 opacity-100 gap-4 min-w-[150px] top-[50px] right-0 bg-black z-[10]">
			<div className="user-details flex flex-wrap items-center justify-center gap-2 px-4">
				<img className="w-8 rounded" src={user} alt="User Profile Image" />
				<span>{userName}</span>
			</div>
			<div className="w-full flex items-center justify-center border-t-[1px] py-4">
				<button
					className="relative whitespace-nowrap cursor-pointer w-fit"
					onClick={handleSignOut}
					onMouseEnter={() => setShowUnderline(true)}
					onMouseLeave={() => setShowUnderline(false)}
				>
					Sign Out
					<span
						className={`absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-100 ${
							showUnderline ? "w-full" : "w-0"
						}`}
					></span>
				</button>
			</div>
		</div>
	);
};

export default MyAccount;
