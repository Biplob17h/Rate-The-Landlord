/* eslint-disable no-unused-vars */
import React from "react";
import { FaPatreon } from "react-icons/fa6";

const SupportUs = () => {
  return (
    <div className="bg-white text-center text-[#111827]">
      {/* Support Us section*/}
      <section className="mt-[130px]">
        <h1 className="text-[#4f46e5] font-bold">Support Us</h1>
        <div className=" w-[730px] mx-auto">
          <h1 className="text-4xl mt-4 ">
            Support Rate The Landlord in our journey
          </h1>
          <p className="mt-4 px-[40px] text-[18px] text-[#4B5563] opacity-95">
            Rate The Landlord is on a mission to empower renters, promote
            transparency, and build a global community dedicated to fostering
            positive landlord-tenant relationships. As we continue to grow and
            enhance our platform, we&apos;re faced with various operational
            costs—from server maintenance to development resources.
          </p>
        </div>
      </section>

      {/* Card  Section*/}
      <section className="grid max-w-[950px] mx-auto grid-cols-3 gap-x-8 gap-y-10  mt-[130px]">
        {/* 1st card */}
        <div className="relative pl-16 text-start">
          <dt className="text-base  leading-7 text-gray-900">
            <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
                className="h-6 w-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
            </div>
            Platform Enhancements
          </dt>
          <dd className="mt-2 text-base leading-7 text-gray-600">
            Supporting ongoing development to introduce new features and improve
            user experience.
          </dd>
        </div>
        {/* 2nd card */}
        <div className="relative pl-16 text-start">
          <dt className="text-base  leading-7 text-gray-900">
            <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
                className="h-6 w-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                ></path>
              </svg>
            </div>
            Server Maintenance
          </dt>
          <dd className="mt-2 text-base leading-7 text-gray-600">
            Ensuring our platform stays accessible and reliable for users
            worldwide.
          </dd>
        </div>
        {/* 3rd card */}
        <div className="relative pl-16 text-start">
          <dt className="text-base  leading-7 text-gray-900">
            <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
                className="h-6 w-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
            </div>
            Community Initiatives
          </dt>
          <dd className="mt-2 text-base leading-7 text-gray-600">
            Enabling us to host events and campaigns that bring our community
            together.
          </dd>
        </div>
      </section>

      {/* Paragraph  Section*/}
      <section className="mt-[130px] w-[800px] text-center mx-auto">
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Until now, the site has been supported by Ad Revenue, but it
          doesn&#39;t always cover our monthly costs to keep the site running.
          If we want to continue to grow the site and offer more resources, we
          need the support of the community
        </p>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Rest assured though that we are NOT using this platform as a way to
          enrich ourselves. Any money left over after overhead costs will be put
          right back into site through various means such as advertising,
          updating our UI/UX design, or a number of other ways to help enhance
          the Tenant experience. We&rsquo;ll also periodically donate to local
          Tenant Union&rsquo;s and resources to help spread the support!
        </p>

        <button className="border border-[#0d9488] rounded-[8px] mt-[50px]">
          <div className="flex justify-center items-center px-10 hover:bg-gray-200 rounded-[8px]">
            <FaPatreon color="#0d9488" size={20} />
            <span className="w-full text-center text-teal-600 py-4 text-lg ">
              Patreon
            </span>
          </div>
        </button>
      </section>

      {/* Supporters section */}
      <section className="container mx-auto text-center mt-[130px]">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Our Generous Supporters
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="text-lg font-bold">Christina Vist</h4>
            <p className="text-gray-600">Key Contributor</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="text-lg font-bold">Charles Hinds</h4>
            <p className="text-gray-600">Guardian of Good Homes</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="text-lg font-bold">Stephen Martin</h4>
            <p className="text-gray-600">Guardian of Good Homes</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SupportUs;
