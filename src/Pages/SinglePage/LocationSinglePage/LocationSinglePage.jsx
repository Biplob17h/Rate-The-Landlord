/* eslint-disable no-unused-vars */
import { Rating } from "@smastrom/react-rating";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import countTotalReview from "../../../components/CountTotal";
import LocationMapSinglePage from "./LocationMapSinglePage";
import SubmitForm from "../../SubmitForm/SubmitForm";
import toast from "react-hot-toast";
import AddressFrom from "../../SubmitForm/AddressFrom/AddressFrom";
import ReCAPTCHA from "../../SubmitForm/ReCAPTCHA/ReCAPTCHA";

const LocationSinglePage = () => {
  // State to store the selected filters
  const [search, setSearch] = useState({
    landlord: "",
    sort: "newest",
    country: "",
    state: "",
    city: "",
    zipCode: "",
  });

  const [rating, setRating] = useState(0);
  const [searchCommunity, setSearchCommunity] = useState("");
  const [community, setCommunity] = useState("");
  const [showCommunity, setShowCommunity] = useState(false);
  const [token, setToken] = useState(null);

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
  };

  // state to store reviews
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // get Id
  const { id } = useParams();

  // Handle updating the filters
  const updateFilters = () => {
    // You can add functionality here to update the list of reviews
  };

  // Get today's date
  const date = new Date().toISOString().split("T")[0]; // Example: "2024-11-08"

  // Handle rating form submission
  const handleRatingSubmit = (event) => {
    event.preventDefault();

    const ratingData = {
      location: reviews[0]?.location,
      landlordName: community?.toUpperCase(),
      rating,
      review: event.target?.review?.value,
      date,
      city: reviews[0]?.city,
      state: reviews[0]?.state,
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

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/v1/review/single/location/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data?.data);
        setLoading(false);
      });
  }, [id]);

  // count total rating
  const total = countTotalReview(reviews, reviews?.length || 0);

  return (
    <div>
      {/* upper section*/}
      <section className="bg-[#f9fafb] w-[90%] mx-auto mt-[40px] rounded-[15px]">
        <div className="text-center pt-[70px]">
          <h1 className="text-[19px] md:text-[36px] font-bold uppercase">
            {reviews[0]?.location}
          </h1>
          <p>
            Read {reviews?.length} reviews for{" "}
            <span className="">{reviews[0]?.location}</span>
          </p>
        </div>

        {/* review section */}
        <section>
          <div className="text-white flex flex-col justify-center items-center rounded-l-[8px] mt-5">
            <Rating
              style={{ maxWidth: 280, color: "yellow" }}
              value={total}
              readOnly={true}
            />
          </div>
          <p className="mr-5 text-right">Based on {reviews?.length} reviews</p>
        </section>

        {/* submit section */}
        <section className="mt-[60px] ml-5 pb-6">
          <h1 className="text-[19px] font-bold">Share your thoughts</h1>
          <p className="text-[14px] text-[#4B5563]">
            If you&rsquo;ve rented in this city, share your experience with
            other tenants.
          </p>
          {/* Button for open modal  */}
          <label
            htmlFor="my_modal_6"
            className="btn p-3 bg-[#d6cc32] text-white text-[16px] mt-5"
          >
            Submit a review
          </label>
          <input type="checkbox" id="my_modal_6" className="modal-toggle" />
          <div className="modal" role="dialog">
            <div className="modal-box">
              <form
                onSubmit={handleRatingSubmit}
                className=" border  h-full pb-10 rounded-[8px] shadow-xl px-[4%] pt-5 hidden md:block"
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
                <div>
                  <h1 className="text-[18px] font-semibold mt-5 ">Location : {reviews[0]?.location}</h1>
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

                <div className="flex items-center justify-center gap-10">
                  <div className="modal-action">
                    <label htmlFor="my_modal_6" className="btn">
                      Close
                    </label>
                  </div>
                  <button className="btn p-3 bg-[#d6cc32] text-white text-[16px] mt-6">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </section>

      {/* Lower section */}
      <section className="w-[90%] mx-auto">
        {/* Faq */}
        <section className="mt-[60px]">
          <hr />
          <div>
            <div className="collapse collapse-plus">
              <input type="checkbox" /> {/* Changed from radio to checkbox */}
              <div className="text-xl font-medium collapse-title">
                Tenants guide to Reviews
              </div>
              <div className="collapse-content">
                <ol className="mx-5 list-decimal">
                  <li className="text-base leading-7 text-gray-600 list-item">
                    Look for Specific Details: Genuine reviews often contain
                    specific details about the tenant&rsquo;s experience with
                    the landlord. Vague praises, promotional language, or
                    meaningless criticisms might be less trustworthy.
                  </li>
                  <li className="text-base leading-7 text-gray-600 list-item">
                    Balance of Reviews: If a negative review is suddenly
                    followed by a highly positive one, take a moment to question
                    this. It&rsquo;s possible for a landlord/company to have
                    both good and bad traits, but drastic shifts in tone might
                    indicate something is amiss.
                  </li>
                  <li className="text-base leading-7 text-gray-600 list-item">
                    Frequency of Reviews: A sudden influx of positive reviews
                    after a string of negative ones might be a red flag.
                    Authentic reviews tend to come in at a steady pace over
                    time.
                  </li>
                  <li className="text-base leading-7 text-gray-600 list-item">
                    Consistency: Look for consistency in feedback across
                    reviews. If several reviews mention similar pros or cons,
                    they are likely reliable.
                  </li>
                </ol>
              </div>
            </div>
          </div>
          <hr />
        </section>
      </section>

      {/******  Rating section design ******/}
      <div className="block min-h-screen mx-4 mt-8 md:mx-10 md:flex">
        {/* Left side section */}
        <section className="w-full md:w-3/12 h-full rounded-lg md:rounded-none md:min-h-screen">
          <div className="p-5 bg-gray-100 h-full rounded-lg md:rounded-none md:min-h-screen">
            <div className="mb-4">
              <input
                type="text"
                name="landlord"
                value={search.landlord}
                onChange={handleInputChange}
                placeholder="Search HOAs"
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
                <option value="newest">Newest</option>
                <option value="lowest">Lowest</option>
                <option value="highest">Highest</option>
                <option value="a to z">Name A to Z</option>
                <option value="z to a">Name Z to A</option>
              </select>
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
                name="state"
                value={search.state}
                onChange={handleInputChange}
                placeholder="Search State"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="location"
                value={search.location}
                onChange={handleInputChange}
                placeholder="Search Location"
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
        <section className="w-full mt-5 md:border md:w-9/12 md:mt-0">
          {reviews.map((review) => (
            <LocationMapSinglePage key={review?._id} review={review} />
          ))}
        </section>
      </div>
    </div>
  );
};

export default LocationSinglePage;
