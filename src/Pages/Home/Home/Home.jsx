/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Banner from "../Banner/Banner";
import Community from "../Community/Community";
import Cards from "../Cards/Cards";

const Home = () => {
  const [rating, setRating] = useState(4);
  return (
    <div>
      <Banner />
      <Community />
      <Cards />
    </div>
  );
};

export default Home;
