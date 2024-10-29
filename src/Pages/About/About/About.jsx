/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="text-center max-w-7xl mx-auto">
      {/* about us section */}
      <section className="mt-10 mx-3 md:mx-0">
        <h1 className="text-center text-[#111827] md:text-4xl text-3xl font-[800] ">
          About Us
        </h1>
        <p className="mt-[50px] text-[#6B7280] text-[17px] md:text-[19px]">
          Rate the Landlord was created as a tool for tenants to stay informed
          about housing the same way we stay informed about every other
          business, through crowd-sourced reviews.
        </p>
        <p className="mt-[50px] text-[#6B7280] text-[17px] md:text-[19px]">
          We know that tenants are often in the dark when it comes to renting
          with a new landlord. This conflicts with the standards we hold for
          every other business and service where reviews allow the consumer to
          make an informed decision based on reports of quality and conduct.
        </p>
        <p className="mt-[50px] text-[#6B7280] text-[17px] md:text-[19px]">
          Something as important as housing shouldn&rsquo;t be an exception.
          Reviewing landlords alongside other businesses will make for a more
          transparent marketplace. By sharing rental experiences, tenants can
          help others avoid situations of negligence or mistreatment and find
          landlords who will uphold best practices and adhere to their local
          legislation.
        </p>
        <p className="mt-[50px] text-[#6B7280] text-[17px] md:text-[19px]">
          Share your experiences, read the reviews, and help us keep one another
          safe, informed, and empowered.
        </p>
      </section>

      {/* FAQ Section */}
      <section className="mt-[50px] max-w-6xl mx-auto text-start">
        <h1 className="text-center text-[#111827] text-xl md:text-2xl font-semibold">
          Frequently Asked Questions
        </h1>

        {/* 1st FAQ */}
        <div className="mt-[20px]">
          <hr />
          <div className="collapse collapse-plus text-[17px] md:text-xl">
            <input type="checkbox" /> {/* Changed from radio to checkbox */}
            <div className="collapse-title text-[17px] md:text-xl font-medium ">
              Why are the reviews anonymous?
            </div>
            <div className="collapse-content">
              <p>
                We believe in protecting tenants and empowering people to keep
                their community informed without fear of harassment. Housing is
                vitally important, and no one should feel they are putting
                themselves at risk for providing a review. We strongly recommend
                posting low-tier reviews after leaving a poor rental situation
                to avoid any unpleasant backlash while renting.
              </p>
            </div>
          </div>
        </div>

        {/* 2nd FAQ */}
        <div className="mt-[20px]">
          <hr />
          <div className="collapse collapse-plus">
            <input type="checkbox" />
            <div className="collapse-title text-[17px] md:text-xl font-medium">
              How is reviewing landlords fair if you can&rsquo;t review tenants?
            </div>
            <div className="collapse-content">
              <p>
                Tenants are not running a business; they are paying landlords
                for housing and are therefore in the position to provide
                reviews. On the whole, businesses do not rate their patrons.
                Although platforms like Uber and Airbnb also rate passengers and
                guests, these are third-party services that connect two parties
                who agreed to participate in their two-way rating systems. In
                the same way there are websites like RateMyDoctor but no
                &rdquo;RateMyPatient&rdquo;, tenants should not be reviewed
                since they are not the service providers. Most importantly,
                tenants already go through extensive background checks when
                applying for housing, so they are subjected to a formal review
                by the landlord during this process.
              </p>
            </div>
          </div>
        </div>

        {/* 3rd FAQ */}
        <div className="mt-[20px]">
          <hr />
          <div className="collapse collapse-plus">
            <input type="checkbox" />
            <div className="collapse-title text-[17px] md:text-xl font-medium">
              What should I do if I can&rsquo;t review my current landlord but
              still need help?
            </div>
            <div className="collapse-content">
              <p>
                We suggest checking out our resource page for information on
                your rights as a tenant as well as information about tenant
                unions that may help you navigate your current situation.
              </p>
            </div>
          </div>
        </div>
        {/* 4th FAQ */}
        <div className="mt-[20px]">
          <hr />
          <div className="collapse collapse-plus">
            <input type="checkbox" />
            <div className="collapse-title text-[17px] md:text-xlfont-medium">
              Why does RTL include landlord names?
            </div>
            <div className="collapse-content">
              <p>
                From chain restaurants to mom-and-pop shops, retailers to
                individual artisans, businesses and the people running them
                receive reviews. By choosing to run a business under their name,
                landlords put themselves in the position to be held to the same
                standards as a business, and that includes being reviewed.
              </p>
            </div>
          </div>
          <hr />
        </div>
      </section>
      {/* Privacy Policy Section */}
      <section className="mt-[65px] text-start mx-5 md:mx-0">
        <h1 className="text-center text-[#111827] text-2xl md:text-3xl font-[800] ">
          Privacy Policy
        </h1>
        <p className="mt-[50px] text-[#6B7280] text-[17px] md:text-[19px]">
          At Rate the Landlord Inc., we are committed to protecting the privacy
          of those who submit reviews. All submissions made to our website are
          anonymous. We do not collect any personal data or information that
          could be used to identify you, such as your name, email address, or
          phone number.
          <br />
          <Link
            to={"/privacy"}
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            <button className="text-[#d6cc32] underline"> Read More</button>
          </Link>
        </p>
      </section>

      {/* Moderation Policy Section */}
      <section className="mt-[65px] text-start mx-5 md:mx-0">
        <h1 className="text-center text-[#111827]  font-[800] text-2xl md:text-3xl">
          Moderation Policy
        </h1>
        <p className="mt-[20px] md:mt-[50px] text-[#6B7280] text-[17px] md:text-[19px]">
          Tenants visit Rate The Landlord to find information on prospective
          landlords based on reviews from their previous tenants. We will
          carefully moderate the submitted reviews to ensure they are relevant,
          appropriate, and respect the privacy of both parties.
        </p>
        <p className="mt-[20px] md:mt-[50px] text-[#6B7280] text-[17px] md:text-[19px]">
          We strictly prohibit the posting of threats, hate speech, lewd or
          discriminatory language.
        </p>
        <p className="mt-[20px] md:mt-[50px] text-[#6B7280] text-[17px] md:text-[19px]">
          At Rate The Landlord, privacy is important. A landlord&rsquo;s name is
          used in reviews because they operate a business under that name.
          However, we do not permit the posting of addresses, phone numbers, or
          any personal information related to the landlord or other parties
          involved.
        </p>
        <p className="mt-[20px] md:mt-[50px] text-[#6B7280] text-[17px] md:text-[19px]">
          Any reviews found in violation of this policy will be amended or
          removed at our discretion. We remain neutral and will not engage in
          factual disputes regarding the content of the reviews.
        </p>
      </section>

      {/* Revenue Section */}
      <section className="mt-[65px] text-start mx-5 md:mx-0">
        <h1 className="text-center text-[#111827] text-2xl md:text-3xl font-[800] ">
          Revenue
        </h1>
        <p className="mt-[20px] md:mt-[50px] text-[#6B7280] text-[17px] md:text-[19px]">
          At Rate The Landlord Inc., we are committed to transparency and
          utilizing our resources to support tenants and their rights. All
          revenue generated through advertisements and generous donations is
          allocated towards covering the essential costs of running the site,
          ensuring that we can continue to provide valuable information and
          resources. We take pride in our dedication to making a positive
          impact, and any surplus funds are actively donated to groups and
          organizations that are actively working towards furthering tenant
          advocacy and support. By contributing to our site&rsquo;s revenue, you
          are directly assisting in our mission to foster a fair and equitable
          housing system. Together, we can empower tenants and make a meaningful
          difference in their lives.
        </p>
      </section>
      {/* Contribute Section */}
      <section className="mt-[65px] text-start mx-5 md:mx-0">
        <h1 className="text-center text-[#111827] text-2xl md:text-3xl font-[800] ">
          Want to Contribute?
        </h1>
        <p className="mt-[20px] md:mt-[50px] text-[#6B7280] text-[17px] md:text-[19px]">
          This project is open source and we would love help with its
          development! Send us an email or join us on Github to see how you can
          help grow this project and help Renters.
        </p>
      </section>
      {/* Contact Us Section */}
      <section className="mt-[65px] mx-5 md:mx-0">
        <h1 className="text-center text-[#111827] text-2xl md:text-3xl font-[800] ">
          Contact Us
        </h1>
        <p className="mt-[5px] text-[#6B7280] text-[17px] md:text-[19px]">
          Email us: contact@ratethelandlord.org
        </p>
      </section>
    </div>
  );
};

export default About;
