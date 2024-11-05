/* eslint-disable no-unused-vars */
import { Rating } from "@smastrom/react-rating";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import countTotalReview from "../../../components/CountTotal";
import LocationMapSinglePage from "./LocationMapSinglePage";

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
    
  };

  useEffect(() => {
    setLoading(true);
    fetch(`https://rate-the-landlord-server-1.onrender.com/api/v1/review/single/location/${id}`)
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
        <section className="w-3/12 min-h-screen h-full">
          <div className="p-5 bg-gray-100 min-h-screen h-full">
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
            <LocationMapSinglePage 
            key={review?._id}
            review={review}
             />
          ))}
        </section>
      </div>
    </div>
  );
};

export default LocationSinglePage;
