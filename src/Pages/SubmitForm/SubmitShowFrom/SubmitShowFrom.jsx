/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getCurrentDateString } from "../../../components/GetTodaysDate";

const SubmitShowFrom = ({ review, setReview, step, setStep, totalRating }) => {
  // get all data from props
  const {
    state,
    city,
    zipCode,
    country,
    repairRating,
    healthRating,
    rentalRating,
    privacyRating,
    respectRating,
  } = review;

  // count total rating
  const total = totalRating(
    repairRating,
    healthRating,
    rentalRating,
    privacyRating,
    respectRating
  );

  // location
  const location = city + " " + state + " " + country + " " + zipCode;

  // check if agree with trams
  const [isChecked, setIsChecked] = useState({
    first: false,
    second: false,
    third: false,
  });

  // navigate
  const navigate = useNavigate();

  // Get todays date
  const date = getCurrentDateString();

  const handleReviewSubmit = () => {
    fetch(`http://localhost:5000/api/v1/review/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...review, totalRating: total, location, date }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.status === "success") {
          console.log(data);
          toast.success("Review successful");
          navigate("/reviews");
          window.scrollTo(0, 0);
        } else {
          toast.error("Failed to submit review");
          console.log(data);
        }
      });
  };
  return (
    <div className="text-start px-[5%]">
      {/******* Landlord Section ******/}
      {step > 1 && (
        <section>
          <p className="text-[14px]">Landlord</p>
          <div className="flex justify-between items-center px-2">
            <h1>{review?.landlordName || "No Landlord Name Provided"}</h1>
            <button
              onClick={() => {
                setStep(1);
              }}
              className="px-4 py-2 rounded-md text-white cursor-pointer bg-teal-600"
            >
              Edit
            </button>
          </div>
          <div className="h-[2px] w-full bg-[#0d9488] mt-[15px] mb-5"></div>
        </section>
      )}

      {/******* Location Section ******/}
      {step > 2 && (
        <section>
          <p className="text-[14px]">Location</p>
          <div className="flex justify-between items-center px-2">
            <div className="flex">
              <h1>{review?.city || "No City"}</h1>
              {`, `}
              <h1>{review?.state || "No State"}</h1>
              {`, `}
              <h1>{review?.country || "No Country"}</h1>
              {`, `}
              <h1 className="mr-2">{review?.zipCode || "No Zip"}</h1>
              {` - $`}
              <h1>{review?.rent || "No Rent"}</h1>
            </div>
            <button
              onClick={() => {
                setStep(2);
              }}
              className="px-4 py-2 rounded-md text-white cursor-pointer bg-teal-600"
            >
              Edit
            </button>
          </div>
          <div className="h-[2px] w-full bg-[#0d9488] mt-[15px] mb-5"></div>
        </section>
      )}

      {/******* Ratings Section ******/}
      {step > 3 && (
        <section>
          <p className="text-[14px]">Ratings</p>
          <div className="flex items-center justify-between">
            <div className="flex">
              <div className="flex items-center">
                {/* Health Rating  */}
                <div className="mt-2 flex items-center justify-center flex-col">
                  <p className="text-[17px]">Health and Safety</p>
                  <div>
                    <Rating
                      style={{ maxWidth: 80, color: "yellow" }}
                      value={review?.healthRating}
                      readOnly={true}
                    />
                  </div>
                </div>
                {/* Respect Rating  */}
                <div className="mt-2 ml-8 flex items-center justify-center flex-col">
                  <p className="text-[17px]">Respect</p>
                  <div>
                    <Rating
                      style={{ maxWidth: 80, color: "yellow" }}
                      value={review?.respectRating}
                      readOnly={true}
                    />
                  </div>
                </div>
                {/* Privacy Rating  */}
                <div className="mt-2 ml-8 flex items-center justify-center flex-col">
                  <p className="text-[17px]">Privacy</p>
                  <div>
                    <Rating
                      style={{ maxWidth: 80 }}
                      value={review?.privacyRating}
                      readOnly={true}
                    />
                  </div>
                </div>
                {/* Repair Rating  */}
                <div className="mt-2 ml-8 flex items-center justify-center flex-col">
                  <p className="text-[17px]">Repair</p>
                  <div>
                    <Rating
                      style={{ maxWidth: 80, color: "yellow" }}
                      value={review?.repairRating}
                      readOnly={true}
                    />
                  </div>
                </div>
                {/* Rental Stability Rating  */}
                <div className="mt-2 ml-8 flex items-center justify-center flex-col">
                  <p className="text-[17px]">Rental Stability</p>
                  <div>
                    <Rating
                      style={{ maxWidth: 80, color: "yellow" }}
                      value={review?.rentalRating}
                      readOnly={true}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div
              onClick={() => {
                setStep(3);
              }}
              className="flex justify-end items-center mt-4"
            >
              <button className="px-4 py-2 rounded-md text-white cursor-pointer bg-teal-600">
                Edit
              </button>
            </div>
          </div>
          <div className="h-[2px] w-full bg-[#0d9488] mt-[15px] mb-5"></div>
        </section>
      )}
      {/******* Landlord Section ******/}
      {step > 4 && (
        <div>
          {/* text review */}
          <section>
            <p className="text-[14px]">Review</p>
            <div className="flex justify-between items-center px-2">
              <h1>{review?.review || "No Landlord Name Provided"}</h1>
              <button
                onClick={() => {
                  setStep(4);
                }}
                className="px-4 py-2 rounded-md text-white cursor-pointer bg-teal-600"
              >
                Edit
              </button>
            </div>
            <div className="h-[2px] w-full bg-[#0d9488] mt-[15px] mb-5"></div>
          </section>
          {/* Final  review section */}
          <section className="mb-5 w-[70%] mx-auto min-h-[350px] shadow-lg border rounded-2xl flex">
            <div className="w-3/12 bg-gray-50 min-h-[350px]  pt-4 flex flex-col items-center justify-start">
              <h1 className="font-[500]">{review?.landlordName}</h1>
              <div>
                <Rating
                  style={{ maxWidth: 80, color: "yellow" }}
                  value={total}
                  readOnly={true}
                />
              </div>
              <div className="flex mx-2 items-center justify-start mt-4">
                <h1>
                  {review?.city}
                  {","}
                </h1>
                <h1 className="ml-2">{review?.state}</h1>
              </div>
              <div className="flex mx-2 items-center justify-start">
                <h1>
                  {review?.country}
                  {","}
                </h1>
                <h1 className="ml-2">{review?.zipCode}</h1>
              </div>
            </div>
            <div className="w-3/12  min-h-[350px]  pt-4 flex flex-col items-start justify-start px-8">
              <div className="mt-2">
                <h1 className="font-[500]">{`Health and Safety`}</h1>
                <div>
                  <Rating
                    style={{ maxWidth: 80, color: "yellow" }}
                    value={healthRating}
                    readOnly={true}
                  />
                </div>
              </div>
              <div className="mt-4">
                <h1 className="font-[500]">{`Respect`}</h1>
                <div>
                  <Rating
                    style={{ maxWidth: 80, color: "yellow" }}
                    value={respectRating}
                    readOnly={true}
                  />
                </div>
              </div>
              <div className="mt-4">
                <h1 className="font-[500]">{`Tenant Privacy`}</h1>
                <div>
                  <Rating
                    style={{ maxWidth: 80, color: "yellow" }}
                    value={privacyRating}
                    readOnly={true}
                  />
                </div>
              </div>
              <div className="mt-4">
                <h1 className="font-[500]">{`Repair`}</h1>
                <div>
                  <Rating
                    style={{ maxWidth: 80, color: "yellow" }}
                    value={repairRating}
                    readOnly={true}
                  />
                </div>
              </div>
              <div className="mt-4">
                <h1 className="font-[500]">{`Rental Stability`}</h1>
                <div>
                  <Rating
                    style={{ maxWidth: 80, color: "yellow" }}
                    value={rentalRating}
                    readOnly={true}
                  />
                </div>
              </div>
              <div className="mt-4">
                <h1 className="text-[16px]">Rent Amount: ${review?.rent}</h1>
                <h1 className="text-[12px]">In local currency</h1>
              </div>
            </div>
            <div className="w-6/12  min-h-[350px]  pt-4 flex flex-col items-start justify-start p-3">
              <h1 className="font-[500] text-[16px]">{`Written Review`}</h1>
              <p className="mt-5 text-[14px]">{review?.review}</p>
            </div>
          </section>

          {/* Check box and Submit section */}
          <section className="text-[#6B7280] text-[13px]">
            <div>
              <div className="flex">
                <input
                  onChange={(e) => {
                    setIsChecked({ ...isChecked, first: e.target.checked });
                  }}
                  type="checkbox"
                />
                <p className="ml-2">
                  I understand that posting a review on Rate The Landlord is
                  public and can be viewed by anyone including the landlord in
                  my review.
                </p>
              </div>
              <div className="flex items-start justify-start mt-3">
                <input
                  onChange={(e) => {
                    setIsChecked({ ...isChecked, second: e.target.checked });
                  }}
                  type="checkbox"
                />
                <p className="ml-2">
                  I understand that once I post this review I cannot have it
                  taken down unless it violates the Rate The Landlord policy and
                  recognize that Rate The Landlord recommends posting reviews
                  after my tenancy is over.
                </p>
              </div>
              <div className="flex">
                <input
                  onChange={(e) => {
                    setIsChecked({ ...isChecked, third: e.target.checked });
                  }}
                  type="checkbox"
                />
                <p className="ml-2">
                  I understand that Rate The Landlord is not responsible for any
                  consequences that occur as a result my review.
                </p>
              </div>
            </div>
            {/* Submit Review Button */}
            <div className="flex justify-center my-8">
              <button
                onClick={() => {
                  handleReviewSubmit();
                }}
                disabled={
                  !isChecked?.first || !isChecked?.second || !isChecked?.third
                }
                className={`px-4 py-2 rounded-md  text-white cursor-pointer ${
                  !isChecked?.first || !isChecked?.second || !isChecked?.third
                    ? "bg-[#99f6e4]"
                    : "bg-teal-600"
                }`}
              >
                Submit Review
              </button>
            </div>
            <div className={`h-[2px] w-full bg-[#0d9488] mb-5`}></div>
          </section>
        </div>
      )}
    </div>
  );
};

export default SubmitShowFrom;
