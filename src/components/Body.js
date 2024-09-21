import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Browse from "./Browse";
import Login from "./Login";
import SingleMovie from "./SingleMovie";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/movie/:movieId", // Dynamic route for single movie based on title
    element: <SingleMovie />,
  },
]);

const Body = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default Body;
