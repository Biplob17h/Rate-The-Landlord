/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaTwitter,
  FaFacebook,
  FaPinterest,
  FaTiktok,
} from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="py-3 bg-white shadow-md">
      {/* Section for Big Devices */}
      <section className="container flex items-center justify-between px-3 md:mx-auto">
        {/* Left Side: Logo and Brand */}
        <div className="flex items-center">
          <Link to="/" className="text-[16px] md:text-xl font-bold text-black">
            RottenHOAs—HOA Reviews & Reputation
          </Link>
        </div>

        {/* Center: Links (Hidden on Mobile) */}
        <div className="hidden space-x-6 md:flex">
          <Link to="/reviews" className="text-base text-gray-600 hover:text-black">
            Reviews
          </Link>
          <Link to="/resources" className="text-base text-gray-600 hover:text-black">
            Resources
          </Link>
          <Link to="/about" className="text-base text-gray-600 hover:text-black">
            About
          </Link>
          <Link to="/support" className="text-base text-gray-600 hover:text-black">
            Support Us
          </Link>
        </div>

        {/* Right Side: Social Icons and Submit Button (Hidden on Mobile) */}
        <div className="items-center hidden space-x-4 md:flex">
          <div className="flex space-x-3 text-gray-600">
            <FaInstagram className="w-5 h-5 cursor-pointer hover:text-black" />
            <FaTwitter className="w-5 h-5 cursor-pointer hover:text-black" />
            <FaFacebook className="w-5 h-5 cursor-pointer hover:text-black" />
            <FaTiktok className="w-5 h-5 cursor-pointer hover:text-black" />
            <FaPinterest className="w-5 h-5 cursor-pointer hover:text-black" />
          </div>

          <Link to="/submit">
            <button className="bg-[#d6cc32] text-white px-4 py-2 rounded-lg text-base font-semibold hover:bg-[#c5bb2e] hidden md:block">
              Submit a Review
            </button>
          </Link>
        </div>

        {/* Mobile Menu Toggle Icon */}
        <div className="flex items-center md:hidden">
          <button onClick={toggleMenu} className="text-2xl text-gray-700">
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </section>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <section className="px-3 py-4 bg-white shadow-lg md:hidden">
          <Link
            to="/reviews"
            className="block mb-2 text-base text-gray-600 hover:text-black"
            onClick={toggleMenu}
          >
            Reviews
          </Link>
          <Link
            to="/resources"
            className="block mb-2 text-base text-gray-600 hover:text-black"
            onClick={toggleMenu}
          >
            Resources
          </Link>
          <Link
            to="/about"
            className="block mb-2 text-base text-gray-600 hover:text-black"
            onClick={toggleMenu}
          >
            About
          </Link>
          <Link
            to="/support"
            className="block mb-2 text-base text-gray-600 hover:text-black"
            onClick={toggleMenu}
          >
            Support Us
          </Link>
          <div className="flex justify-center mt-4 space-x-3 text-gray-600">
            <FaInstagram className="w-5 h-5 cursor-pointer hover:text-black" />
            <FaTwitter className="w-5 h-5 cursor-pointer hover:text-black" />
            <FaFacebook className="w-5 h-5 cursor-pointer hover:text-black" />
            <FaTiktok className="w-5 h-5 cursor-pointer hover:text-black" />
            <FaPinterest className="w-5 h-5 cursor-pointer hover:text-black" />
          </div>
        </section>
      )}
    </nav>
  );
};

export default Navbar;
