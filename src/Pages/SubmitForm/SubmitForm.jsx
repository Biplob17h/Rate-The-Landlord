/* eslint-disable no-unused-vars */
import { useState } from "react";
import SubmitTextBanner from "./SubmitTextBanner/SubmitTextBanner";
import SubmitInputForm from "./SubmitInputForm/SubmitInputForm";
import SubmitShowFrom from "./SubmitShowFrom/SubmitShowFrom";

const SubmitForm = () => {
  const [review, setReview] = useState({
    landlordName: "",
    country: "Australia",
    city: "",
    state: "",
    zipCode: "",
    rent: "0",
    repairRating: "2",
    healthRating: "3",
    rentalRating: "3",
    privacyRating: "3",
    respectRating: "3",
    review: "",
  });
  const [step, setStep] = useState(1);

  const totalRating = (
    repairRating,
    healthRating,
    rentalRating,
    privacyRating,
    respectRating
  ) => {
    const repair = parseInt(repairRating);
    const health = parseInt(healthRating);
    const rental = parseInt(rentalRating);
    const privacy = parseInt(privacyRating);
    const respect = parseInt(respectRating);
    const totalRating = repair + rental + privacy + respect + health;
    const total = Math.floor(totalRating / 5);
    return total;
  };
  return (
    <div>
      <SubmitTextBanner />
      <SubmitShowFrom
        review={review}
        setReview={setReview}
        step={step}
        setStep={setStep}
        totalRating={totalRating}
      />
      <SubmitInputForm
        review={review}
        setReview={setReview}
        step={step}
        setStep={setStep}
      />
    </div>
  );
};

export default SubmitForm;

// Explanation for this code

// there are two main section 1.SubmitInputForm and 2.SubmitShowFrom
// All the inputs are in SubmitInputForm and other frontend at SubmitShowFrom

// exe:
// In design first step is get landlord name. So when it is step 1, the SubmitInputForm will show the input of landlord and SubmitShowFrom will show nothing because you set nothing.

// At step 2 you already set landlord name so as the design SubmitInputForm will show the location form and SubmitShowFrom will show landlord data

// This will go on
