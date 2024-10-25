/* eslint-disable no-unused-vars */
import React from "react";
import img from "../../../assets/friends.webp";

const Banner = () => {
  return (
    <section className="flex justify-center items-center min-h-screen bg-white">
      {/* Card container */}
      <div className=" shadow-lg  p-10 w-[95%] max-w-7xl mt-5 bg-[#f3f4f6] rounded-[15px]">
        {/* Parent div for design */}
        <div className="flex justify-between items-center">
          {/* Left side: Headline and buttons */}
          <div className="w-1/2 space-y-6">
            <h1 className="text-6xl font-[800] text-teal-600 leading-tight">
              Share information with tenants like you.
            </h1>
            <p className="text-lg text-gray-600">
              We are a community platform that elevates tenant voices to promote
              landlord accountability.
            </p>
            <div className="flex space-x-4">
              <button className="px-6 py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700">
                Submit a Review
              </button>
              <button className="px-6 py-3 border-2 border-teal-600 text-teal-600 rounded-md hover:bg-gray-100">
                Read Reviews
              </button>
            </div>
          </div>

          {/* Right side: Full-width Image masked inside a house shape */}
          <div className="w-1/2 flex justify-end">
            <div className="relative w-full h-[500px]"> {/* Increased width and height */}
              {/* SVG mask for house shape */}
              <svg
                viewBox="0 0 1024 1024"
                className="absolute inset-0 w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <clipPath id="clip-house">
                    <path d="M512 74L74 464h144v486h220V688h148v262h220V464h144L512 74z" />
                  </clipPath>
                </defs>
                <image
                  href={img}
                  className="object-cover"
                  width="100%"
                  height="100%"
                  clipPath="url(#clip-house)"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className="mt-12 flex justify-center items-center space-x-2">
          <input
            type="text"
            placeholder="Search for your Landlord"
            className="input input-bordered w-full h-12 rounded-md border-2 border-gray-300 px-4"
          />
          <button className="px-6 py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700">
            Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
