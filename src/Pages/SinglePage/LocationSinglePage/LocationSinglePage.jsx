/* eslint-disable no-unused-vars */
import { Rating } from "@smastrom/react-rating";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import countTotalReview from "../../../components/CountTotal";

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

  // set report
  const [report, setReport] = useState({
    reason: "Address is in the review",
    otherReason: "",
  });

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

  // get Id
  const { id } = useParams();

  // Handle updating the filters
  const updateFilters = () => {
    // You can add functionality here to update the list of reviews
    console.log("Filters updated with: ", search);
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
          <h1 className="text-[36px] font-bold uppercase">
            {reviews[0]?.location}
          </h1>
          <p>
            Read {reviews?.length} reviews and rental experiences for{" "}
            <span className="">{reviews[0]?.location}</span>
          </p>
        </div>

        {/* review section */}
        <section>
          <div className="grid grid-cols-6 mx-5 mt-[70px]">
            <div className=" bg-[#0d9488] text-white flex flex-col justify-center items-center py-12 rounded-l-[8px]">
              <h1>Overall</h1>
              <Rating
                style={{ maxWidth: 80, color: "yellow" }}
                value={total?.total}
                readOnly={true}
              />
            </div>
            <div className="ml-[2px] bg-[#edf5f5] text-black flex flex-col justify-center items-center py-12">
              <h1>Stability</h1>
              <Rating
                style={{ maxWidth: 80, color: "yellow" }}
                value={total?.rentalRating}
                readOnly={true}
              />
            </div>
            <div className="ml-[2px] bg-[#edf5f5] text-black flex flex-col justify-center items-center py-12">
              <h1>Respect</h1>
              <Rating
                style={{ maxWidth: 80, color: "yellow" }}
                value={total?.respectRating}
                readOnly={true}
              />
            </div>
            <div className="ml-[2px] bg-[#edf5f5] text-black flex flex-col justify-center items-center py-12">
              <h1>Health</h1>
              <Rating
                style={{ maxWidth: 80, color: "yellow" }}
                value={total?.healthRating}
                readOnly={true}
              />
            </div>
            <div className="ml-[2px] bg-[#edf5f5] text-black flex flex-col justify-center items-center py-12">
              <h1>Privacy</h1>
              <Rating
                style={{ maxWidth: 80, color: "yellow" }}
                value={total?.privacyRating}
                readOnly={true}
              />
            </div>
            <div className="ml-[2px] bg-[#edf5f5] text-black flex flex-col justify-center items-center py-12 rounded-r-[8px]">
              <h1>Repair</h1>
              <Rating
                style={{ maxWidth: 80, color: "yellow" }}
                value={total.repairRating}
                readOnly={true}
              />
            </div>
          </div>
          <p className="text-right mr-5">Based on {reviews?.length} reviews</p>
        </section>

        {/* submit section */}
        <section className="mt-[60px] ml-5 pb-6">
          <h1 className="text-[19px] font-bold">Share your thoughts</h1>
          <p className="text-[14px] text-[#4B5563]">
            If you&rsquo;ve rented in this city, share your experience with
            other tenants.
          </p>
          <Link to={"/submit"}>
            <button className="mt-[15px] bg-[#0d9488] text-white py-2 px-4 rounded-[7px]">
              Submit a review
            </button>
          </Link>
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
              <div className="collapse-title text-xl font-medium">
                Tenants guide to Reviews
              </div>
              <div className="collapse-content">
                <ol className="list-decimal mx-5">
                  <li className="list-item text-base leading-7 text-gray-600">
                    Look for Specific Details: Genuine reviews often contain
                    specific details about the tenant&rsquo;s experience with
                    the landlord. Vague praises, promotional language, or
                    meaningless criticisms might be less trustworthy.
                  </li>
                  <li className="list-item text-base leading-7 text-gray-600">
                    Balance of Reviews: If a negative review is suddenly
                    followed by a highly positive one, take a moment to question
                    this. It&rsquo;s possible for a landlord/company to have
                    both good and bad traits, but drastic shifts in tone might
                    indicate something is amiss.
                  </li>
                  <li className="list-item text-base leading-7 text-gray-600">
                    Frequency of Reviews: A sudden influx of positive reviews
                    after a string of negative ones might be a red flag.
                    Authentic reviews tend to come in at a steady pace over
                    time.
                  </li>
                  <li className="list-item text-base leading-7 text-gray-600">
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
      <div className="min-h-screen flex mx-10 mt-8">
        {/* Left side section */}
        <section className="w-3/12 min-h-screen">
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
                <option value="newest">Newest</option>
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
                className="bg-teal-500 text-white px-4 py-2 rounded-md"
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
        <section className="w-9/12 border">
          {reviews.map((review) => (
            <div key={review?._id} className="m-5 rounded-2xl">
              <div className="mb-5 mx-auto min-h-[350px] shadow-lg border rounded-2xl flex">
                <div className="w-3/12 bg-gray-50 min-h-[350px]  pt-4 flex flex-col items-center justify-start rounded-2xl">
                  <Link
                    to={`/single/landlord/${review?.landlordName}`}
                    className=" w-full text-center px-2 hover:underline"
                  >
                    <h1 className="font-[500] text-[19px]">
                      {review?.landlordName}
                    </h1>
                    <p className="text-center">Read All Reviews</p>
                  </Link>
                  <div>
                    <Rating
                      style={{ maxWidth: 80, color: "yellow" }}
                      value={review?.totalRating}
                      readOnly={true}
                    />
                  </div>
                  <div>
                    <div className="flex mx-2 items-center justify-start mt-4 text-[#6B7280]">
                      <h1>
                        {review?.city}
                        {","}
                      </h1>
                      <h1 className="ml-2">{review?.state}</h1>
                    </div>
                    <div className="flex mx-2 items-center justify-start text-[#6B7280]">
                      <h1>
                        {review?.country}
                        {","}
                      </h1>
                      <h1 className="ml-2">{review?.zipCode}</h1>
                    </div>
                  </div>

                  <div>
                    <h1 className="mt-3 text-[#6B7280]">{review?.date}</h1>
                  </div>

                  {/* Button to open  modal*/}
                  <label
                    htmlFor="my_modal_7"
                    className="mt-10 cursor-pointer border px-6  py-3 rounded-lg shadow-lg"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="text-red-700"
                      width="20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </label>

                  {/* Modal for report */}
                  <input
                    type="checkbox"
                    id="my_modal_7"
                    className="modal-toggle"
                  />
                  <div className="modal" role="dialog">
                    <div className="modal-box text-center rounded-md px-10 w-[380px] ">
                      <div>
                        <h1 className="text-[19px] font-bold mt-5">
                          Report Review
                        </h1>
                        <p className="text-start text-[14px]">
                          Think this review should be removed or altered? Select
                          a reason
                        </p>
                      </div>
                      <select
                        onChange={(e) => {
                          setReport({ ...report, reason: e.target.value });
                        }}
                        className="input input-bordered text-[14px] h-[40px] w-full mt-4"
                      >
                        <option disabled value="">
                          Select a reason...{" "}
                        </option>
                        <option value="Address is in the review">
                          Address is in the review{" "}
                        </option>
                        <option value="Fake review">Fake review </option>
                        <option value="review content inappropriate language">
                          review content inappropriate language{" "}
                        </option>
                        <option value="review content sensitive information">
                          review content sensitive information{" "}
                        </option>
                        <option value="others">Others</option>
                      </select>
                      <div
                        className={`${
                          report?.reason === "others" ? "" : "hidden"
                        }`}
                      >
                        <h1 className="mt-3 text-[13px] text-start">Reason</h1>
                        <textarea
                          className="input input-bordered w-full mt-2 py-2 px-4 text-[13px] h-[100px]"
                          name=""
                          id=""
                          placeholder="Write your reasoning here..."
                        ></textarea>
                        <p className="text-[13px] text-start -mt-[6px]">
                          Limit of 250 Characters: 0/250
                        </p>
                      </div>
                      <div className="mt-4">
                        <button className="border-2 py-2 px-5 text-[13px] rounded-[8px]">
                          Cancel
                        </button>
                        <label
                          className="py-3 cursor-pointer px-5 text-[13px] ml-6 rounded-[8px] bg-teal-600 hover:bg-teal-700 text-white"
                          htmlFor="my_modal_7"
                        >
                          Submit
                        </label>
                      </div>
                    </div>
                    <label className="modal-backdrop" htmlFor="my_modal_7">
                      Close
                    </label>
                  </div>
                </div>
                <div className="w-3/12  min-h-[350px]  pt-4 flex flex-col items-start justify-start px-8">
                  <div className="mt-2">
                    <h1 className="font-[500]">{`Health and Safety`}</h1>
                    <div>
                      <Rating
                        style={{ maxWidth: 80, color: "yellow" }}
                        value={review?.healthRating}
                        readOnly={true}
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <h1 className="font-[500]">{`Respect`}</h1>
                    <div>
                      <Rating
                        style={{ maxWidth: 80, color: "yellow" }}
                        value={review?.respectRating}
                        readOnly={true}
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <h1 className="font-[500]">{`Tenant Privacy`}</h1>
                    <div>
                      <Rating
                        style={{ maxWidth: 80, color: "yellow" }}
                        value={review?.privacyRating}
                        readOnly={true}
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <h1 className="font-[500]">{`Repair`}</h1>
                    <div>
                      <Rating
                        style={{ maxWidth: 80, color: "yellow" }}
                        value={review?.repairRating}
                        readOnly={true}
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <h1 className="font-[500]">{`Rental Stability`}</h1>
                    <div>
                      <Rating
                        style={{ maxWidth: 80, color: "yellow" }}
                        value={review?.rentalRating}
                        readOnly={true}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-6/12  min-h-[350px]  pt-4 flex flex-col items-start justify-start p-3">
                  <h1 className="font-[500] text-[16px]">{`Written Review`}</h1>
                  <p className="mt-5 text-[14px]">{review?.review}</p>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default LocationSinglePage;
