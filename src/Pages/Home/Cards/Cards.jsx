/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

// Helper function to get a random index and random time delay
const getRandomIndex = (currentIndex, totalCards) => {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * totalCards);
  } while (randomIndex === currentIndex); // Ensure the new index is different from the current one
  return randomIndex;
};

const getRandomDelay = () => {
  return Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000; // Random delay between 3000ms (3s) and 5000ms (5s)
};

const Cards = () => {
  const [highlightedCardIndex, setHighlightedCardIndex] = useState(6); // Initially, the last card is highlighted
  const totalCards = 7;

  // Change the highlighted card index randomly every 3 to 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightedCardIndex((prevIndex) => getRandomIndex(prevIndex, totalCards));
    }, getRandomDelay()); // Random delay

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [highlightedCardIndex]);

  return (
    <section className="flex justify-center items-center bg-white py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-7xl px-6">
        {/* card 1 */}
        <div
          className={`${
            highlightedCardIndex === 0
              ? "bg-[#faf9e8] text-black transform scale-105 transition-all duration-1000 ease-in-out"
              : "bg-[#f9fafb] text-gray-700 transition-all duration-1000 ease-in-out"
          } p-6 rounded-lg shadow-lg`}
        >
          <p className="text-lg">“sounds like a great initiative, count me in!”</p>
          <h1 className={`${highlightedCardIndex === 0 ? "text-black" : "text-gray-900"} mt-4 font-semibold`}>
            Reddit User
          </h1>
        </div>

        {/* card 2 */}
        <div
          className={`${
            highlightedCardIndex === 1
              ? "bg-[#faf9e8] text-black transform scale-105 transition-all duration-1000 ease-in-out"
              : "bg-[#f9fafb] text-gray-700 transition-all duration-1000 ease-in-out"
          } p-6 rounded-lg shadow-lg`}
        >
          <p className="text-lg">“I consider your work heroic - thank you for providing a site that we can finally rate landlords!”</p>
          <h1 className={`${highlightedCardIndex === 1 ? "text-black" : "text-gray-900"} mt-4 font-semibold`}>
            Tenant Email
          </h1>
        </div>

        {/* card 3 */}
        <div
          className={`${
            highlightedCardIndex === 2
              ? "bg-[#faf9e8] text-black transform scale-105 transition-all duration-1000 ease-in-out"
              : "bg-[#f9fafb] text-gray-700 transition-all duration-1000 ease-in-out"
          } p-6 rounded-lg shadow-lg`}
        >
          <p className="text-lg">“This is a much needed service. I&rsquo;m really hoping you&rsquo;ll grow to be a global service”</p>
          <h1 className={`${highlightedCardIndex === 2 ? "text-black" : "text-gray-900"} mt-4 font-semibold`}>
            Instagram User
          </h1>
        </div>

        {/* card 4 */}
        <div
          className={`${
            highlightedCardIndex === 3
              ? "bg-[#faf9e8] text-black transform scale-105 transition-all duration-1000 ease-in-out"
              : "bg-[#f9fafb] text-gray-700 transition-all duration-1000 ease-in-out"
          } p-6 rounded-lg shadow-lg`}
        >
          <p className="text-lg">“I love this idea. I&rsquo;ve been saying for a long time that there should be a way for renters to vet landlords the same way landlords can do background checks on renters.”</p>
          <h1 className={`${highlightedCardIndex === 3 ? "text-black" : "text-gray-900"} mt-4 font-semibold`}>
            Reddit User
          </h1>
        </div>

        {/* card 5 */}
        <div
          className={`${
            highlightedCardIndex === 4
              ? "bg-[#faf9e8] text-black transform scale-105 transition-all duration-1000 ease-in-out"
              : "bg-[#f9fafb] text-gray-700 transition-all duration-1000 ease-in-out"
          } p-6 rounded-lg shadow-lg`}
        >
          <p className="text-lg">“Good. As a landlord myself I&rsquo;d like to see bad landlords held accountable. They give those of us trying to provide a good service a bad name.”</p>
          <h1 className={`${highlightedCardIndex === 4 ? "text-black" : "text-gray-900"} mt-4 font-semibold`}>
            Twitter Landlord
          </h1>
        </div>

        {/* card 6 */}
        <div
          className={`${
            highlightedCardIndex === 5
              ? "bg-[#faf9e8] text-black transform scale-105 transition-all duration-1000 ease-in-out"
              : "bg-[#f9fafb] text-gray-700 transition-all duration-1000 ease-in-out"
          } p-6 rounded-lg shadow-lg`}
        >
          <p className="text-lg">“So I’m a landlord and love this page. If you&rsquo;re a landlord and have a problem with this site, you are literally the problem. It&rsquo;s incredibly fucking easy to be a good landlord.”</p>
          <h1 className={`${highlightedCardIndex === 5 ? "text-black" : "text-gray-900"} mt-4 font-semibold`}>
            Instagram Landlord
          </h1>
        </div>

        {/* card 7 (highlighted card that moves randomly) */}
        <div
          className={`${
            highlightedCardIndex === 6
              ? "bg-[#faf9e8] text-black transform scale-105 transition-all duration-1000 ease-in-out"
              : "bg-[#f9fafb] text-gray-700 transition-all duration-1000 ease-in-out"
          } p-6 rounded-lg shadow-lg`}
        >
          <p className="text-lg">“Been dreaming of this years! Keen for it to become GLOBAL. 🏆”</p>
          <h1 className={`${highlightedCardIndex === 6 ? "text-black" : "text-gray-900"} mt-4 font-semibold`}>
            Reddit User
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Cards;
