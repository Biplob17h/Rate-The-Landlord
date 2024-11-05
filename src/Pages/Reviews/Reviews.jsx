/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Rating } from "@smastrom/react-rating";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import ReviewSinglePage from "./ReviewSinglePage";

const Reviews = () => {
  // State to store the selected filters
  const [search, setSearch] = useState({
    landlord: "",
    sort: "newest",
    country: "",
    state: "",
    city: "",
    zipCode: "",
  });

  // state to store report
  const [report, setReport] = useState({
    reason: "Address is in the review",
    report: "Address is in the review",
  });

  // state to store review
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(1);

  const total = 5;

  // Handle filter changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearch((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle clearing the filters
  const clearFilters = () => {
    setSearch({
      landlord: "",
      country: "",
      state: "",
      city: "",
      zipCode: "",
    });
    setRefresh(refresh + 1);
  };

  // Handle updating the filters
  const updateFilters = () => {
    setLoading(true);
    fetch(
      `http://localhost:5000/api/v1/review/all?landlord=${search?.landlord}&sort=${search?.sort}&country=${search?.country}&state=${search?.state}&city=${search?.city}&zip=${search?.zipCode}`
    )
      .then((response) => response.json())
      .then((data) => setReviews(data?.data));
    setLoading(false);
  };


  // All Use Effect
  useEffect(() => {
    setLoading(true);
    fetch(
      `http://localhost:5000/api/v1/review/all?landlord=${search?.landlord}&sort=${search?.sort}&country=${search?.country}&state=${search?.state}&city=${search?.city}&zip=${search?.zipCode}`
    )
      .then((response) => response.json())
      .then((data) => setReviews(data?.data));
    setLoading(false);
  }, [refresh]);
  
  return (
    <div>
      {/******** Upper text section *********/}
      <section>
        <div className="w-1/2 m-20">
          <h1 className="text-3xl font-[800]">Find your Community</h1>
          <p className="mt-3 text-[#374151] text-[15px]">
            Search our database to find information about your Community. If you
            don&rsquo;t see a result, be the first to add a review!
          </p>
        </div>
        <hr />
        <div className="py-2 text-[#d6cc32]">
          <h1 className="text-center text-[35px] "> Reviews</h1>
        </div>
        <hr />
      </section>

      {/******  Review Page Main design ******/}
      <div className="min-h-screen block md:flex mx-3 md:mx-10 mt-8">
        {/* Left side section */}
        <section className="w-full md:w-3/12 min-h-screen">
          <div className="p-5 bg-gray-100 min-h-screen">
            <div className="mb-4">
              <input
                type="text"
                name="landlord"
                value={search.landlord}
                onChange={handleInputChange}
                placeholder="Search Landlords"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <select
                name="sort"
                value={search.sort}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="highest">Highest</option>
                <option value="lowest">Lowest</option>
                <option value="a to z">Name A to Z</option>
                <option value="z to a">Name Z to A</option>
              </select>
            </div>
            <div className="mb-4">
              <select
                name="country"
                value={search.country}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="" disabled>
                  Country
                </option>
                <option value="">All</option>
                <option value="Australia">Australia</option>
                <option value="Canada">Canada</option>
                <option value="Germany">Germany</option>
                <option value="Ireland">Ireland </option>
                <option value="New Zealand">New Zealand </option>
                <option value="Norway">Norway </option>
                <option value="United Kingdom">United Kingdom </option>
                <option value="United States"> United States</option>
              </select>
            </div>

            <div className="mb-4">
              <input
                type="text"
                name="state"
                value={search.state}
                onChange={handleInputChange}
                placeholder="Search State / Province"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <input
                type="text"
                name="city"
                value={search.city}
                onChange={handleInputChange}
                placeholder="Search City"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <input
                type="text"
                name="zipCode"
                value={search.zipCode}
                onChange={handleInputChange}
                placeholder="Search ZIP / Postal Code"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="flex justify-between">
              <button
                onClick={updateFilters}
                className="bg-[#d6cc32] text-white px-4 py-2 rounded-md"
              >
                Update Filters
              </button>
              <button
                onClick={clearFilters}
                className="bg-gray-400 text-white px-4 py-2 rounded-md"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </section>


        {/* Right side section */}
        <section className="w-full md:w-9/12 border-0 md:border  mt-5 md:mt-0 rounded-2xl md:rounded-none">
          {loading ? (
            <div className="flex justify-center items-center min-h-screen">
              <ClipLoader color="#d6cc32" size={110} />
            </div>
          ) : (
            <div>
              {reviews !== 0 ? (
                <div>
                  {reviews.map((review) => (
                    <ReviewSinglePage
                      key={review?._id}
                      review={review}
                      report={report}
                      setReport={setReport}
                    />
                  ))}
                </div>
              ) : (
                <div></div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Reviews;
