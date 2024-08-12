import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const handleSignInClick = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div className="relative">
      <Header />
      <div>
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/b2c3e95b-b7b5-4bb7-a883-f4bfc7472fb7/19fc1a4c-82db-4481-ad08-3a1dffbb8c39/IN-en-20240805-POP_SIGNUP_TWO_WEEKS-perspective_WEB_24a485f6-1820-42be-9b60-1b066f1eb869_large.jpg"
          alt="Home background"
          className="w-screen h-screen object-cover"
        />
        <div className="absolute bg-black flex flex-col top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-white lg:px-16 lg:py-10 min-h-[650px] max-w-[450px] w-full">
          <h2 className="lg:text-5xl py-8">
            {isSignIn ? "Sign In" : "Sign Up"}
          </h2>
          <div className="flex flex-col gap-4">
            {!isSignIn && (
              <>
                <label for="full-name"></label>
                <input
                  id="full-name"
                  type="text"
                  placeholder="Full Name"
                  className="bg-black text-white pl-4 py-4 border border-gray"
                />
              </>
            )}
            <label for="email-id"></label>
            <input
              id="email-id"
              type="text"
              placeholder="Email"
              className="bg-black text-white pl-4 py-4 border border-gray"
            />
            <label for="password"></label>
            <input
              id="password"
              type="text"
              placeholder="Password"
              className="bg-black text-white pl-4 py-4 border border-gray"
            />
            {isSignIn ? (
              <button className="bg-red-600 py-4 hover:bg-red-700">
                Sign In
              </button>
            ) : (
              <button className="bg-red-600 py-4 hover:bg-red-700">
                Sign Up
              </button>
            )}

            <p className="cursor-pointer" onClick={handleSignInClick}>
              New to Netflix? {isSignIn ? "Sign up now" : "Sign In Now"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
