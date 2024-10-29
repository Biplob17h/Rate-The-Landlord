/* eslint-disable no-unused-vars */
import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa"; // React Icons for social media
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-white py-4">
      <div className="container mx-auto flex flex-col items-center justify-between md:flex-row px-4">
        <p className="text-gray-600 text-sm text-center md:text-left">
          © 2024 Your Company Name. All Rights Reserved.
        </p>
        
        {/* Link Section */}
        <div className="flex flex-col items-center md:flex-row md:space-x-6 mt-2 md:mt-0">
          <Link to="/terms" className="text-gray-600 hover:underline text-sm">
            Terms and Conditions
          </Link>
          <Link to="/privacy" className="text-gray-600 hover:underline text-sm">
            Privacy Policy
          </Link>
        </div>
        
        {/* Social Icons Section */}
        <div className="flex justify-center space-x-4 mt-4 md:mt-0">
          <a href="https://www.instagram.com/ratethelandlord" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Instagram</span>
            <FaInstagram size={20} />
          </a>
          <a href="https://twitter.com/r8thelandlord" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Twitter</span>
            <FaTwitter size={20} />
          </a>
          <a href="https://www.tiktok.com/@ratethelandlord" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">TikTok</span>
            <FaFacebook size={20} />
          </a>
          <a href="https://www.facebook.com/profile.php?id=61552287725656" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Facebook</span>
            <FaFacebook size={20} />
          </a>
          <a href="https://patreon.com/RateTheLandlord" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Patreon</span>
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512" fill="currentColor">
              <path d="M489.7 153.8c-.1-65.4-51-119-110.7-138.3C304.8-8.5 207-5 136.1 28.4C50.3 68.9 23.3 157.7 22.3 246.2C21.5 319 28.7 510.6 136.9 512c80.3 1 92.3-102.5 129.5-152.3c26.4-35.5 60.5-45.5 102.4-55.9c72-17.8 121.1-74.7 121-150z"></path>
            </svg>
          </a>
          <a href="https://github.com/RateTheLandlord" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Github</span>
            <FaGithub size={20} />
          </a>
        </div>
      </div>
      <div className="flex justify-center items-center p-4 text-sm text-gray-600 mt-4 md:mt-0">
        © 2024 Made By{" "}
        <a className="ml-1 underline" href="https://pixelwebmakers.com/">
          Pixel Web Makers
        </a>
      </div>
    </div>
  );
};

export default Footer;
