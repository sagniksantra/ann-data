import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";

import {TypeAnimation} from "react-type-animation"
const Landing = () => {
  const { currentLanguage } = useLanguage();
  // const [selectedLanguage, setSelectedLanguage] = useState("english"); // Default to English

  // const handleLanguageToggle = (language) => {
  //   setSelectedLanguage(language);
  // };

  return (
    <>
      <Navbar />
      <section className="bg-[#F5EEC8] text-gray-600 body-font min-h-screen">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            {currentLanguage === "english"
                ? <TypeAnimation 
                sequence={[
                  "Optimize Your Farming with अन्न-Data",
                  "Digitize. Skill. Upgrade",
                  "Empower every farmer.",
                  1000,
                ]}
                speed={50}
                repeat={Infinity}
                style={{ fontSize: "1.5rem" }}
            />
                :<TypeAnimation 
                sequence={[
                  "अन्न-Data के साथ अपनी कृषि को अद्भुत बनाएं",
                  1000,
                ]}
                speed={75}
                repeat={true}
                style={{ fontSize: "1.5rem" }}
            />
                
                }
            </h1>
            <p className="mb-8 leading-relaxed">
              {currentLanguage === "english"
                ? "अन्न-Data provides you with the tools and data you need to enhance your farming practices.Join us now to make the most of your agricultural endeavors."
                : "अन्न-Data आपको उन उपकरणों और डेटा के साथ प्रदान करता है जिनकी आपकी कृषि प्रथाओं को बेहतर बनाने की आवश्यकता है. अपने कृषि प्रयासों का सर्वाधिक उपयोग करने के लिए हमारे साथ शामिल हों."}
            </p>
            <div className="flex justify-center">
              <Link to="/register">
                <button className="inline-flex bg-[#555843] hover:bg-[#F5EEC8] hover:text-[#555843] text-[#F5EEC8] border-0 py-2 px-6 focus:outline-none rounded-lg text-lg">
                  {currentLanguage === "english"
                    ? "Become a seller"
                    : "विक्रेता बनें"}
                </button>
              </Link>
              <Link to="/services">
                <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 hover:text-gray-700 rounded-lg text-lg">
                  {currentLanguage === "english"
                    ? "Our Services"
                    : "हमारी सेवाएं"}
                </button>
              </Link>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src="https://i.ibb.co/bmfX8L6/farmer.jpg"
            />
          </div>
        </div>
      </section>
      {/* <Footer /> */}

      <div className="fixed bottom-4 right-4">
        <Link to="/chat">
          <button className="bg-[#555843] text-white p-3 rounded-full focus:outline-none hover:bg-[#3D4829] hover:shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
              />
            </svg>
          </button>
        </Link>
      </div>
      {/* <div className="fixed bottom-12 left-4">
        <div className="flex justify-end">
          <button
            className={`mr-4 ${
              selectedLanguage === "english" ? "text-blue-600" : ""
            }`}
            onClick={() => handleLanguageToggle("english")}
          >
            English
          </button>
          <button
            className={`${selectedLanguage === "hindi" ? "text-blue-600" : ""}`}
            onClick={() => handleLanguageToggle("hindi")}
          >
            हिंदी
          </button>
        </div>
      </div> */}
    </>
  );
};

export default Landing;