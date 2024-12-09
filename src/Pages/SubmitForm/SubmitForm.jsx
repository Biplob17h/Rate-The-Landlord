/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SubmitTextBanner from "./SubmitTextBanner/SubmitTextBanner";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentDateString } from "../../components/GetTodaysDate";
import AddressFrom from "./AddressFrom/AddressFrom";
import ReCAPTCHA from "./ReCAPTCHA/ReCAPTCHA";

const SubmitForm = () => {
  //  use states
  const [rating, setRating] = useState(0);
  const [searchCommunity, setSearchCommunity] = useState("");
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [community, setCommunity] = useState("");
  const [address, setAddress] = useState("");
  const [showCommunity, setShowCommunity] = useState(false);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [token, setToken] = useState(null);

  const navigate = useNavigate();

  // Get today's date
  const date = new Date().toISOString().split("T")[0]; // Example: "2024-11-08"

  // Handle rating form submission
  const handleRatingSubmit = (event) => {
    event.preventDefault();

    const ratingData = {
      location: address,
      landlordName: community?.toUpperCase(),
      rating,
      review: event.target?.review?.value,
      date,
      city,
      state,
    };

    if (
      ratingData.location === "" ||
      ratingData.lordName === "" ||
      ratingData.rating === 0 ||
      ratingData.review === ""
    ) {
      toast.error("Please fill out all required fields.");
      return;
    }

    // Send rating data to the backend
    fetch(
      `http://localhost:5000/api/v1/review/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ratingData),
      }
    )
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

  return (
    <div className="text-start">
      <SubmitTextBanner />

      {/* ********************************************************** */}

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
        <AddressFrom
          setAddress={setAddress}
          setCity={setCity}
          setState={setState}
        />

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

        {/* Rating with text*/}
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

        {/* ReCAPTCHA */}
        <ReCAPTCHA token={token} setToken={setToken} />

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
        <AddressFrom
          setAddress={setAddress}
          setCity={setCity}
          setState={setState}
        />

        {/* Overall Experience */}
        <div className="mt-10">
          <h1 className="ml-3 text-lg font-bold">Overall Experience</h1>
          <div className="mt-3">
            <Rating
              style={{ maxWidth: 200 }}
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

        {/* ReCAPTCHA */}
        <ReCAPTCHA token={token} setToken={setToken} />

        {/* Submit Button */}
        <button className="px-4 py-3 mt-5 rounded-md text-white bg-[#d6cc32] hover:bg-[#b4ab2a] w-full md:w-auto">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default SubmitForm;
