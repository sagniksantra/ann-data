import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom to create links

import Navbar from "../components/Navbar";

const Landing = () => {
  return (
    <>
      <Navbar />
      <section className="text-gray-600 body-font">
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
              <Link to="/upload">
                <button className="inline-flex text-white bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 rounded text-lg">
                  Upload
                </button>
              </Link>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img className="object-cover object-center rounded" alt="hero" src="https://dummyimage.com/720x600" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Landing;
