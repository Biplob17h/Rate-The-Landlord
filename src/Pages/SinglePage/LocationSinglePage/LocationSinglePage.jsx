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
    fetch(
      `http://localhost:5000/api/v1/review/single/location/${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setReviews(data?.data);
        setLoading(false);
      });
  }, [id]);

  // count total rating
  const total = countTotalReview(reviews, reviews?.length || 0);
  console.log(total)

  return (
    <div>
      {/* upper section*/}
      <section className="bg-[#f9fafb] w-[90%] mx-auto mt-[40px] rounded-[15px]">
        <div className="text-center pt-[70px]">
          <h1 className="text-[19px] md:text-[36px] font-bold uppercase">
            {reviews[0]?.location}
          </h1>
          <p>
            Read {reviews?.length} reviews  for{" "}
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
          <Link to={"/submit"}>
            <button className="mt-[15px] bg-[#d6cc32] text-white py-2 px-4 rounded-[7px]">
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
        <section className="w-full h-full min-h-screen md:w-3/12">
          <div className="h-full min-h-screen p-5 bg-gray-100">
            <div className="mb-4">
              <input
                type="text"
                name="landlord"
                value={search.landlord}
                onChange={handleInputChange}
                placeholder="Search Community"
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
                <option value="a to z">Name A to Z</option>
                <option value="z to a">Name Z to A</option>
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
                className="px-4 py-2 text-white bg-teal-500 rounded-md"
              >
                Update Filters
              </button>
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-white bg-gray-400 rounded-md"
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
