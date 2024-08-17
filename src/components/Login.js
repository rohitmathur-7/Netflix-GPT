import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkDataValidation } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [authError, setAuthError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userName = useRef(null);
  const userEmail = useRef(null);
  const userPassword = useRef(null);

  const handleSignInClick = () => {
    setIsSignIn(!isSignIn);
  };

  const handleFormSubmission = (e) => {
    const errors = checkDataValidation(
      userEmail.current.value,
      userPassword.current.value
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
            photoURL:
              "https://cdn-imgix.headout.com/media/images/c9db3cea62133b6a6bb70597326b4a34-388-dubai-img-worlds-of-adventure-tickets-01.jpg",
          })
            .then(() => {
              // Profile updated!
              // ...
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              navigate("/browse");
            })
            .catch((error) => {
              // An error occurred
              // ...
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
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          if ("auth/invalid-credential" == errorCode) {
            setAuthError("Invalid Login Credentials. Please try again");
          } else {
            setAuthError(errorCode + "-" + errorMessage);
          }
        });
    }
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
        <form
          className="absolute bg-black flex flex-col top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-white lg:px-16 lg:py-10 min-h-[650px] max-w-[450px] w-full"
          onSubmit={(e) => e.preventDefault()}
        >
          <h2 className="lg:text-5xl py-8">
            {isSignIn ? "Sign In" : "Sign Up"}
          </h2>
          <div className="flex flex-col gap-4">
            {!isSignIn && (
              <>
                <label htmlFor="full-name"></label>
                <input
                  id="full-name"
                  type="text"
                  placeholder="Full Name"
                  className="bg-black text-white pl-4 py-4 border border-gray"
                  ref={userName}
                />
              </>
            )}
            <label htmlFor="email-id"></label>
            <input
              id="email-id"
              type="text"
              placeholder="Email"
              className="bg-black text-white pl-4 py-4 border border-gray"
              ref={userEmail}
            />
            <span className="email-error form-error">{emailError}</span>
            <label htmlFor="password"></label>
            <input
              id="password"
              type="text"
              placeholder="Password"
              className="bg-black text-white pl-4 py-4 border border-gray"
              ref={userPassword}
            />
            <span className="password-error form-error">{passwordError}</span>
            <span className="auth-error form-error">{authError}</span>

            <button
              className="bg-red-600 py-4 hover:bg-red-700"
              onClick={handleFormSubmission}
            >
              {isSignIn ? "Sign In" : "Sign Up"}
            </button>

            <p className="cursor-pointer" onClick={(e) => handleSignInClick(e)}>
              New to Netflix? {isSignIn ? "Sign up now" : "Sign In Now"}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
