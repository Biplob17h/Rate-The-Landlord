/* eslint-disable react/prop-types */
import { Rating } from "@smastrom/react-rating";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const ReviewSinglePage = ({ review, report, setReport }) => {
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
    <div>
      {/* FOR BIG DEVICE */}
      <div className="m-5 rounded-2xl hidden md:block">
        <div className="mb-5 mx-auto min-h-[350px] shadow-lg border rounded-2xl flex">
          <div className="w-3/12 bg-gray-50 min-h-[350px]  pt-4 flex flex-col items-center justify-start rounded-2xl">
            <Link
              to={`/single/landlord/${review?._id}`}
              className=" w-full text-center px-2 hover:underline"
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
            <div>
              <span className="font-semibold text-[16px]">Street: </span>
              <span className="text-[14px]">{review.street}</span>
            </div>
            <div className="mt-2">
              <span className="font-semibold text-[16px]">City: </span>
              <span className="text-[14px]">{review.city}</span>
            </div>
            <div className="mt-2">
              <span className="font-semibold text-[16px]">State: </span>
              <span className="text-[14px]">{review.state}</span>
            </div>
            <div className="mt-2">
              <span className="font-semibold text-[16px]">Country: </span>
              <span className="text-[14px]">{review.country}</span>
            </div>
            <div className="mt-2">
              <span className="font-semibold text-[16px]">Zip Code: </span>
              <span className="text-[14px]">{review.zipCode}</span>
            </div>

            <Link className="mt-5 hover:underline">Read All Reviews</Link>
          </section>
          <div className="w-6/12  min-h-[350px]  pt-4 flex flex-col items-start justify-start p-3">
            <h1 className="font-[500] text-[16px]">{`Written Review`}</h1>
            <p className="mt-5 text-[14px]">{review?.review}</p>
          </div>
        </div>
      </div>

      {/* **************************************************************** */}
      {/* FOR SMALL DEVICE */}
      <div className="rounded-2xl block md:hidden mb-5">
        <div className="mx-auto  shadow-lg border rounded-2xl flex flex-col md:flex-row">
          <div className="w-full md:w-3/12 bg-gray-50 pt-4 flex flex-col items-center justify-start rounded-2xl pb-2">
            <Link
              to={`/single/landlord/${review?._id}`}
              className="w-full text-center px-2 hover:underline"
            >
              <h1 className="font-semibold text-lg md:text-[19px]">
                {review?.landlordName}
              </h1>
              <p className="text-center text-sm">Read All Reviews</p>
            </Link>
            <div className="mt-3 md:mt-5">
              <Rating
                style={{ maxWidth: 130, color: "yellow" }}
                value={review?.rating}
                readOnly={true}
              />
            </div>

            <div>
              <h1 className="mt-3 text-gray-500 text-sm">{review?.date}</h1>
            </div>

            <label
              htmlFor="my_modal_7"
              className="mt-10 cursor-pointer border px-4 py-2 md:px-6 md:py-3 rounded-lg shadow-lg text-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                className="text-red-700 w-5 h-5"
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
                <p className="text-start text-sm">
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
                  <p className="text-sm text-start -mt-[6px]">
                    Limit of 250 Characters: 0/250
                  </p>
                </div>
                <div className="mt-4">
                  <label
                    className="py-2 md:py-3 cursor-pointer px-4 md:px-5 text-sm rounded-lg border"
                    htmlFor="my_modal_7"
                  >
                    Cancel
                  </label>
                  <label
                    className="py-2 md:py-3 cursor-pointer px-4 md:px-5 text-sm rounded-lg bg-teal-600 hover:bg-teal-700 text-white"
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
          <section className="w-full md:w-3/12 pt-5 flex flex-col items-start justify-start px-5">
            <div>
              <span className="font-semibold">Street:</span>{" "}
              <span className="text-sm">{review.street}</span>
            </div>
            <div className="mt-2">
              <span className="font-semibold">City:</span>{" "}
              <span className="text-sm">{review.city}</span>
            </div>
            <div className="mt-2">
              <span className="font-semibold">State:</span>{" "}
              <span className="text-sm">{review.state}</span>
            </div>
            <div className="mt-2">
              <span className="font-semibold">Country:</span>{" "}
              <span className="text-sm">{review.country}</span>
            </div>
            <div className="mt-2">
              <span className="font-semibold">Zip Code:</span>{" "}
              <span className="text-sm">{review.zipCode}</span>
            </div>
            <Link className="mt-5 hover:underline text-sm">
              Read All Reviews
            </Link>
          </section>

          {/* Right section */}
          <div className="w-full md:w-6/12 pt-4 flex flex-col items-start justify-start p-3">
            <h1 className="font-semibold text-sm md:text-[16px]">
              Written Review
            </h1>
            <p className="mt-5 text-sm">{review?.review}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSinglePage;
