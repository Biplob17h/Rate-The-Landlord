/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Rating } from "@smastrom/react-rating";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import countTotalReview from "../../../components/CountTotal";

const LocationMapSinglePage = ({ review }) => {
  // set report
  const [report, setReport] = useState({
    reason: "Address is in the review",
    otherReason: "",
  });
  const handleReportSubmit = () => {
    const reportData = {
      review: review?._id,
      report: report.report,
    };
    fetch(`http://localhost:5000/api/v1/report/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reportData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.status === "success") {
          toast.success("Report successfully submitted");
        }
      });
  };

  
  return (
    <div>
      {/* FOR BIG DEVICE */}
      <div className="hidden m-5 rounded-2xl md:block">
        <div className="mb-5 mx-auto min-h-[350px] shadow-lg border rounded-2xl flex">
          <div className="w-3/12 bg-gray-50 min-h-[350px]  pt-4 flex flex-col items-center justify-start rounded-2xl">
            <Link
              to={`/single/landlord/${review?._id}`}
              className="w-full px-2 text-center hover:underline"
            >
              <h1 className="font-[500] text-[19px]">{review?.landlordName}</h1>
              <p className="text-center">Read All Reviews</p>
            </Link>
            <div className="mt-5">
              <Rating
                style={{ maxWidth: 130, color: "yellow" }}
                value={review?.rating}
                readOnly={true}
              />
            </div>

            <div>
              <h1 className="mt-3 text-[#6B7280]">{review?.date}</h1>
            </div>

            {/* Button to open  modal*/}
            <label
              htmlFor="my_modal_7"
              className="px-6 py-3 mt-10 border rounded-lg shadow-lg cursor-pointer"
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
            <input type="checkbox" id="my_modal_7" className="modal-toggle" />
            <div className="modal" role="dialog">
              <div className="modal-box text-center rounded-md px-10 w-[380px] ">
                <div>
                  <h1 className="text-[19px] font-bold mt-5">Report Review</h1>
                  <p className="text-start text-[14px]">
                    Think this review should be removed or altered? Select a
                    reason
                  </p>
                </div>
                <select
                  onChange={(e) => {
                    setReport({
                      reason: e.target.value,
                      report: e.target.value,
                    });
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
                  className={`${report?.reason === "others" ? "" : "hidden"}`}
                >
                  <h1 className="mt-3 text-[13px] text-start">Reason</h1>
                  <textarea
                    onChange={(e) => {
                      setReport({ ...report, report: e.target.value });
                    }}
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
                  <label
                    className="py-3 cursor-pointer px-5 text-[13px] ml-6 rounded-[8px] border"
                    htmlFor="my_modal_7"
                  >
                    Cancel
                  </label>
                  <label
                    className="py-3 cursor-pointer px-5 text-[13px] ml-6 rounded-[8px] bg-teal-600 hover:bg-teal-700 text-white"
                    htmlFor="my_modal_7"
                    onClick={() => {
                      handleReportSubmit();
                    }}
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

          {/* mid section */}
          <section className="w-3/12  min-h-[350px]  pt-5 flex flex-col items-start justify-start px-5">
            {/* Street */}
            <div className={review?.street === "" ? "hidden" : "mt-2 "}>
              <span className="font-semibold text-[16px]">Street: </span>
              <span className="text-[14px]">{review.street}</span>
            </div>

            {/* District */}
            <div className={review?.district === "" ? "hidden" : "mt-2 "}>
              <span className="font-semibold text-[16px]">District: </span>
              <span className="text-[14px]">{review.district}</span>
            </div>

            {/* City */}
            <div className={review?.city === "" ? "hidden" : "mt-2 "}>
              <span className="font-semibold text-[16px]">City: </span>
              <span className="text-[14px]">{review.city}</span>
            </div>

            {/* State */}
            <div className={review?.state === "" ? "hidden" : "mt-2 "}>
              <span className="font-semibold text-[16px]">State: </span>
              <span className="text-[14px]">{review.state}</span>
            </div>

            {/* Country */}
            <div className={review?.country === "" ? "hidden" : "mt-2 "}>
              <span className="font-semibold text-[16px]">Country: </span>
              <span className="text-[14px]">{review.country}</span>
            </div>

            {/* Zip Code */}
            <div className={review?.zipCode === "" ? "hidden" : "mt-2 "}>
              <span className="font-semibold text-[16px]">Zip Code: </span>
              <span className="text-[14px]">{review.zipCode}</span>
            </div>
          </section>
          <div className="w-6/12  min-h-[350px]  pt-4 flex flex-col items-start justify-start p-3">
            <h1 className="font-[500] text-[16px]">{`Written Review`}</h1>
            <p className="mt-5 text-[14px]">{review?.review}</p>
          </div>
        </div>
      </div>

      {/* **************************************************************** */}
      {/* FOR SMALL DEVICE */}
      <div className="block mb-5 rounded-2xl md:hidden">
        <div className="flex flex-col mx-auto border shadow-lg rounded-2xl md:flex-row">
          <div className="flex flex-col items-center justify-start w-full pt-4 pb-2 md:w-3/12 bg-gray-50 rounded-2xl">
            <Link
              to={`/single/landlord/${review?._id}`}
              className="w-full px-2 text-center hover:underline"
            >
              <h1 className="font-semibold text-lg md:text-[19px]">
                {review?.landlordName}
              </h1>
              <p className="text-sm text-center">Read All Reviews</p>
            </Link>
            <div className="mt-3 md:mt-5">
              <Rating
                style={{ maxWidth: 130, color: "yellow" }}
                value={review?.rating}
                readOnly={true}
              />
            </div>

            <div>
              <h1 className="mt-3 text-sm text-gray-500">{review?.date}</h1>
            </div>

            <label
              htmlFor="my_modal_7"
              className="px-4 py-2 mt-10 text-sm border rounded-lg shadow-lg cursor-pointer md:px-6 md:py-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                className="w-5 h-5 text-red-700"
              >
                <path
                  fillRule="evenodd"
                  d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </label>

            {/* Modal for report */}
            <input type="checkbox" id="my_modal_7" className="modal-toggle" />
            <div className="modal">
              <div className="modal-box text-center rounded-md px-6 md:px-10 w-full md:w-[380px]">
                <h1 className="text-lg md:text-[19px] font-bold mt-3 md:mt-5">
                  Report Review
                </h1>
                <p className="text-sm text-start">
                  Think this review should be removed or altered? Select a
                  reason
                </p>
                <select
                  onChange={(e) =>
                    setReport({
                      reason: e.target.value,
                      report: e.target.value,
                    })
                  }
                  className="input input-bordered text-sm h-[40px] w-full mt-4"
                >
                  <option disabled value="">
                    Select a reason...
                  </option>
                  <option value="Address is in the review">
                    Address is in the review
                  </option>
                  <option value="Fake review">Fake review</option>
                  <option value="review content inappropriate language">
                    Inappropriate language
                  </option>
                  <option value="review content sensitive information">
                    Sensitive information
                  </option>
                  <option value="others">Others</option>
                </select>
                <div
                  className={`${report?.reason === "others" ? "" : "hidden"}`}
                >
                  <h1 className="mt-3 text-sm text-start">Reason</h1>
                  <textarea
                    onChange={(e) =>
                      setReport({ ...report, report: e.target.value })
                    }
                    className="input input-bordered w-full mt-2 py-2 px-4 text-sm h-[100px]"
                    placeholder="Write your reasoning here..."
                  ></textarea>
                </div>
                <div className="mt-4">
                  <label
                    className="px-4 py-2 text-sm border rounded-lg cursor-pointer md:py-3 md:px-5"
                    htmlFor="my_modal_7"
                  >
                    Cancel
                  </label>
                  <label
                    className="px-4 py-2 text-sm text-white bg-teal-600 rounded-lg cursor-pointer md:py-3 md:px-5 hover:bg-teal-700"
                    htmlFor="my_modal_7"
                    onClick={() => handleReportSubmit()}
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

          {/* mid section */}
          <section className="flex flex-col items-start justify-start w-full px-5 pt-5 md:w-3/12">
            {/* Street */}
            <div className={review?.street === "" ? "hidden" : "mt-1 "}>
              <span className="font-semibold">Street:</span>{" "}
              <span className="text-sm">{review?.street}</span>
            </div>

            {/* City */}
            <div className={review?.city === "" ? "hidden" : "mt-1 "}>
              <span className="font-semibold">City:</span>{" "}
              <span className="text-sm">{review?.city}</span>
            </div>

            {/* State */}
            <div className={review?.state === "" ? "hidden" : "mt-1 "}>
              <span className="font-semibold">State:</span>{" "}
              <span className="text-sm">{review.state}</span>
            </div>

            {/* Country */}
            <div className={review?.country === "" ? "hidden" : "mt-1 "}>
              <span className="font-semibold">Country:</span>{" "}
              <span className="text-sm">{review.country}</span>
            </div>

            {/* Zip Code */}
            <div className={review?.zipCode === "" ? "hidden" : "mt-1 "}>
              <span className="font-semibold">Zip Code:</span>{" "}
              <span className="text-sm">{review.zipCode}</span>
            </div>
          </section>

          {/* Right section */}
          <div className="flex flex-col items-start justify-start w-full p-5 px-5 pt-10 md:w-6/12">
            <h1 className="font-semibold text-sm md:text-[16px]">
              Written Review
            </h1>
            <p className="mt-1 text-sm">{review?.review}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationMapSinglePage;
