/* eslint-disable no-unused-vars */
import React from "react";

const Community = () => {
  return (
    <section className="flex flex-col justify-center items-center bg-white py-12">
      {/* Community container */}
      <div className="shadow-lg p-10 py-20 w-[95%] max-w-7xl mt-5 bg-[#f9fafb] rounded-[15px]">
        <h1 className="text-center text-2xl font-semibold mb-8">
          Keep your community informed.
        </h1>
        <div className="flex justify-between items-center">
          {/* First icon section */}
          <div className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16 mx-auto text-teal-600 mb-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                clipRule="evenodd"
              ></path>
              <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"></path>
            </svg>
            <h2 className="text-2xl font-semibold">Anonymity</h2>
            <p className="text-gray-600 text-[14px]">
              Share your rental experience with confidence.
            </p>
          </div>

          {/* Second icon section */}
          <div className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-16 h-16 mx-auto text-teal-600 mb-4"
            >
              <path
                fillRule="evenodd"
                d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z"
                clipRule="evenodd"
              ></path>
              <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z"></path>
            </svg>
            <h2 className="text-2xl font-semibold">Solidarity</h2>
            <p className="text-gray-600 text-[14px]">
              Join fellow Tenants by creating an informed community.
            </p>
          </div>

          {/* Third icon section */}
          <div className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-16 h-16 mx-auto text-teal-600 mb-4"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                clipRule="evenodd"
              ></path>
            </svg>
            <h2 className="text-2xl font-semibold">Transparency</h2>
            <p className="text-gray-600 text-[14px]">
              Empower others to make decisions about housing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
