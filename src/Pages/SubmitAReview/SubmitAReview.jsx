/* eslint-disable no-unused-vars */
import { useState } from "react";
import img from "../../assets/friends.webp";
import { Link } from "react-router-dom";

const SubmitAReview = () => {
  return (
    <div>
      {/* Home  Icon Section*/}
      <section className={`bg-[#f3f4f6] my-3 rounded-3xl text-center mx-8`}>
        {/* Home  Icon*/}
        <div className="flex justify-end">
          <div className="relative w-full h-[500px]">
            {" "}
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
        {/* Home Icon Text */}
        <div className="w-[80%] mx-auto">
          <h1 className="text-4xl text-black font-[800]">
            Help Us Create a Better Living Experience!
          </h1>
          <p className="mt-2">
            Thank you for reviewing your landlord! Your feedback on maintenance,
            communication, and overall satisfaction will help tenants in your
            area make informed housing decisions.
          </p>
        </div>
        {/* start submit review button */}
        <div className="mt-[35px] pb-[20px]">
          <Link to={'/submit-form'} className="inline-flex justify-center rounded-md border border-transparent text-white bg-teal-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 bg-teal-600, hover:bg-teal-700 px-8 py-4 text-3xl cursor-pointer">
            Start a Review
          </Link>
        </div>
      </section>
    </div>
  );
};

export default SubmitAReview;
