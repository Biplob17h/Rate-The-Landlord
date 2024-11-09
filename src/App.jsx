/* eslint-disable no-unused-vars */
import React from "react";
import { RouterProvider } from "react-router-dom";
import routes from "./Routes/Routes";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="text-black overflow-scroll">
      <RouterProvider router={routes} />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default App;
