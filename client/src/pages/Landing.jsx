import React from "react";
import { Link } from "react-router-dom";
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
              Optimize Your Farming with अन्न-Data
            </h1>
            <p className="mb-8 leading-relaxed">
              अन्न-Data provides you with the tools and data you need to enhance your farming practices. Join us now to make the most of your agricultural endeavors.
            </p>
            <div className="flex justify-center">
              <Link to="/register">
                <button className="inline-flex bg-[#555843] hover:bg-[#F5EEC8] hover:text-[#555843] text-[#F5EEC8] border-0 py-2 px-6 focus:outline-none rounded text-lg">
                  Tell more about yourself
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

      <div className="fixed bottom-4 right-4">
        <Link to="/chat">
          <button className="bg-[#555843] text-white p-3 rounded-full focus:outline-none hover:bg-[#3D4829] hover:shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm-1 14h2a1 1 0 110 2H11a1 1 0 110-2zm0-4h2a1 1 0 110 2H11a1 1 0 110-2z"
              />
            </svg>
          </button>
        </Link>
      </div>
    </>
  );
};

export default Landing;
