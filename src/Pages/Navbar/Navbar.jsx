/* eslint-disable no-unused-vars */
import React from "react";
import icon from "../../assets/icon.jpeg"; // Ensure the path is correct
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaTwitter,
  FaFacebook,
  FaPinterest,
  FaTiktok,
} from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-3">
      {" "}
      {/* Slightly reduced padding */}
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Side: Logo and Brand */}
        <div className="flex items-center">
          {/* Navbar Icon */}
          <Link to={"/"} className="text-xl font-bold text-black">
            Rate The Landlord
          </Link>
        </div>

        {/* Center: Links */}
        <div className="hidden md:flex space-x-6">
          <Link
            to={"/reviews"}
            className="text-base text-gray-600 hover:text-black"
          >
            Reviews
          </Link>
          <Link
            to={"/resources"}
            className="text-base text-gray-600 hover:text-black"
          >
            Resources
          </Link>
          <Link
            to={"/about"}
            className="text-base text-gray-600 hover:text-black"
          >
            About
          </Link>
          <Link
            to={"/support"}
            className="text-base text-gray-600 hover:text-black"
          >
            Support Us
          </Link>
        </div>

        {/* Right Side: Social Icons and Submit Button */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex space-x-3 text-gray-600">
            <FaInstagram className="cursor-pointer w-5 h-5 hover:text-black" />
            <FaTwitter className="cursor-pointer w-5 h-5 hover:text-black" />
            <FaFacebook className="cursor-pointer w-5 h-5 hover:text-black" />
            <FaTiktok className="cursor-pointer w-5 h-5 hover:text-black" />
            <FaPinterest className="cursor-pointer w-5 h-5 hover:text-black" />
          </div>

          {/* Submit Button */}
          <Link to={"/submit"}>
            <button className="bg-teal-500 text-white px-4 py-2 rounded-lg text-base font-semibold hover:bg-teal-600">
              Submit a Review
            </button>
          </Link>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button>
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
