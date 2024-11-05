/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Rating } from "@smastrom/react-rating";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

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
    fetch(`https://rate-the-landlord-server-1.onrender.com/api/v1/report/create`, {
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
    <div key={review?._id} className="m-5 rounded-2xl">
      <div className="mb-5 mx-auto min-h-[350px] shadow-lg border rounded-2xl flex">
        <div className="w-3/12 bg-gray-50 min-h-[350px]  pt-4 flex flex-col items-center justify-start rounded-2xl">
          <Link
            to={`/single/landlord/${review?.landlordName}`}
            className=" w-full text-center px-2 hover:underline"
          >
            <h1 className="font-[500] text-[19px]">{review?.landlordName}</h1>
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
                  setReport({ reason: e.target.value, report: e.target.value });
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
              <div className={`${report?.reason === "others" ? "" : "hidden"}`}>
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
              <div className={`${report?.reason === "others" ? "" : "hidden"}`}>
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
  );
};

export default LocationMapSinglePage;
