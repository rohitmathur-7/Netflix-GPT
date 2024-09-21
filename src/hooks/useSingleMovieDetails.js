import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addSingleMovie } from "../utils/movieSlice";

const useSingleMovieDetails = (movieId) => {
  const dispatch = useDispatch();

  const getSingleMovieDetails = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" + movieId,
      API_OPTIONS
    );

    const json = await data.json();
    dispatch(addSingleMovie(json));
  };

  useEffect(() => {
    getSingleMovieDetails();
  }, []);
};

export default useSingleMovieDetails;
