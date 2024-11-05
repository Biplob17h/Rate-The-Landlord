/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import img from "../../../assets/house.jpg";
import { Link } from "react-router-dom";

const Banner = () => {
  const [search, setSearch] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://rate-the-landlord-server-1.onrender.com/api/v1/review/all/landlordName?landlordName=${search}`
    )
      .then((response) => response.json())
      .then((data) => {
        setReviews(data?.data);
        setLoading(false);
      });
  }, [search]);
  return (
    <section className="flex justify-center items-center min-h-screen bg-white">
      {/* Card container with a lighter gradient background */}
      <div className="shadow-lg p-10 w-[95%] max-w-7xl mt-5 rounded-[15px] bg-gradient-to-l from-white to-[#706812]">
        {/* Section for PC view */}
        <div className="hidden md:flex justify-between items-center">
          {/* Left side: Headline and buttons */}
          <div className="w-1/2 space-y-6">
            <h1 className="text-5xl font-[800] text-white leading-tight">
              Find, Review, and Warn Others About Homeowners Associations
            </h1>
            <p className="text-lg text-[white]">
              Join the waitlist to search HOA reviews by address and leave
              anonymous reviews without logging in.
            </p>
            <div className="flex space-x-4">
              <Link to={"/submit"}>
                <button className="px-6 py-3 bg-[#d6cc32] text-white rounded-md hover:bg-[#c5bb2e]">
                  Submit a Review
                </button>
              </Link>
              <Link to={"/reviews"}>
                <button className="px-6 py-3 border-2 border-[#d6cc32] text-[#c5bb2e] rounded-md hover:bg-[c5bb2e]">
                  Read Reviews
                </button>
              </Link>
            </div>
          </div>

          {/* Right side: Full-width Image masked inside a house shape */}
          <div className="w-1/2 flex justify-end">
            <div className="relative w-full h-[500px]">
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

        {/* Section for Mobile view */}
        <div className="flex md:hidden flex-col items-center">
          {/* Mobile Image */}
          <div
            className="r
          elative w-full h-[300px]"
          >
            <svg
              viewBox="0 0 1024 1024"
              className="absolute inset-0 w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <clipPath id="clip-house-mobile">
                  <path d="M512 74L74 464h144v486h220V688h148v262h220V464h144L512 74z" />
                </clipPath>
              </defs>
              <image
                href={img}
                className="object-cover"
                width="100%"
                height="100%"
                clipPath="url(#clip-house-mobile)"
              />
            </svg>
          </div>

          {/* Mobile Headline and buttons */}
          <div className="text-center space-y-6 mt-6">
            <h1 className="text-4xl font-[800] text-white leading-tight">
              Find, Review, and Warn Others About Homeowners Associations
            </h1>
            <p className="text-lg text-[white]">
              Join the waitlist to search HOA reviews by address and leave
              anonymous reviews without logging in.
            </p>
            <div className="flex justify-center space-x-4">
              <Link to={"/submit"}>
                <button className="px-6 py-3 bg-[#d6cc32] text-white rounded-md hover:bg-[#c5bb2e]">
                  Submit a Review
                </button>
              </Link>
              <Link to={"/reviews"}>
                <button className="px-6 py-3 border-2 border-[#d6cc32] text-[#c5bb2e] rounded-md hover:bg-[c5bb2e]">
                  Read Reviews
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className="mt-12 flex justify-center items-center space-x-2 relative">
          <input
            type="text"
            placeholder="Search for your community"
            className="input input-bordered w-full h-12 rounded-md border-2 border-gray-300 px-4"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          {/* search bar down info */}
          <div
            className={`h-[200px] w-[90.5%] absolute rounded-md border  top-[48px] left-0 bg-white ${
              search === "" ? "hidden" : ""
            }`}
          >
            <div className="w-full h-[50px] bg-gray-50 hover:bg-[#d6cc32]  flex flex-col justify-center pl-[2%] cursor-pointer rounded-md">
              <h1 className="text-[17px]">Searching for {search}</h1>
            </div>
            {loading ? (
              <div className="flex justify-center items-center">
                <span>Loading...</span>
              </div>
            ) : (
              <div>
                {reviews?.map((review) => (
                  <Link
                    to={`/single/landlord/${review?._id}`}
                    key={review?._id}
                    className="w-full h-[50px]  bg-gray-50 hover:bg-[#d6cc32] flex flex-col justify-center pl-[2%] cursor-pointer rounded-md"
                    onClick={() => {
                      window.scrollTo(0, 0);
                    }}
                  >
                    <h1 className="text-[17px]">{review?.landlordName}</h1>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <button className="px-6 py-3 bg-[#d6cc32] text-white rounded-md hover:bg-[#c5bb2e]">
            Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
