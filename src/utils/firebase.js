// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { FIREBASE_API } from "./constants";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: FIREBASE_API,
	authDomain: "netflix-gpt-55490.firebaseapp.com",
	projectId: "netflix-gpt-55490",
	storageBucket: "netflix-gpt-55490.appspot.com",
	messagingSenderId: "960652200122",
	appId: "1:960652200122:web:8bf7c73bc708a016eb5a83",
	measurementId: "G-VBYDYHSN8C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analyticss = getAnalytics(app);

export const auth = getAuth();
