import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useLanguage } from "../context/LanguageContext";

import { Button } from "@chakra-ui/react"; // Import the Chakra UI Button component
import MobileNumberPopup from "../components/MobileNumberServices"; // Import the MobileNumberPopup component
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const { currentLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [mobileNumber, setMobileNumber] = useState(""); // Add state for mobile number
  const navigate = useNavigate();

  const onClose = () => setIsOpen(false);
  const openPopup = () => setIsOpen(true);

  // const handleMobileNumberSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:3500/submit-mobile-number",
  //       {
  //         mobileNumber: mobileNumber,
  //       }
  //     );

  //     if (response.data.success) {
  //       // If success is true, redirect to "/marketplace"
  //       navigate("/marketplace");
  //     } else {
  //       navigate("/buy");
  //       // If success is false, do nothing (optional)
  //       // You may add an alert or message to inform the user here
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  return (
    <>
      <Navbar />
      <section className="text-gray-600 body-font bg-gradient-to-tl from-white via-green-200 to-green-200">
        <div className="container px-5 py-24 mx-auto h-screen">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-4xl text-4xl font-medium title-font mb-4 text-gray-900">
              {currentLanguage === "english"
                ? "Optimize Your Farming with अन्न-Data"
                : "अन्न-Data के साथ अपनी कृषि को अद्भुत बनाएं"}
            </h1>
            {/* <p className="mb-8 leading-relaxed">
              {currentLanguage === "english"
                ? "अन्न-Data provides you with the tools and data you need to enhance your farming practices. Join us now to make the most of your agricultural endeavors."
                : "अन्न-Data आपको वो उपकरण और डेटा प्रदान करता है जो आपकी कृषि प्रथाओं को सुधारने के लिए आवश्यक है। अपने कृषि प्रयासों का सर्वाधिक उपयोग करने के लिए अभी हमारे साथ जुड़ें।"}
            </p> */}
          </div>
          <div className="flex flex-wrap">
            <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
              <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
              {currentLanguage === "english" ? "AI Chatbot" : "एआई चैटबॉट"}
              </h2>
              <p className="leading-relaxed text-base mb-4">
                {currentLanguage === "english"
                  ? "An intelligent AI chatbot to assist you with your farming queries."
                  : "आपके कृषि प्रश्नों के लिए आपकी सहायता करने वाले एक बुद्धिमान एआई चैटबॉट।"}
              </p>
              <Link
                to="/chat"
                className="text-indigo-500 inline-flex items-center"
              >
                {currentLanguage === "english" ? "Use" : "उपयोग करें"}
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
            <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
              <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
                
                {currentLanguage === "english" ? "Disease Detection" : "रोग का पता"}
              </h2>
              <p className="leading-relaxed text-base mb-4">
                {currentLanguage === "english"
                  ? "Advanced disease detection technology to protect your crops."
                  : "आपके फसलों की सुरक्षा के लिए उन्नत बीमारी पहचान प्रौद्योगिकी।"}
              </p>
              <Link
                to="/upload"
                className="text-indigo-500 inline-flex items-center"
              >
                {currentLanguage === "english" ? "Use" : "उपयोग करें"}
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
            <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
              <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">       
                {currentLanguage === "english" ? "Crop Recommendation - Soil Based" : "फसल सिफ़ारिश - मिट्टी आधारित"}
              </h2>
              <p className="leading-relaxed text-base mb-4">
                {currentLanguage === "english"
                  ? "Personalized crop recommendations for maximum yield."
                  : "अधिकतम उत्पाद के लिए व्यक्तिगत फसल की सिफारिशें।"}
              </p>
              <Link
                to="/soil"
                className="text-indigo-500 inline-flex items-center"
              >
                {currentLanguage === "english" ? "Use" : "उपयोग करें"}
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
            <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
              <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
              {currentLanguage === "english" ? "Crop Recommendation - Geography Based" : "फसल सिफ़ारिश - भूगोल आधारित"}
              </h2>
              <p className="leading-relaxed text-base mb-4">
                {currentLanguage === "english"
                  ? "Personalized crop recommendations for maximum yield."
                  : "अधिकतम उत्पाद के लिए व्यक्तिगत फसल की सिफारिशें।"}
              </p>
              <Link
                to="/soil1"
                className="text-indigo-500 inline-flex items-center"
              >
                {currentLanguage === "english" ? "Use" : "उपयोग करें"}
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
            <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
              <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
                {currentLanguage === "english" ? "Farmers' Forum" : "किसान मंच"}
              </h2>
              <p className="leading-relaxed text-base mb-4">
                {currentLanguage === "english"
                  ? "Connect with other farmers and share your knowledge and experiences."
                  : "दूसरे किसानों से जुड़ें और अपने ज्ञान और अनुभव साझा करें।"}
              </p>
              <Link
                to="/forum"
                className="text-indigo-500 inline-flex items-center"
              >
                {currentLanguage === "english" ? "Use" : "उपयोग करें"}
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
            <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
              <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
              {currentLanguage === "english" ? "Sell with us" : "हमारे साथ बेचें"}
              </h2>
              <p className="leading-relaxed text-base mb-4">
              {currentLanguage === "english" ? "Join us in creating a marketplace to sell and buy products." : "उत्पाद बेचने और खरीदने के लिए बाज़ार बनाने में हमारे साथ जुड़ें।"}

              </p>
              <Link
                to="/mobile-number"
                className="text-indigo-500 inline-flex items-center"
              >
                {currentLanguage === "english" ? "Use" : "उपयोग करें"}
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;