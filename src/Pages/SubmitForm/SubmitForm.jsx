/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SubmitTextBanner from "./SubmitTextBanner/SubmitTextBanner";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentDateString } from "../../components/GetTodaysDate";

const SubmitForm = () => {
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  // Search fields
  const [searchCommunity, setSearchCommunity] = useState("");
  const [searchAddress, setSearchAddress] = useState("");

  // Loading states
  const [loading, setLoading] = useState(false);
  const [addressLoading, setAddressLoading] = useState(false);

  // Data states
  const [reviews, setReviews] = useState([]);
  const [community, setCommunity] = useState("");
  const [address, setAddress] = useState([]);
  console.log(address);
  const [formAddress, setFormAddress] = useState({
    street: "",
    district: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  // Show/hide states
  const [showCommunity, setShowCommunity] = useState(false);
  const [showAddress, setShowAddress] = useState(false);

  // Filter locations within the United States
  const filterResults = (data) =>
    data?.filter(
      (location) => location?.properties?.country === "United States"
    );

  // Get today's date
  const date = new Date().toISOString().split("T")[0]; // Example: "2024-11-08"

  // Handle rating form submission
  const handleRatingSubmit = (event) => {
    event.preventDefault();

    // Compile address into a formatted string
    const location = [
      formAddress?.street,
      formAddress?.city,
      formAddress?.state,
      formAddress?.country,
      formAddress?.zipCode,
    ]
      .filter(Boolean) // Removes empty, null, or undefined values
      .join(", ");

    const ratingData = {
      ...formAddress,
      location,
      landlordName: community?.toUpperCase(),
      rating,
      review: event.target?.review?.value,
      date,
    };

    // Send rating data to the backend
    fetch(`http://localhost:5000/api/v1/review/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ratingData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success("Review submitted successfully!");
          navigate("/reviews");
          window.scrollTo(0, 0);
        }
      })
      .catch((error) => console.error("Error submitting review:", error));
  };

  // Fetch reviews based on community name
  useEffect(() => {
    if (searchCommunity) {
      setLoading(true);
      fetch(
        `http://localhost:5000/api/v1/review/all/landlordName?landlordName=${searchCommunity}`
      )
        .then((response) => response.json())
        .then((data) => {
          setReviews(data?.data || []);
        })
        .catch((error) => console.error("Error fetching reviews:", error))
        .finally(() => setLoading(false));
    }
  }, [searchCommunity]);

  // Fetch addresses based on search input
  useEffect(() => {
    if (searchAddress) {
      setAddressLoading(true);
      fetch(`https://photon.komoot.io/api/?q=${searchAddress}`)
        .then((response) => response.json())
        .then((data) => {
          const locations = filterResults(data?.features || []);
          setAddress(locations);
        })
        .catch((error) => console.error("Error fetching addresses:", error))
        .finally(() => setAddressLoading(false));
    }
  }, [searchAddress]);
  return (
    <div className="text-start">
      <SubmitTextBanner />

      {/* Submit form for Big device*/}
      <form
        onSubmit={handleRatingSubmit}
        className="my-20 border mx-[10%] h-full pb-10 rounded-[8px] shadow-xl px-[4%] pt-5 hidden md:block"
      >
        {/* Name of Community */}
        <div>
          <h1 className="ml-3 text-xl font-bold">Name of Community</h1>
          <input
            type="text"
            placeholder="Name of Community"
            className="w-2/3 mt-1 input input-bordered"
            value={community}
            onChange={(e) => {
              setSearchCommunity(e.target.value);
              setCommunity(e.target.value);
              setShowCommunity(true);
            }}
          />
        </div>
        {/* Community model */}

        <div
          className={`${showCommunity ? "" : "hidden"} ${
            searchCommunity === "" ? "hidden" : ""
          } h-[200px] border w-2/3 mt-[2px]`}
        >
          {loading ? (
            <div className="flex mt-[12%] justify-center">
              <h1>Loading...</h1>
            </div>
          ) : (
            <div>
              {reviews?.length === 0 ? (
                <div>
                  <h1 className="mt-20 font-semibold text-center">
                    No match found
                  </h1>
                </div>
              ) : (
                <div>
                  {reviews?.map((review) => {
                    return (
                      <div
                        key={review._id}
                        className="flex items-center justify-between"
                      >
                        <h2
                          onClick={() => {
                            setCommunity(review.landlordName);
                            setShowCommunity(false);
                          }}
                          className="w-full p-3 pl-5 text-lg font-bold border cursor-pointer"
                        >
                          {review.landlordName}
                        </h2>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Address */}
        <div className="mt-10">
          <h1 className="ml-3 text-xl font-bold">Address</h1>
          <input
            type="text"
            placeholder="Search for Address"
            className="w-2/3 mt-1 input input-bordered"
            value={searchAddress}
            onChange={(e) => {
              setSearchAddress(e.target.value);
              setShowAddress(true);
            }}
          />

          {/* Address model */}
          <div
            className={`h-[200px] border w-2/3 mt-[2px] ${
              showAddress ? "" : "hidden"
            } ${searchAddress === "" ? "hidden" : ""}`}
          >
            {addressLoading ? (
              <div className="flex mt-[12%] justify-center">
                <h1>Loading...</h1>
              </div>
            ) : (
              <div className="h-[200px] overflow-scroll">
                {address.length === 0 ? (
                  <div>
                    <h1 className="mt-20 font-semibold text-center">
                      No match found
                    </h1>
                  </div>
                ) : (
                  <div>
                    {address?.map((p, i) => (
                      <div
                        onClick={() => {
                          setFormAddress({
                            street: p?.properties?.street,
                            district: p?.properties?.district,
                            city: p?.properties?.city,
                            state: p?.properties?.state,
                            zipCode: p?.properties?.postcode,
                            country: p?.properties?.country,
                          });
                          setShowAddress(false);
                        }}
                        key={i}
                      >
                        <h1 className="pl-5 h-[50px] border flex items-center cursor-pointer">
                          {/* Street */}
                          <span
                            className={`${
                              p?.properties?.district ? "" : "hidden"
                            }`}
                          >
                            {p?.properties?.district},
                          </span>
                          {/* city */}
                          <span
                            className={`${p?.properties?.city ? "" : "hidden"}`}
                          >
                            {p?.properties?.city},
                          </span>
                          <span
                            className={`${
                              p?.properties?.state ? "" : "hidden"
                            }`}
                          >
                            {p?.properties?.state},
                          </span>
                          <span
                            className={`${
                              p?.properties?.country ? "" : "hidden"
                            }`}
                          >
                            {p?.properties?.country},
                          </span>
                          <span
                            className={`${
                              p?.properties?.postcode ? "" : "hidden"
                            }`}
                          >
                            {p?.properties?.postcode}
                          </span>
                        </h1>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex mt-5">
            {/* Street */}
            <div className="w-full">
              <h1 className="ml-3 font-bold">Street</h1>
              <input
                readOnly
                value={formAddress.street}
                type="text"
                placeholder="Street"
                className="w-full mt-1 input input-bordered"
              />
            </div>

            {/* state */}
            <div className="w-full">
              <h1 className="ml-6 font-bold">District</h1>
              <input
                readOnly
                value={formAddress.district}
                type="text"
                placeholder="District"
                className="w-full mt-1 ml-3 input input-bordered"
              />
            </div>
          </div>
          <div className="flex mt-2">
            {/* city */}
            <div className="w-full">
              <h1 className="ml-3 font-bold">City</h1>
              <input
                readOnly
                value={formAddress.city}
                type="text"
                placeholder="city"
                className="w-full mt-1 input input-bordered"
              />
            </div>

            {/* state */}
            <div className="w-full">
              <h1 className="ml-6 font-bold">State</h1>
              <input
                readOnly
                value={formAddress.state}
                type="text"
                placeholder="State"
                className="w-full mt-1 ml-3 input input-bordered"
              />
            </div>
          </div>
          <div className="flex mt-2">
            {/* zipCode */}
            <div className="w-full">
              <h1 className="ml-3 font-bold">Zip Code</h1>
              <input
                readOnly
                value={formAddress.zipCode}
                type="text"
                placeholder="Zip Code"
                className="w-full mt-1 input input-bordered"
              />
            </div>

            {/* country */}
            <div className="w-full">
              <h1 className="ml-6 font-bold">Country</h1>
              <input
                readOnly
                value={formAddress.country}
                type="text"
                placeholder="Country"
                className="w-full mt-1 ml-3 input input-bordered"
              />
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="mt-10">
          <h1 className="ml-3 text-xl font-bold">Overall Experience</h1>
          <div>
            <Rating
              style={{ maxWidth: 250 }}
              value={rating}
              onChange={setRating}
            />
          </div>
        </div>

        {/* Rating */}
        <div className="mt-10">
          <h1 className="ml-3 text-xl font-bold">
            What should others know about this HOA?
          </h1>
          <textarea
            name="review"
            placeholder="Write a review"
            className="input input-bordered w-2/3 mt-1 p-5 h-[150px]"
            rows={5}
          />
        </div>

        {/* Submit Button */}
        <button
          className={`px-4 py-3 mt-5 rounded-md  text-white cursor-pointer bg-[#d6cc32] hover:bg-[#b4ab2a]
          `}
        >
          Submit Review
        </button>
      </form>

      {/* ********************************************************** */}

      {/* Submit form for small device*/}
      <form
        onSubmit={handleRatingSubmit}
        className="my-20 border mx-2 h-full pb-10 rounded-[8px] shadow-xl px-2 pt-5 block md:hidden"
      >
        {/* Name of Community */}
        <div>
          <h1 className="ml-3 text-lg font-bold">Name of Community</h1>
          <input
            type="text"
            placeholder="Name of Community"
            className="w-full mt-1 input input-bordered md:w-2/3"
            value={community}
            onChange={(e) => {
              setSearchCommunity(e.target.value);
              setCommunity(e.target.value);
              setShowCommunity(true);
            }}
          />
        </div>
        {/* Community model */}
        <div
          className={`${showCommunity ? "" : "hidden"} ${
            searchCommunity === "" ? "hidden" : ""
          } h-[200px] border w-full mt-[2px] md:w-2/3`}
        >
          {loading ? (
            <div className="flex justify-center mt-10">
              <h1>Loading...</h1>
            </div>
          ) : (
            <div>
              {reviews?.length === 0 ? (
                <div>
                  <h1 className="mt-10 font-semibold text-center">
                    No match found
                  </h1>
                </div>
              ) : (
                <div>
                  {reviews?.map((review) => (
                    <div
                      key={review._id}
                      className="flex items-center justify-between"
                    >
                      <h2
                        onClick={() => {
                          setCommunity(review?.landlordName);
                          setShowCommunity(false);
                        }}
                        className="text-[13px] font-bold border w-full p-3 pl-5 cursor-pointer"
                      >
                        {review?.landlordName}
                      </h2>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Address */}
        <div className="mt-10">
          <h1 className="ml-3 text-lg font-bold">Address</h1>
          <input
            type="text"
            placeholder="Search for Address"
            className="w-full mt-1 input input-bordered md:w-2/3"
            value={searchAddress}
            onChange={(e) => {
              setSearchAddress(e.target.value);
              setShowAddress(true);
            }}
          />

          {/* Address model */}
          <div
            className={`h-[200px] border w-full mt-2 ${
              showAddress ? "" : "hidden"
            } ${searchAddress === "" ? "hidden" : ""} md:w-2/3`}
          >
            {addressLoading ? (
              <div className="flex justify-center mt-10">
                <h1>Loading...</h1>
              </div>
            ) : (
              <div className="h-[200px] overflow-scroll">
                {address.length === 0 ? (
                  <div>
                    <h1 className="mt-10 font-semibold text-center">
                      No match found
                    </h1>
                  </div>
                ) : (
                  <div>
                    {address?.map((p, i) => (
                      <div
                        onClick={() => {
                          setFormAddress({
                            street: p?.properties?.district,
                            city: p?.properties?.city,
                            state: p?.properties?.state,
                            zipCode: p?.properties?.postcode,
                            country: p?.properties?.country,
                          });
                          setShowAddress(false);
                        }}
                        key={i}
                      >
                        <h1 className="pl-5 h-[50px] border flex items-center cursor-pointer text-[13px]">
                          {/* Street */}
                          <span
                            className={`${
                              p?.properties?.district ? "" : "hidden"
                            }`}
                          >
                            {p?.properties?.district},
                          </span>
                          {/* city */}
                          <span
                            className={`${p?.properties?.city ? "" : "hidden"}`}
                          >
                            {p?.properties?.city},
                          </span>
                          <span
                            className={`${
                              p?.properties?.state ? "" : "hidden"
                            }`}
                          >
                            {p?.properties?.state},
                          </span>
                          <span
                            className={`${
                              p?.properties?.country ? "" : "hidden"
                            }`}
                          >
                            {p?.properties?.country},
                          </span>
                          <span
                            className={`${
                              p?.properties?.postcode ? "" : "hidden"
                            }`}
                          >
                            {p?.properties?.postcode}
                          </span>
                        </h1>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Street */}
          <div className="flex flex-col mt-5">
            <h1 className="ml-3 font-bold">Street</h1>
            <input
              type="text"
              value={formAddress.street}
              placeholder="Street name"
              readOnly
              className="w-full mt-1 input input-bordered md:w-1/2"
            />
          </div>
          <div className="flex flex-col mt-2 md:flex-row">
            {/* City */}
            <div className="w-full mb-2 md:mb-0">
              <h1 className="ml-3 font-bold">City</h1>
              <input
                readOnly
                value={formAddress.city}
                type="text"
                placeholder="City"
                className="w-full mt-1 input input-bordered"
              />
            </div>
            {/* State */}
            <div className="w-full">
              <h1 className="ml-3 font-bold">State</h1>
              <input
                readOnly
                value={formAddress.state}
                type="text"
                placeholder="State"
                className="w-full mt-1 input input-bordered md:ml-3"
              />
            </div>
          </div>
          <div className="flex flex-col mt-2 md:flex-row">
            {/* Zip Code */}
            <div className="w-full mb-2 md:mb-0">
              <h1 className="ml-3 font-bold">Zip Code</h1>
              <input
                readOnly
                value={formAddress.zipCode}
                type="text"
                placeholder="Zip Code"
                className="w-full mt-1 input input-bordered"
              />
            </div>
            {/* Country */}
            <div className="w-full">
              <h1 className="ml-3 font-bold">Country</h1>
              <input
                readOnly
                value={formAddress.country}
                type="text"
                placeholder="Country"
                className="w-full mt-1 input input-bordered md:ml-3"
              />
            </div>
          </div>
        </div>

        {/* Overall Experience */}
        <div className="mt-10">
          <h1 className="ml-3 text-lg font-bold">Overall Experience</h1>
          <div>
            <Rating
              style={{ maxWidth: 250 }}
              value={rating}
              onChange={setRating}
            />
          </div>
        </div>

        {/* Review */}
        <div className="mt-10">
          <h1 className="ml-3 text-lg font-bold">
            What should others know about this HOA?
          </h1>
          <textarea
            name="review"
            placeholder="Write a review"
            className="input input-bordered w-full mt-1 p-3 h-[150px] md:w-2/3"
            rows={5}
          />
        </div>

        {/* Submit Button */}
        <button className="px-4 py-3 mt-5 rounded-md text-white bg-[#d6cc32] hover:bg-[#b4ab2a] w-full md:w-auto">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default SubmitForm;
