import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom to create links

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Landing = () => {
  return (
    <>
      <Navbar />
      <section className="bg-[#F5EEC8] text-gray-600 body-font min-h-screen">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Optimize Your Farming with AgroSync
            </h1>
            <p className="mb-8 leading-relaxed">
              AgroSync provides you with the tools and data you need to enhance your farming practices. Join us now to make the most of your agricultural endeavors.
            </p>
            <div className="flex justify-center">
              {/* Link to the /signup route */}
              <Link to="/register">
                <button className="inline-flex text-white bg-[#555843] border-0 py-2 px-6 focus:outline-none hover:bg-[#A7D397] rounded text-lg">
                  Register
                </button>
              </Link>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img className="object-cover object-center rounded" alt="hero" src="https://static.vecteezy.com/system/resources/thumbnails/029/890/858/original/landscape-of-green-crops-and-field-4k-clip-of-farming-and-agriculturist-with-seeding-of-rice-young-plant-and-field-rice-field-and-farmland-thailand-agriculture-and-farm-in-asia-video.jpg" />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Landing;
