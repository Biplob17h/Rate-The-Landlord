/* eslint-disable no-unused-vars */
import React from "react";
import { RouterProvider } from "react-router-dom";
import routes from "./Routes/Routes";

const App = () => {
  return (
    <div className="text-black">
      <RouterProvider router={routes} />
    </div>
  );
};

export default App;
