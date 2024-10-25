import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home/Home";
import Resources from "../Pages/Resources/Resources";
import About from "../Pages/About/About/About";
import SupportUs from "../Pages/SupportUs/SupportUs";
import TermsAndConditions from "../Pages/TermsAndConditions/TermsAndConditions";
import PrivacyPolicy from "../Pages/PrivacyPolicy/PrivacyPolicy";
import SubmitAReview from "../Pages/SubmitAReview/SubmitAReview";
import SubmitForm from "../Pages/SubmitForm/SubmitForm";
import Reviews from "../Pages/Reviews/Reviews";
import LandlordSinglePage from "../Pages/SinglePage/LandlordSinglePage/LandlordSinglePage";
import LocationSinglePage from "../Pages/SinglePage/LocationSinglePage/LocationSinglePage";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/reviews",
        element: <Reviews />,
      },
      {
        path: "/resources",
        element: <Resources />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/support",
        element: <SupportUs />,
      },
      {
        path: "/terms",
        element: <TermsAndConditions />,
      },
      {
        path: "/privacy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/submit",
        element: <SubmitAReview />,
      },
      {
        path: "/submit-form",
        element: <SubmitForm />,
      },
      {
        path: "/single/landlord/:landlord",
        element: <LandlordSinglePage />,
      },
      {
        path: "/single/location/:location",
        element: <LocationSinglePage />,
      },
    ],
  },
]);

export default routes;
