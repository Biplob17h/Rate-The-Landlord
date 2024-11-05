/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import SubmitTextBanner from "./SubmitTextBanner/SubmitTextBanner";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Link } from "react-router-dom";

const SubmitForm = () => {
  const [rating, setRating] = useState(0);
  console.log(rating)

  // search
  const [searchCommunity, setSearchCommunity] = useState("");
  const [searchAddress, setSearchAddress] = useState("");

  // loading
  const [loading, setLoading] = useState(false);
  const [addressLoading, setAddressLoading] = useState(false);

  // data
  const [reviews, setReviews] = useState([]);
  const [community, setCommunity] = useState("");
  const [address, setAddress] = useState([]);
  const [formAddress, setFormAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  // show/hide
  const [showCommunity, setShowCommunity] = useState(false);
  const [showAddress, setShowAddress] = useState(false);

  // All Functions
  const filterResults = (data) => {
    let locations = [];
    data.forEach((location) => {
      if (
        location?.properties?.state &&
        location?.properties?.city &&
        location?.properties?.district
      ) {
        locations.push(location);
      }
    });
    return locations;
  };

  const handleRatingSubmit = (event) => {
    event.preventDefault();
    // handle rating submit
    const ratingData = {
      street: formAddress.street,
      city: formAddress.city,
      state: formAddress.state,
      zip: formAddress.zip,
      country: formAddress.country,
      landlordName: community,
      rating,
      review: event.target.review.value,
    };
    
  };

  // Use Effect
  useEffect(() => {
    setLoading(true);
    fetch(
      `http://localhost:5000/api/v1/review/all/landlordName?landlordName=${searchCommunity}`
    )
      .then((response) => response.json())
      .then((data) => {
        setReviews(data?.data);
        setLoading(false);
      });
  }, [searchCommunity]);

  useEffect(() => {
    setAddressLoading(true);
    fetch(`https://photon.komoot.io/api/?q=${searchAddress}`)
      .then((response) => response.json())
      .then((data) => {
        const locations = filterResults(data.features);
        setAddress(locations);
        setAddressLoading(false);
      });
  }, [searchAddress]);

  return (
    <div className="text-start px-[5%]">
      <SubmitTextBanner />

      {/* Submit form */}
      <form
        onSubmit={handleRatingSubmit}
        className="my-20 border mx-[10%] h-full pb-10 rounded-[8px] shadow-xl px-[4%] pt-5"
      >
        {/* Name of Community */}
        <div>
          <h1 className="text-xl font-bold ml-3">Name of Community</h1>
          <input
            type="text"
            placeholder="Name of Community"
            className="input input-bordered w-2/3 mt-1"
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
              {reviews?.map((review) => {
                return (
                  <div
                    key={review._id}
                    className="flex justify-between items-center"
                  >
                    <h2
                      onClick={() => {
                        setCommunity(review.landlordName);
                        setShowCommunity(false);
                      }}
                      className="text-lg font-bold border w-full p-3 pl-5 cursor-pointer"
                    >
                      {review.landlordName}
                    </h2>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Address */}
        <div className="mt-10">
          <h1 className="text-xl font-bold ml-3">Address</h1>
          <input
            type="text"
            placeholder="Search for Address"
            className="input input-bordered w-2/3 mt-1"
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
                {address?.map((p, i) => (
                  <div
                    onClick={() => {
                      setFormAddress({
                        street: p?.properties?.district,
                        city: p?.properties?.city,
                        state: p?.properties?.state,
                        zip: p?.properties?.postcode,
                        country: p?.properties?.country,
                      });
                      setShowAddress(false);
                    }}
                    key={i}
                  >
                    <h1 className="pl-5 h-[50px] border flex items-center cursor-pointer">{`${p?.properties?.district}, ${p?.properties?.city}, ${p?.properties?.state}, ${p?.properties?.country}`}</h1>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* street */}
          <div className="mt-5 flex">
            <input
              type="text"
              value={formAddress.street}
              placeholder="street name"
              readOnly
              className="input input-bordered w-1/2 mt-1"
            />
            <div className="w-1/2 mt-1 ml-5" />
          </div>
          <div className="mt-2 flex">
            {/* city */}
            <input
              readOnly
              value={formAddress.city}
              type="text"
              placeholder="city"
              className="input input-bordered w-1/2 mt-1"
            />

            {/* state */}
            <input
              readOnly
              type="text"
              placeholder="state"
              value={formAddress.state}
              className="input input-bordered w-1/2 mt-1 ml-5"
            />
          </div>
          <div className="mt-2 flex">
            {/* zip */}
            <input
              readOnly
              type="text"
              placeholder="zip code"
              value={formAddress.zip}
              className="input input-bordered w-1/2 mt-1"
            />

            {/* country */}
            <input
              readOnly
              type="text"
              placeholder="country"
              value={formAddress.country}
              className="input input-bordered w-1/2 mt-1 ml-5"
            />
          </div>
        </div>

        {/* Rating */}
        <div className="mt-10">
          <h1 className="text-xl font-bold ml-3">Overall Experience</h1>
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
          <h1 className="text-xl font-bold ml-3">
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
    </div>
  );
};

export default SubmitForm;
