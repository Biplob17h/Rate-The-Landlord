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
          <div className="w-5/12 bg-gray-50 min-h-[350px] pt-6 flex flex-col items-center justify-start rounded-2xl">
            <Link
              to={`/single/landlord/${review?._id}`}
              className="w-full text-center px-2 hover:underline"
            >
              <h1 className="font-semibold text-xl">{review?.landlordName}</h1>
              <p className="text-center text-sm text-gray-600">
                Read All Reviews
              </p>
            </Link>
            <Link
              onClick={() => {
                window.scrollTo(0, 0);
              }}
              to={`/single/location/${review?._id}`}
              className="w-full text-center px-2 hover:underline mt-10"
            >
              <h1 className=" text-[16px] mx-3">{review?.location}</h1>
              <p className="text-center text-sm text-gray-600">
                Read All Reviews
              </p>
            </Link>
            <div className="mt-5">
              <Rating
                style={{ maxWidth: 130, color: "yellow" }}
                value={review?.rating}
                readOnly={true}
              />
            </div>

            <div>
              <h1 className="mt-3 text-sm text-gray-600">{review?.date}</h1>
            </div>

            {/* Button to open modal */}
            <label
              htmlFor="my_modal_7"
              className="mt-10 cursor-pointer border px-6 py-3 rounded-lg shadow-lg hover:bg-gray-200"
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
              <div className="modal-box text-center rounded-md px-10 w-[380px]">
                <div>
                  <h1 className="text-lg font-semibold mt-5">Report Review</h1>
                  <p className="text-start text-sm text-gray-600">
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
                  className="input input-bordered text-sm h-[40px] w-full mt-4"
                >
                  <option disabled value="">
                    Select a reason...
                  </option>
                  <option value="Address is in the review">
                    Address is in the review
                  </option>
                  <option value="Fake review">Fake review</option>
                  <option value="Review content inappropriate language">
                    Review content inappropriate language
                  </option>
                  <option value="Review content sensitive information">
                    Review content sensitive information
                  </option>
                  <option value="Others">Others</option>
                </select>
                <div
                  className={`${report?.reason === "others" ? "" : "hidden"}`}
                >
                  <h1 className="mt-3 text-sm text-start">Reason</h1>
                  <textarea
                    onChange={(e) => {
                      setReport({ ...report, report: e.target.value });
                    }}
                    className="input input-bordered w-full mt-2 py-2 px-4 text-sm h-[100px]"
                    placeholder="Write your reasoning here..."
                  ></textarea>
                  <p className="text-xs text-start -mt-[6px]">
                    Limit of 250 Characters: 0/250
                  </p>
                </div>
                <div className="mt-4 flex justify-center">
                  <label
                    className="py-3 cursor-pointer px-5 text-xs ml-6 rounded-[8px] border hover:bg-gray-200"
                    htmlFor="my_modal_7"
                  >
                    Cancel
                  </label>
                  <label
                    className="py-3 cursor-pointer px-5 text-xs ml-6 rounded-[8px] bg-teal-600 hover:bg-teal-700 text-white"
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

          <div className="w-7/12 min-h-[350px] pt-4 flex flex-col items-start justify-start p-6">
            <h1 className="font-semibold text-lg">Written Review</h1>
            <p className="mt-5 text-sm text-gray-700">{review?.review}</p>
          </div>
        </div>
      </div>

      {/* **************************************************************** */}
      {/* FOR SMALL DEVICE */}
      <div className=" rounded-2xl block md:hidden">
        <div className="mb-5 mx-auto min-h-[350px] shadow-lg border rounded-2xl">
          <div className="w-full bg-gray-50 min-h-[350px] pt-6 flex flex-col items-center justify-start rounded-2xl">
            <Link
              to={`/single/landlord/${review?._id}`}
              className="w-full text-center px-2 hover:underline"
            >
              <h1 className="font-semibold text-xl">{review?.landlordName}</h1>
              <p className="text-center text-sm text-gray-600">
                Read All Reviews
              </p>
            </Link>
            <Link
              onClick={() => {
                window.scrollTo(0, 0);
              }}
              to={`/single/location/${review?._id}`}
              className="w-full text-center px-2 hover:underline mt-10"
            >
              <h1 className=" text-[16px] mx-3">{review?.location}</h1>
              <p className="text-center text-sm text-gray-600">
                Read All Reviews
              </p>
            </Link>
            <div className="mt-5">
              <Rating
                style={{ maxWidth: 130, color: "yellow" }}
                value={review?.rating}
                readOnly={true}
              />
            </div>

            <div>
              <h1 className="mt-3 text-sm text-gray-600">{review?.date}</h1>
            </div>

            {/* Button to open modal */}
            <label
              htmlFor="my_modal_7"
              className="mt-10 cursor-pointer border px-6 py-3 rounded-lg shadow-lg hover:bg-gray-200"
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
              <div className="modal-box text-center rounded-md px-10 w-[380px]">
                <div>
                  <h1 className="text-lg font-semibold mt-5">Report Review</h1>
                  <p className="text-start text-sm text-gray-600">
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
                  className="input input-bordered text-sm h-[40px] w-full mt-4"
                >
                  <option disabled value="">
                    Select a reason...
                  </option>
                  <option value="Address is in the review">
                    Address is in the review
                  </option>
                  <option value="Fake review">Fake review</option>
                  <option value="Review content inappropriate language">
                    Review content inappropriate language
                  </option>
                  <option value="Review content sensitive information">
                    Review content sensitive information
                  </option>
                  <option value="Others">Others</option>
                </select>
                <div
                  className={`${report?.reason === "others" ? "" : "hidden"}`}
                >
                  <h1 className="mt-3 text-sm text-start">Reason</h1>
                  <textarea
                    onChange={(e) => {
                      setReport({ ...report, report: e.target.value });
                    }}
                    className="input input-bordered w-full mt-2 py-2 px-4 text-sm h-[100px]"
                    placeholder="Write your reasoning here..."
                  ></textarea>
                  <p className="text-xs text-start -mt-[6px]">
                    Limit of 250 Characters: 0/250
                  </p>
                </div>
                <div className="mt-4 flex justify-center">
                  <label
                    className="py-3 cursor-pointer px-5 text-xs ml-6 rounded-[8px] border hover:bg-gray-200"
                    htmlFor="my_modal_7"
                  >
                    Cancel
                  </label>
                  <label
                    className="py-3 cursor-pointer px-5 text-xs ml-6 rounded-[8px] bg-teal-600 hover:bg-teal-700 text-white"
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

          <div className="w-full h-full min-h-[200px] pt-4 flex flex-col items-start justify-start p-6">
            <h1 className="font-semibold text-lg">Written Review</h1>
            <p className="mt-5 text-sm text-gray-700">{review?.review}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSinglePage;
