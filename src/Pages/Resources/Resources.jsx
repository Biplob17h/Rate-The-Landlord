/* eslint-disable no-unused-vars */
import { Rating } from "@smastrom/react-rating";
import React, { useState } from "react";

const Resources = () => {
  // State to store the selected filters
  const [search, setSearch] = useState({
    resources: "",
    sort: "newest",
    country: "",
    state: "",
    city: "",
    zipCode: "",
  });

  const [report, setReport] = useState({
    reason: "Address is in the review",
    otherReason: "",
  });

  const [review, setReview] = useState({
    landlordName: "Md Biplob hossain",
    country: "Australia",
    city: "Dhaka",
    state: "rajshahi",
    zipCode: "112",
    rent: "1800",
    repairRating: "4",
    healthRating: "5",
    rentalRating: "3",
    privacyRating: "2",
    respectRating: "5",
    review: "this is a review",
    date: "1/2/1010",
  });

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
  };

  // Handle updating the filters
  const updateFilters = () => {
    // You can add functionality here to update the list of reviews
  };
  return (
    <div className="">
      {/************ Resources page upper text section ************/}

      <section className="text-center mt-[70px] w-[88%] mx-auto">
        <h1 className="text-4xl font-[800]">Resources</h1>
        <p className="text-[#6B7280] text-xl my-[50px]">
          Need support? Consider joining your local tenant union!
        </p>
        <p className="text-[#6B7280] text-xl mb-[50px]">
          Tenant unions and advocacy groups play an important role in empowering
          renters by providing support, information, and resources to help them
          understand their rights and responsibilities. By joining a local
          tenant union, you can connect with others in your community and work
          together to address common issues and concerns.
        </p>
        <p className="text-[#6B7280] text-xl mb-[25px] text-start">
          To join a tenant union, begin by searching for local organizations in
          your state/province/region or territory
        </p>
      </section>

      {/************ Resources page main section ************/}
      <div className="block min-h-screen mx-10 mt-8 md:flex">
        {/* Left side section */}
        <section className="w-full md:w-3/12 md:min-h-screen ">
          <div className="h-full p-5 mb-5 bg-gray-100 md:min-h-screen md:mb-0">
            <div className="mb-2 md:mb-4">
              <input
                type="text"
                name="resources"
                value={search.resources}
                onChange={handleInputChange}
                placeholder="Search Resources"
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
                className="w-full p-2 border border-gray-300 rounded-md "
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
                className="px-4 py-2 text-white bg-gray-400 rounded-md"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </section>
        {/* Right side section */}
        <section className="w-full md:w-9/12 md:border">
          <div className="grid grid-cols-1 md:grid-cols-3 md:mx-5 md:my-5 md:gap-5">
            {/* single div */}
            <div className="h-[560px] w-full border rounded-md shadow-md cursor-pointer hover:border-[#d6cc32] mb-5 md:mb-0">
              <div>
                <div className="flex justify-center items-center flex-col h-[100px] rounded-t-[6px] border bg-[#f9fafb]">
                  <h1 className="text-[#111827] text-[20px]">TENANTS REVOLT</h1>
                  <p>WASHINGTON,US</p>
                </div>
                <div className="h-full px-4 text-[14px] leading-6 pt-5">
                  <p>
                    Living Rent is Scotland&rsquo;s tenants and community union.
                    We are a mass-membership union of tenants, carers, workers
                    and residents, rooted in working-class struggle. We organise
                    collectively to build the power to secure material
                    improvements to our daily lives and put power back where it
                    belongs: in the hands of ordinary people. We build this
                    power to fight for better rights and better protections
                    against rent increases, evictions, lack of public services,
                    high energy bills, pollution and poor-quality housing. We
                    know our current political system is failing ordinary people
                    and we refuse to wait for politicians or charities to change
                    things for the better.{" "}
                  </p>
                </div>
              </div>
            </div>
            {/* single div */}
            <div className="h-[560px] w-full border rounded-md shadow-md cursor-pointer hover:border-[#d6cc32] mb-5 md:mb-0">
              <div>
                <div className="flex justify-center items-center flex-col h-[100px] rounded-t-[6px] border bg-[#f9fafb]">
                  <h1 className="text-[#111827] text-[20px]">TENANTS REVOLT</h1>
                  <p>WASHINGTON,US</p>
                </div>
                <div className="h-full px-4 text-[14px] leading-6 pt-5">
                  <p>
                    Living Rent is Scotland&rsquo;s tenants and community union.
                    We are a mass-membership union of tenants, carers, workers
                    and residents, rooted in working-class struggle. We organise
                    collectively to build the power to secure material
                    improvements to our daily lives and put power back where it
                    belongs: in the hands of ordinary people. We build this
                    power to fight for better rights and better protections
                    against rent increases, evictions, lack of public services,
                    high energy bills, pollution and poor-quality housing. We
                    know our current political system is failing ordinary people
                    and we refuse to wait for politicians or charities to change
                    things for the better.{" "}
                  </p>
                </div>
              </div>
            </div>
            {/* single div */}
            <div className="h-[560px] w-full border rounded-md shadow-md cursor-pointer hover:border-[#d6cc32] mb-5 md:mb-0">
              <div>
                <div className="flex justify-center items-center flex-col h-[100px] rounded-t-[6px] border bg-[#f9fafb]">
                  <h1 className="text-[#111827] text-[20px]">TENANTS REVOLT</h1>
                  <p>WASHINGTON,US</p>
                </div>
                <div className="h-full px-4 text-[14px] leading-6 pt-5">
                  <p>
                    Living Rent is Scotland&rsquo;s tenants and community union.
                    We are a mass-membership union of tenants, carers, workers
                    and residents, rooted in working-class struggle. We organise
                    collectively to build the power to secure material
                    improvements to our daily lives and put power back where it
                    belongs: in the hands of ordinary people. We build this
                    power to fight for better rights and better protections
                    against rent increases, evictions, lack of public services,
                    high energy bills, pollution and poor-quality housing. We
                    know our current political system is failing ordinary people
                    and we refuse to wait for politicians or charities to change
                    things for the better.{" "}
                  </p>
                </div>
              </div>
            </div>
            {/* single div */}
            <div className="h-[560px] w-full border rounded-md shadow-md cursor-pointer hover:border-[#d6cc32] mb-5 md:mb-0">
              <div>
                <div className="flex justify-center items-center flex-col h-[100px] rounded-t-[6px] border bg-[#f9fafb]">
                  <h1 className="text-[#111827] text-[20px]">TENANTS REVOLT</h1>
                  <p>WASHINGTON,US</p>
                </div>
                <div className="h-full px-4 text-[14px] leading-6 pt-5">
                  <p>
                    Living Rent is Scotland&rsquo;s tenants and community union.
                    We are a mass-membership union of tenants, carers, workers
                    and residents, rooted in working-class struggle. We organise
                    collectively to build the power to secure material
                    improvements to our daily lives and put power back where it
                    belongs: in the hands of ordinary people. We build this
                    power to fight for better rights and better protections
                    against rent increases, evictions, lack of public services,
                    high energy bills, pollution and poor-quality housing. We
                    know our current political system is failing ordinary people
                    and we refuse to wait for politicians or charities to change
                    things for the better.{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Resources;
