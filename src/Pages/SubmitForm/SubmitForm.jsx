/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SubmitTextBanner from "./SubmitTextBanner/SubmitTextBanner";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Link, useNavigate } from "react-router-dom";

const SubmitForm = () => {
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

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
    zipCode: "",
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
    const location = `${formAddress.street} ${formAddress.city} ${formAddress.state} ${formAddress.country} ${formAddress.zipCode}`;
    const ratingData = {
      street: formAddress.street,
      city: formAddress.city,
      state: formAddress.state,
      zipCode: formAddress.zipCode,
      country: formAddress.country,
      location,
      landlordName: community.toUpperCase(),
      rating,
      review: event.target.review.value,
    };

    fetch("https://rate-the-landlord-server-1.onrender.com/api/v1/review/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ratingData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success("Review submit successful");
          navigate("/reviews");
        }
      });
  };

  // Use Effect
  useEffect(() => {
    setLoading(true);
    fetch(
      `https://rate-the-landlord-server-1.onrender.com/api/v1/review/all/landlordName?landlordName=${searchCommunity}`
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
    <div className="text-start">
      <SubmitTextBanner />

      {/* Submit form for Big device*/}
      <form
        onSubmit={handleRatingSubmit}
        className="my-20 border mx-[10%] h-full pb-10 rounded-[8px] shadow-xl px-[4%] pt-5 hidden md:block"
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
              {reviews?.length === 0 ? (
                <div>
                  <h1 className="font-semibold text-center mt-20">
                    No match found
                  </h1>
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
                {address.length === 0 ? (
                  <div>
                    <h1 className="font-semibold text-center mt-20">
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
                        <h1 className="pl-5 h-[50px] border flex items-center cursor-pointer">{`${p?.properties?.district}, ${p?.properties?.city}, ${p?.properties?.state}, ${p?.properties?.country}`}</h1>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* street */}
          <div className="mt-5 flex flex-col">
            <h1 className="ml-3 font-bold">Street</h1>
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
            <div className="w-full">
              <h1 className="ml-3 font-bold">City</h1>
              <input
                readOnly
                value={formAddress.city}
                type="text"
                placeholder="city"
                className="input input-bordered w-full mt-1"
              />
            </div>

            {/* state */}
            <div className="w-full">
              <h1 className="ml-6 font-bold">State</h1>
              <input
                readOnly
                value={formAddress.state}
                type="text"
                placeholder="city"
                className="input input-bordered w-full mt-1 ml-3"
              />
            </div>
          </div>
          <div className="mt-2 flex">
            {/* zipCode */}
            <div className="w-full">
              <h1 className="ml-3 font-bold">Zip Code</h1>
              <input
                readOnly
                value={formAddress.zipCode}
                type="text"
                placeholder="city"
                className="input input-bordered w-full mt-1"
              />
            </div>

            {/* country */}
            <div className="w-full">
              <h1 className="ml-6 font-bold">Country</h1>
              <input
                readOnly
                value={formAddress.country}
                type="text"
                placeholder="city"
                className="input input-bordered w-full mt-1 ml-3"
              />
            </div>
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

      {/* ********************************************************** */}

      {/* Submit form for small device*/}
      <form
        onSubmit={handleRatingSubmit}
        className="my-20 border mx-2 h-full pb-10 rounded-[8px] shadow-xl px-2 pt-5"
      >
        {/* Name of Community */}
        <div>
          <h1 className="text-lg font-bold ml-3">Name of Community</h1>
          <input
            type="text"
            placeholder="Name of Community"
            className="input input-bordered w-full mt-1 md:w-2/3"
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
            <div className="flex mt-10 justify-center">
              <h1>Loading...</h1>
            </div>
          ) : (
            <div>
              {reviews?.length === 0 ? (
                <div>
                  <h1 className="font-semibold text-center mt-10">
                    No match found
                  </h1>
                </div>
              ) : (
                <div>
                  {reviews?.map((review) => (
                    <div
                      key={review._id}
                      className="flex justify-between items-center"
                    >
                      <h2
                        onClick={() => {
                          setCommunity(review.landlordName);
                          setShowCommunity(false);
                        }}
                        className="text-[13px] font-bold border w-full p-3 pl-5 cursor-pointer"
                      >
                        {review.landlordName}
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
          <h1 className="text-lg font-bold ml-3">Address</h1>
          <input
            type="text"
            placeholder="Search for Address"
            className="input input-bordered w-full mt-1 md:w-2/3"
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
              <div className="flex mt-10 justify-center">
                <h1>Loading...</h1>
              </div>
            ) : (
              <div className="h-[200px] overflow-scroll">
                {address.length === 0 ? (
                  <div>
                    <h1 className="font-semibold text-center mt-10">
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
                        <h1 className="pl-5 h-[50px] border flex items-center cursor-pointer text-[13px]">{`${p?.properties?.district}, ${p?.properties?.city}, ${p?.properties?.state}, ${p?.properties?.country}`}</h1>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Street */}
          <div className="mt-5 flex flex-col">
            <h1 className="ml-3 font-bold">Street</h1>
            <input
              type="text"
              value={formAddress.street}
              placeholder="Street name"
              readOnly
              className="input input-bordered w-full mt-1 md:w-1/2"
            />
          </div>
          <div className="mt-2 flex flex-col md:flex-row">
            {/* City */}
            <div className="w-full mb-2 md:mb-0">
              <h1 className="ml-3 font-bold">City</h1>
              <input
                readOnly
                value={formAddress.city}
                type="text"
                placeholder="City"
                className="input input-bordered w-full mt-1"
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
                className="input input-bordered w-full mt-1 md:ml-3"
              />
            </div>
          </div>
          <div className="mt-2 flex flex-col md:flex-row">
            {/* Zip Code */}
            <div className="w-full mb-2 md:mb-0">
              <h1 className="ml-3 font-bold">Zip Code</h1>
              <input
                readOnly
                value={formAddress.zipCode}
                type="text"
                placeholder="Zip Code"
                className="input input-bordered w-full mt-1"
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
                className="input input-bordered w-full mt-1 md:ml-3"
              />
            </div>
          </div>
        </div>

        {/* Overall Experience */}
        <div className="mt-10">
          <h1 className="text-lg font-bold ml-3">Overall Experience</h1>
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
          <h1 className="text-lg font-bold ml-3">
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
