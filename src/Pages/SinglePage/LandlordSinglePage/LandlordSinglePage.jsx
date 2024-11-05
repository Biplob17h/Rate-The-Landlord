/* eslint-disable no-unused-vars */
import { Rating } from "@smastrom/react-rating";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
const LandlordSinglePage = () => {
  const [review, setReview] = useState({});
  // state to store report
  const [report, setReport] = useState({
    reason: "Address is in the review",
    report: "Address is in the review",
  });
  const { id } = useParams();

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

  useEffect(() => {
    fetch(`https://rate-the-landlord-server-1.onrender.com/api/v1/review/single/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setReview(data?.data);
      });
  }, [id]);
  return (
    <div>
      {/* upper section*/}
      <section className="bg-[#f9fafb] w-[90%] mx-auto mt-[40px] rounded-[15px]">
        <div className="text-center pt-[70px]">
          <h1 className="text-[36px] font-bold">{review?.landlordName}</h1>
          <p>
            Read 1 reviews and rental experiences for {review?.landlordName}
          </p>
        </div>

        {/* review section */}
        <section>
          <div className="grid grid-cols-6 mx-5 mt-[70px]">
            <div className=" bg-[#0d9488] text-white flex flex-col justify-center items-center py-12 rounded-l-[8px]">
              <h1>Overall</h1>
              <Rating
                style={{ maxWidth: 80, color: "yellow" }}
                value={review?.totalRating}
                readOnly={true}
              />
            </div>
            <div className="ml-[2px] bg-[#edf5f5] text-black flex flex-col justify-center items-center py-12">
              <h1>Stability</h1>
              <Rating
                style={{ maxWidth: 80, color: "yellow" }}
                value={review?.rentalRating}
                readOnly={true}
              />
            </div>
            <div className="ml-[2px] bg-[#edf5f5] text-black flex flex-col justify-center items-center py-12">
              <h1>Respect</h1>
              <Rating
                style={{ maxWidth: 80, color: "yellow" }}
                value={review?.respectRating}
                readOnly={true}
              />
            </div>
            <div className="ml-[2px] bg-[#edf5f5] text-black flex flex-col justify-center items-center py-12">
              <h1>Health</h1>
              <Rating
                style={{ maxWidth: 80, color: "yellow" }}
                value={review?.healthRating}
                readOnly={true}
              />
            </div>
            <div className="ml-[2px] bg-[#edf5f5] text-black flex flex-col justify-center items-center py-12">
              <h1>Privacy</h1>
              <Rating
                style={{ maxWidth: 80, color: "yellow" }}
                value={review?.privacyRating}
                readOnly={true}
              />
            </div>
            <div className="ml-[2px] bg-[#edf5f5] text-black flex flex-col justify-center items-center py-12 rounded-r-[8px]">
              <h1>Repair</h1>
              <Rating
                style={{ maxWidth: 80, color: "yellow" }}
                value={review?.repairRating}
                readOnly={true}
              />
            </div>
          </div>
          <p className="text-right mr-5">Based on 1 reviews</p>
        </section>

        {/* submit section */}
        <section className="mt-[60px] ml-5 pb-6">
          <h1 className="text-[19px] font-bold">Share your thoughts</h1>
          <p className="text-[14px] text-[#4B5563]">
            If you&rsquo;ve rented from this Landlord, share your experience
            with other tenants.
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
        {/* sort */}
        <div className="mb-4">
          <select
            name="sort"
            className="p-2 border border-gray-300 rounded-md w-[150px] mt-[30px]"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="highest">Highest</option>
            <option value="lowest">Lowest</option>
            <option value="a to z">Name A to Z</option>
            <option value="z to a">Name Z to A</option>
          </select>
        </div>
      </section>

      {/* Rating section */}
      <section className="">
        <div className="m-5 rounded-2xl">
          <div className="mb-5 mx-auto shadow-lg border rounded-2xl flex">
            <div className="w-3/12 bg-gray-50 pt-4 flex flex-col items-center justify-start rounded-2xl">
              <div>
                <Rating
                  style={{ maxWidth: 110, color: "yellow" }}
                  value={review?.totalRating}
                  readOnly={true}
                />
              </div>
              <Link
                to={`/single/location/${review?._id}`}
                className="hover:underline cursor-pointer"
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
              >
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
              </Link>

              <div>
                <h1 className="mt-3 text-[#6B7280]">{review?.date}</h1>
              </div>

              {/* Button to open  modal*/}
              <label
                htmlFor="my_modal_7"
                className="mt-10 cursor-pointer border px-6  py-3 rounded-lg shadow-lg mb-10"
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
                    <h1 className="text-[19px] font-bold mt-5">
                      Report Review
                    </h1>
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
            <div className="w-3/12  min-h-[210px]  pt-4 flex flex-col items-start justify-start px-8">
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
            </div>
            <div className="w-3/12  min-h-[210px]  pt-4 flex flex-col items-start justify-start px-8">
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
            <div className="w-6/12  min-h-[210px]  pt-4 flex flex-col items-start justify-start p-3">
              <h1 className="font-[500] text-[16px]">{`Written Review`}</h1>
              <p className="mt-5 text-[14px]">{review?.review}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandlordSinglePage;
