/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SubmitInputForm = ({ review, setReview, step, setStep }) => {
  const [landlordName, setLandlordName] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showLandlord, setShowLandlord] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://rate-the-landlord-server-1.onrender.com/api/v1/review/all/landlordName?landlordName=${landlordName}`
    )
      .then((response) => response.json())
      .then((data) => {
        setReviews(data?.data);
        setLoading(false);
      });
  }, [landlordName]);
  return (
    <div className="text-start px-[5%]">
      {/********** Landlord section **********/}
      <section className={`${step === 1 ? "" : "hidden"} `}>
        <h1 className="font-bold text-[16px] mt-10">Landlord</h1>
        <p className="text-[14px] mt-3">
          Enter the name of your Community or property management company as it
          appears on your lease. Double-check the spelling before you submit so
          your review can be matched with other reviews for this community. Do
          not include the full address, all addresses will be removed.
        </p>

        {/* Landlord Input */}
        <div className="">
          <p className="text-[14px] mt-3">Community Name</p>
          <input
            placeholder="Community Name"
            value={landlordName}
            type="text"
            className="w-full border p-2 mt-1 relative"
            onChange={(e) => {
              setReview({
                ...review,
                landlordName: e.target.value.toUpperCase(),
              });
              setLandlordName(e.target.value);
              setShowLandlord(true);
            }}
          />
        </div>
        <div
          className={`h-[200px] w-[60.5%] absolute rounded-md border top-[426px] left-[5%] bg-white ${
            landlordName === "" ? "hidden" : ""
          }`}
        >
          <div className="w-full h-[50px] bg-gray-50 hover:bg-[#d6cc32] flex items-center pl-[2%] cursor-pointer rounded-md">
            <h1 className="text-[17px]">Searching for {landlordName}</h1>
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <span>Loading...</span>
            </div>
          ) : (
            <div>
              {/* Conditional rendering based on review length */}
              {review && review.length && showLandlord > 0 ? (
                <div>
                  <h1>Welcome</h1>
                </div>
              ) : (
                <div >
                  {reviews?.map((review) => (
                    <div
                      key={review?._id}
                      className="w-full h-[50px] bg-gray-50 hover:bg-[#d6cc32] flex items-center pl-[2%] cursor-pointer rounded-md"
                      onClick={() => {
                        setLandlordName(review?.landlordName);
                        setShowLandlord(false);
                      }}
                    >
                      <h1 className="text-[17px]">{review?.landlordName}</h1>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Continue Button */}
        <div className="flex justify-end my-5">
          <button
            onClick={() => {
              setStep((prevStep) => prevStep + 1);
            }}
            disabled={review?.landlordName === ""}
            className={`px-4 py-2 rounded-md  text-white cursor-pointer ${
              review?.landlordName === "" ? "bg-[#99f6e4]" : "bg-teal-600"
            }`}
          >
            Continue
          </button>
        </div>
      </section>

      {/* ******** Location section  *********/}
      <section className={`${step === 2 ? "" : "hidden"} `}>
        <h1 className="font-bold text-[16px]">Location</h1>
        {/* Location Input */}
        <div>
          <div className="flex mr-5">
            <div className="w-1/2">
              <p className="text-[14px] mt-3">Country</p>
              <select
                onChange={(e) => {
                  setReview({ ...review, country: e.target.value });
                }}
                name=""
                id=""
                className="w-full border p-2 mt-1"
              >
                <option value="" disabled>
                  Select Country
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
            <div className="w-1/2 ml-5">
              <p className="text-[14px] mt-3">City</p>
              <input
                placeholder="City"
                type="text"
                className="w-full border p-2 mt-1"
                onChange={(e) => {
                  setReview({ ...review, city: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="flex mr-5">
            <div className="w-1/2">
              <p className="text-[14px] mt-3">State / Province</p>
              <input
                placeholder="State / Province"
                type="text"
                className="w-full border p-2 mt-1"
                onChange={(e) => {
                  setReview({ ...review, state: e.target.value });
                }}
              />
            </div>
            <div className="w-1/2 ml-5">
              <p className="text-[14px] mt-3">ZIP / Postal Code </p>
              <input
                placeholder="ZIP / Postal Code"
                type="number"
                className="w-full border p-2 mt-1"
                onChange={(e) => {
                  setReview({ ...review, zipCode: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="flex mr-10">
            <div className="w-1/2">
              <p className="text-[14px] mt-3">Rent Amount (Optional)</p>
              <input
                placeholder="Rent Amount (Optional)"
                type="number"
                className="w-full border p-2 mt-1"
                onChange={(e) => {
                  setReview({ ...review, rent: e.target.value });
                }}
              />
            </div>
          </div>
        </div>
        {/* Continue Button */}
        <div className="flex justify-end my-5">
          <button
            onClick={() => {
              setStep((prevStep) => prevStep + 1);
            }}
            disabled={
              review?.city === "" ||
              review?.state === "" ||
              review?.zipCode === ""
            }
            className={`px-4 py-2 rounded-md  text-white cursor-pointer ${
              review?.city === "" ||
              review?.state === "" ||
              review?.zipCode === ""
                ? "bg-[#99f6e4]"
                : "bg-teal-600"
            }`}
          >
            Continue
          </button>
        </div>
      </section>
      {/* ******** review section  *********/}
      <section className={`${step === 3 ? "" : "hidden"} `}>
        <h1 className="font-bold text-[16px]">Rating Form</h1>
        <p className="text-[14px] mt-2">
          Please rate the following on a scale from 1 (worst) to 5 (best)
        </p>
        {/* review Input */}
        <div>
          {/* Repair Rating */}
          <div>
            <h1 className="font-bold text-[16px] mt-3">Repair Rating</h1>
            <p className="text-[12px] text-[#6B7280]">
              Landlords have a legal obligation to keep the rental property in a
              safe and habitable condition. Tenants should receive timely
              repairs by trained professionals to keep their vital systems like
              plumbing and heating in order.
            </p>
            <div className="border-2 border-teal-600 h-[55px] mt-3 rounded-[30px] grid grid-cols-5">
              <div
                onClick={() => {
                  setReview({ ...review, repairRating: "1" });
                }}
                className={`border-r-[2px] border-r-teal-600 flex justify-center items-center cursor-pointer hover:bg-teal-50 rounded-l-[30px] ${
                  review?.repairRating === "1"
                    ? "bg-teal-600 hover:bg-teal-600"
                    : ""
                }`}
              >
                1
              </div>
              <div
                onClick={() => {
                  setReview({ ...review, repairRating: "2" });
                }}
                className={`border-r-[2px] border-r-teal-600 flex justify-center items-center cursor-pointer hover:bg-teal-50  ${
                  review?.repairRating === "2"
                    ? "bg-teal-600 hover:bg-teal-600"
                    : ""
                }`}
              >
                2
              </div>
              <div
                onClick={() => {
                  setReview({ ...review, repairRating: "3" });
                }}
                className={`border-r-[2px] border-r-teal-600 flex justify-center items-center cursor-pointer hover:bg-teal-50  ${
                  review?.repairRating === "3"
                    ? "bg-teal-600 hover:bg-teal-600"
                    : ""
                }`}
              >
                3
              </div>
              <div
                onClick={() => {
                  setReview({ ...review, repairRating: "4" });
                }}
                className={`border-r-[2px] border-r-teal-600 flex justify-center items-center cursor-pointer hover:bg-teal-50  ${
                  review?.repairRating === "4"
                    ? "bg-teal-600 hover:bg-teal-600"
                    : ""
                }`}
              >
                4
              </div>
              <div
                onClick={() => {
                  setReview({ ...review, repairRating: "5" });
                }}
                className={`flex justify-center items-center cursor-pointer hover:bg-teal-50  rounded-r-[30px] ${
                  review?.repairRating === "5"
                    ? "bg-teal-600 hover:bg-teal-600"
                    : ""
                }`}
              >
                5
              </div>
            </div>
          </div>
          {/* Health and Safety Rating */}
          <div>
            <h1 className="font-bold text-[16px] mt-3">
              Health and Safety Rating
            </h1>
            <p className="text-[12px] text-[#6B7280]">
              Landlords must ensure that the rental property complies with local
              health and safety standards, such as maintaining smoke detectors,
              removing mold, and employing pest control when necessary.
            </p>
            <div className="border-2 border-teal-600 h-[55px] mt-3 rounded-[30px] grid grid-cols-5">
              <div
                onClick={() => {
                  setReview({ ...review, healthRating: "1" });
                }}
                className={`border-r-[2px] border-r-teal-600 flex justify-center items-center cursor-pointer hover:bg-teal-50 rounded-l-[30px] ${
                  review?.healthRating === "1"
                    ? "bg-teal-600 hover:bg-teal-600"
                    : ""
                }`}
              >
                1
              </div>
              <div
                onClick={() => {
                  setReview({ ...review, healthRating: "2" });
                }}
                className={`border-r-[2px] border-r-teal-600 flex justify-center items-center cursor-pointer hover:bg-teal-50  ${
                  review?.healthRating === "2"
                    ? "bg-teal-600 hover:bg-teal-600"
                    : ""
                }`}
              >
                2
              </div>
              <div
                onClick={() => {
                  setReview({ ...review, healthRating: "3" });
                }}
                className={`border-r-[2px] border-r-teal-600 flex justify-center items-center cursor-pointer hover:bg-teal-50  ${
                  review?.healthRating === "3"
                    ? "bg-teal-600 hover:bg-teal-600"
                    : ""
                }`}
              >
                3
              </div>
              <div
                onClick={() => {
                  setReview({ ...review, healthRating: "4" });
                }}
                className={`border-r-[2px] border-r-teal-600 flex justify-center items-center cursor-pointer hover:bg-teal-50  ${
                  review?.healthRating === "4"
                    ? "bg-teal-600 hover:bg-teal-600"
                    : ""
                }`}
              >
                4
              </div>
              <div
                onClick={() => {
                  setReview({ ...review, healthRating: "5" });
                }}
                className={`flex justify-center items-center cursor-pointer hover:bg-teal-50  rounded-r-[30px] ${
                  review?.healthRating === "5"
                    ? "bg-teal-600 hover:bg-teal-600"
                    : ""
                }`}
              >
                5
              </div>
            </div>
          </div>
          {/* Rental Stability Rating */}
          <div>
            <h1 className="font-bold text-[16px] mt-3">
              Rental Stability Rating
            </h1>
            <p className="text-[12px] text-[#6B7280]">
              Landlords must abide by rental agreements and not engage in
              practices that would disrupt the tenant&rsquo;s rental stability,
              such as unjustified rent increases or arbitrary evictions.
            </p>
            <div className="border-2 border-teal-600 h-[55px] mt-3 rounded-[30px] grid grid-cols-5">
              <div
                onClick={() => {
                  setReview({ ...review, rentalRating: "1" });
                }}
                className={`border-r-[2px] border-r-teal-600 flex justify-center items-center cursor-pointer hover:bg-teal-50 rounded-l-[30px] ${
                  review?.rentalRating === "1"
                    ? "bg-teal-600 hover:bg-teal-600"
                    : ""
                }`}
              >
                1
              </div>
              <div
                onClick={() => {
                  setReview({ ...review, rentalRating: "2" });
                }}
                className={`border-r-[2px] border-r-teal-600 flex justify-center items-center cursor-pointer hover:bg-teal-50  ${
                  review?.rentalRating === "2"
                    ? "bg-teal-600 hover:bg-teal-600"
                    : ""
                }`}
              >
                2
              </div>
              <div
                onClick={() => {
                  setReview({ ...review, rentalRating: "3" });
                }}
                className={`border-r-[2px] border-r-teal-600 flex justify-center items-center cursor-pointer hover:bg-teal-50  ${
                  review?.rentalRating === "3"
                    ? "bg-teal-600 hover:bg-teal-600"
                    : ""
                }`}
              >
                3
              </div>
              <div
                onClick={() => {
                  setReview({ ...review, rentalRating: "4" });
                }}
                className={`border-r-[2px] border-r-teal-600 flex justify-center items-center cursor-pointer hover:bg-teal-50  ${
                  review?.rentalRating === "4"
                    ? "bg-teal-600 hover:bg-teal-600"
                    : ""
                }`}
              >
                4
              </div>
              <div
                onClick={() => {
                  setReview({ ...review, rentalRating: "5" });
                }}
                className={`flex justify-center items-center cursor-pointer hover:bg-teal-50  rounded-r-[30px] ${
                  review?.rentalRating === "5"
                    ? "bg-teal-600 hover:bg-teal-600"
                    : ""
                }`}
              >
                5
              </div>
            </div>
          </div>
          {/* Tenant Privacy Rating */}
          <div>
            <h1 className="font-bold text-[16px] mt-3">
              Tenant Privacy Rating
            </h1>
            <p className="text-[12px] text-[#6B7280]">
              Landlords must respect their tenants&rsquo; privacy, and may only
              enter the rental property with the tenant&rsquo;s consent or for
              specific reasons outlined in the rental agreement. Landlords
              should also refrain from probing into the personal lives of their
              tenants or asking for information that is not necessary to form a
              professional rental agreement.
            </p>
            <div className="border-2 border-teal-600 h-[55px] mt-3 rounded-[30px] grid grid-cols-5">
              <div
                onClick={() => {
                  setReview({ ...review, privacyRating: "1" });
                }}
                className={`border-r-[2px] border-r-teal-600 flex justify-center items-center cursor-pointer hover:bg-teal-50 rounded-l-[30px] ${
                  review?.privacyRating === "1"
                    ? "bg-teal-600 hover:bg-teal-600"
                    : ""
                }`}
              >
                1
              </div>
              <div
                onClick={() => {
                  setReview({ ...review, privacyRating: "2" });
                }}
                className={`border-r-[2px] border-r-teal-600 flex justify-center items-center cursor-pointer hover:bg-teal-50  ${
                  review?.privacyRating === "2"
                    ? "bg-teal-600 hover:bg-teal-600"
                    : ""
                }`}
              >
                2
              </div>
              <div
                onClick={() => {
                  setReview({ ...review, privacyRating: "3" });
                }}
                className={`border-r-[2px] border-r-teal-600 flex justify-center items-center cursor-pointer hover:bg-teal-50  ${
                  review?.privacyRating === "3"
                    ? "bg-teal-600 hover:bg-teal-600"
                    : ""
                }`}
              >
                3
              </div>
              <div
                onClick={() => {
                  setReview({ ...review, privacyRating: "4" });
                }}
                className={`border-r-[2px] border-r-teal-600 flex justify-center items-center cursor-pointer hover:bg-teal-50  ${
                  review?.privacyRating === "4"
                    ? "bg-teal-600 hover:bg-teal-600"
                    : ""
                }`}
              >
                4
              </div>
              <div
                onClick={() => {
                  setReview({ ...review, privacyRating: "5" });
                }}
                className={`flex justify-center items-center cursor-pointer hover:bg-teal-50  rounded-r-[30px] ${
                  review?.privacyRating === "5"
                    ? "bg-teal-600 hover:bg-teal-600"
                    : ""
                }`}
              >
                5
              </div>
            </div>
          </div>
          {/* Respect Rating */}
          <div>
            <h1 className="font-bold text-[16px] mt-3">Respect Rating</h1>
            <p className="text-[12px] text-[#6B7280]">
              Landlords must treat their tenants with respect, and must not
              engage in behavior that would violate the tenant&rsquo;s rights,
              such as discrimination or harassment.
            </p>
            <div className="border-2 border-teal-600 h-[55px] mt-3 rounded-[30px] grid grid-cols-5">
              <div
                onClick={() => {
                  setReview({ ...review, respectRating: "1" });
                }}
                className={`border-r-[2px] border-r-teal-600 flex justify-center items-center cursor-pointer hover:bg-teal-50 rounded-l-[30px] ${
                  review?.respectRating === "1"
                    ? "bg-teal-600 hover:bg-teal-600"
                    : ""
                }`}
              >
                1
              </div>
              <div
                onClick={() => {
                  setReview({ ...review, respectRating: "2" });
                }}
                className={`border-r-[2px] border-r-teal-600 flex justify-center items-center cursor-pointer hover:bg-teal-50  ${
                  review?.respectRating === "2"
                    ? "bg-teal-600 hover:bg-teal-600"
                    : ""
                }`}
              >
                2
              </div>
              <div
                onClick={() => {
                  setReview({ ...review, respectRating: "3" });
                }}
                className={`border-r-[2px] border-r-teal-600 flex justify-center items-center cursor-pointer hover:bg-teal-50  ${
                  review?.respectRating === "3"
                    ? "bg-teal-600 hover:bg-teal-600"
                    : ""
                }`}
              >
                3
              </div>
              <div
                onClick={() => {
                  setReview({ ...review, respectRating: "4" });
                }}
                className={`border-r-[2px] border-r-teal-600 flex justify-center items-center cursor-pointer hover:bg-teal-50  ${
                  review?.respectRating === "4"
                    ? "bg-teal-600 hover:bg-teal-600"
                    : ""
                }`}
              >
                4
              </div>
              <div
                onClick={() => {
                  setReview({ ...review, respectRating: "5" });
                }}
                className={`flex justify-center items-center cursor-pointer hover:bg-teal-50  rounded-r-[30px] ${
                  review?.respectRating === "5"
                    ? "bg-teal-600 hover:bg-teal-600"
                    : ""
                }`}
              >
                5
              </div>
            </div>
          </div>
        </div>
        {/* Continue Button */}
        <div className="flex justify-end my-5">
          <button
            onClick={() => {
              setStep((prevStep) => prevStep + 1);
            }}
            disabled={review?.landlordName === ""}
            className={`px-4 py-2 rounded-md  text-white cursor-pointer ${
              review?.landlordName === "" ? "bg-[#99f6e4]" : "bg-teal-600"
            }`}
          >
            Continue
          </button>
        </div>
      </section>

      {/* ******** Written Review section  *********/}
      <section className={`${step === 4 ? "" : "hidden"} text-[#4B5563]`}>
        {/* Written Review Text */}
        <h1 className="font-bold text-[16px] text-black">Written Review</h1>
        <p className="text-[14px] mt-3">Please follow our moderation policy:</p>
        <p className="text-[14px] mt-3">
          1. Keep reviews civil and avoid including personal information such as
          addresses or phone numbers.
        </p>
        <p className="text-[14px] mt-3">
          2. Avoid sharing personal details about yourself or your landlord that
          are not relevant to your rental experience.
        </p>
        <p className="text-[14px] mt-3">
          3. Inappropriate content may be removed. Thank you for maintaining a
          safe and helpful community!
        </p>
        {/* Written Review Input */}
        <div>
          <p className="text-[14px] mt-3">
            Written Review (max 2000 characters)
          </p>
          <textarea
            onChange={(e) => {
              setReview({ ...review, review: e.target.value });
            }}
            className="w-full input input-bordered p-3 min-h-[150px] mt-1 text-black"
          ></textarea>
        </div>
        {/* Continue Button */}
        <div className="flex justify-end my-5">
          <button
            onClick={() => {
              setStep((prevStep) => prevStep + 1);
            }}
            disabled={review?.review === ""}
            className={`px-4 py-2 rounded-md  text-white cursor-pointer ${
              review?.review === "" ? "bg-[#99f6e4]" : "bg-teal-600"
            }`}
          >
            Preview Review
          </button>
        </div>
      </section>
      <div
        className={`h-[2px] w-full bg-[#0d9488] mb-[300px] ${
          step > 4 ? "hidden" : ""
        }`}
      ></div>
    </div>
  );
};

export default SubmitInputForm;
