/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "../Pages/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Pages/Footer/Footer";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
