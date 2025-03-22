import React from "react";
import { useNavigate, Link } from "react-router-dom";
import facebookLogo from "../assets/images/facebook.svg";
import instagramLogo from "../assets/images/svgexport-15.svg";
import twitterLogo from "../assets/images/svgexport-16.svg";
import youtubeLogo from "../assets/images/svgexport-17.svg";

const Footer = () => {
	return (
		<div className="footer text-[#808080] bg-black relative z-[1]">
			<div className="flex flex-col gap-4 max-w-[980px] m-auto">
				<div className="social-links flex gap-8 opacity-100">
					<a href="https://www.facebook.com/">
						<img src={facebookLogo} />
					</a>
					<a href="https://www.instagram.com/">
						<img src={instagramLogo} />
					</a>
					<a href="https://x.com/">
						<img src={twitterLogo} />
					</a>
					<a href="https://www.youtube.com/">
						<img src={youtubeLogo} />
					</a>
				</div>
				<p>Questions? Call 000-800-919-1743</p>
				<div>
					<ul className="flex flex-wrap justify-between">
						<li>
							<Link to="/my-list">My List</Link>
						</li>
						<li>
							<Link to="/search">GPT Search</Link>
						</li>
						<li>
							<Link to="#">Terms of use</Link>
						</li>
						<li>
							<Link to="#">Privacy</Link>
						</li>
					</ul>
				</div>
				<p className="text-[11px]">
					&copy; 2001 - {new Date().getFullYear()} Netflix GPT, Inc
				</p>
			</div>
		</div>
	);
};

export default Footer;
