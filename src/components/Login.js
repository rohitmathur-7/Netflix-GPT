import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkDataValidation } from "../utils/validate";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { PROFILE_IMG, HOME_BG } from "../utils/constants";

const Login = () => {
	const [isSignIn, setIsSignIn] = useState(true);
	const [emailError, setEmailError] = useState(null);
	const [passwordError, setPasswordError] = useState(null);
	const [authError, setAuthError] = useState(null);

	const dispatch = useDispatch();

	const userName = useRef(null);
	const userEmail = useRef(null);
	const userPassword = useRef(null);

	const handleSignInClick = () => {
		setEmailError("");
		setPasswordError("");

		setIsSignIn(!isSignIn);
	};

	const handleFormSubmission = (e) => {
		const errors = checkDataValidation(
			userEmail.current.value,
			userPassword.current.value,
			isSignIn
		);
		setEmailError(errors[0]);
		setPasswordError(errors[1]);

		if (null !== errors[0] || null !== errors[1]) return;

		if (!isSignIn) {
			// Sign Up Logic
			createUserWithEmailAndPassword(
				auth,
				userEmail.current.value,
				userPassword.current.value
			)
				.then((userCredential) => {
					// Signed up
					const user = userCredential.user;

					updateProfile(user, {
						displayName: userName.current.value,
						photoURL: PROFILE_IMG,
					})
						.then(() => {
							// Profile updated!
							const { uid, email, displayName, photoURL } = auth.currentUser;
							dispatch(
								addUser({
									uid: uid,
									email: email,
									displayName: displayName,
									photoURL: photoURL,
								})
							);
						})
						.catch((error) => {
							// An error occurred
							setAuthError(error.message);
						});
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;

					setAuthError(errorCode + "-" + errorMessage);
				});
		} else {
			// Sign In Logic
			signInWithEmailAndPassword(
				auth,
				userEmail.current.value,
				userPassword.current.value
			)
				.then(() => {
					// Signed in
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;

					if ("auth/invalid-credential" === errorCode) {
						setAuthError("Invalid Login Credentials. Please try again");
					} else {
						setAuthError(errorCode + "-" + errorMessage);
					}
				});
		}
	};

	return (
		<div className="login-page relative w-full h-full flex flex-col">
			<Header />
			<div className="flex justify-center items-center grow">
				<img
					src={HOME_BG}
					alt="Home background"
					className="absolute top-0 w-screen h-screen object-cover opacity-50"
				/>
				<form
					className="bg-black/70 flex flex-col text-white px-6 py-8 lg:px-16 max-w-[300px] lg:max-w-[450px] w-full relative z-0 rounded-[4px]"
					onSubmit={(e) => e.preventDefault()}
				>
					<h2 className="text-2xl lg:text-5xl pb-8">
						{isSignIn ? "Sign In" : "Sign Up"}
					</h2>
					{!isSignIn && passwordError && (
						<div className="invalid-password-error bg-[#D89D31] text-black rounded-[4px] px-8 py-4">
							<p className="font-bold">Invalid Password</p>
							<p className="font-medium">
								Your password must contain atleast 8 characters and:
							</p>
							<ul className="list-disc">
								<li>Contain at least one digit</li>
								<li>Contain at least one lowercase letter</li>
								<li>Contain at least one uppercase letter</li>
							</ul>
						</div>
					)}
					<div className="flex flex-col gap-4">
						{!isSignIn && (
							<>
								<label htmlFor="full-name"></label>
								<input
									id="full-name"
									type="text"
									placeholder="Full Name"
									className="bg-black text-white pl-2 lg:pl-4 py-2 lg:py-4 border border-gray"
									ref={userName}
								/>
							</>
						)}
						<label htmlFor="email-id" className="sr-only">
							Email
						</label>
						<input
							id="email-id"
							type="text"
							placeholder="Email"
							className="bg-black text-white pl-2 lg:pl-4 py-2 lg:py-4 border border-gray"
							ref={userEmail}
						/>
						{emailError && (
							<span className="email-error form-error relative pl-[1.3rem]">
								{emailError}
							</span>
						)}
						<label htmlFor="password" className="sr-only">
							Password
						</label>
						<input
							id="password"
							type="text"
							placeholder="Password"
							className="bg-black text-white pl-2 lg:pl-4 py-2 lg:py-4 border border-gray"
							ref={userPassword}
						/>
						{passwordError && (
							<span className="password-error form-error">{passwordError}</span>
						)}
						{authError && (
							<span className="auth-error form-error">{authError}</span>
						)}

						<button
							className="bg-red-600 py-4 hover:bg-red-700"
							onClick={handleFormSubmission}
						>
							{isSignIn ? "Sign In" : "Sign Up"}
						</button>
						{isSignIn ? (
							<p className="text-white/70">
								New to Netflix?&nbsp;
								<span
									className="cursor-pointer font-bold text-white"
									onClick={(e) => handleSignInClick(e)}
								>
									Sign up now
								</span>
							</p>
						) : (
							<p className="text-white/70">
								Already Have an account?&nbsp;
								<span
									className="cursor-pointer font-bold text-white"
									onClick={(e) => handleSignInClick(e)}
								>
									Sign in now
								</span>
							</p>
						)}
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
