import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    state: "",
    cropType: "",
    landAmount: "",
    familyMembers: "",
    familyIncome: "",
    education: "",
    farmingExperience: "",
    mobileNumber: "",
  });

  const [languages, setLanguages] = useState({
    hindi: false,
    english: false,
    regional: false,
  });

  const { currentLanguage } = useLanguage();
  // const [selectedLanguage, setSelectedLanguage] = useState('english'); // Default to English

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setLanguages({
        ...languages,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // const handleLanguageToggle = (language) => {
  //   setSelectedLanguage(language);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can handle the form submission here, e.g., send data to a server

    try {
      const { data } = await axios.post(
        "http://localhost:3500/know-more",
        {
          ...formData,
        },
        {
          withCredentials: true,
        }
      );

      console.log(data);
      navigate("/services");
    } catch (err) {
      console.log(err);
    }

    console.log("Form Data:", formData);
    console.log(
      "Selected Languages:",
      Object.keys(languages).filter((lang) => languages[lang])
    );
  };

  return (
    <>
      <Navbar />
      <div className="bg-[#F5EEC8] min-h-screen flex items-center justify-center">
        <div className="w-full md:w-3/5 p-6 bg-[#F5EEC8] rounded-md">
          <h1 className="text-2xl font-bold mb-4 text-center">
            {currentLanguage === "english"
              ? "Farmer Details"
              : "किसान का विवरण"}
          </h1>

          {/* <div className="mb-4">
            <div className="flex justify-end">
              <button
                className={`mr-4 ${
                  selectedLanguage === 'english' ? 'text-blue-600' : ''
                }`}
                onClick={() => handleLanguageToggle('english')}
              >
                English
              </button>
              <button
                className={`${
                  selectedLanguage === 'hindi' ? 'text-blue-600' : ''
                }`}
                onClick={() => handleLanguageToggle('hindi')}
              >
                हिंदी
              </button>
            </div>
          </div> */}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">
                {currentLanguage === "english" ? "Name" : "नाम"}:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="state" className="block text-gray-700">
                {currentLanguage === "english" ? "State" : "राज्य"}:
              </label>
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                required
              >
                <option value="">
                  {currentLanguage === "english"
                    ? "Select State"
                    : "राज्य चुनें"}
                </option>
                <option value="Andhra Pradesh">
                  Andhra Pradesh/आंध्र प्रदेश
                </option>
                <option value="Arunachal Pradesh">
                  Arunachal Pradesh/अरुणाचल प्रदेश
                </option>
                <option value="Assam">Assam/आसाम</option>
                <option value="Bihar">Bihar/बिहार</option>
                <option value="Chhattisgarh">Chhattisgarh/छत्तीसगढ़</option>
                <option value="Andhra Pradesh">
                  Andhra Pradesh/आंध्र प्रदेश
                </option>
                <option value="Arunachal Pradesh">
                  Arunachal Pradesh/अरुणाचल प्रदेश
                </option>
                <option value="Assam">Assam/आसाम</option>
                <option value="Bihar">Bihar/बिहार</option>
                <option value="Chhattisgarh">Chhattisgarh/छत्तीसगढ़</option>
                <option value="Goa">Goa/गोवा</option>
                <option value="Gujarat">Gujarat/गुजरात</option>
                <option value="Haryana">Haryana/हरियाणा</option>
                <option value="Himachal Pradesh">
                  Himachal Pradesh/हिमाचल प्रदेश
                </option>
                <option value="Jharkhand">Jharkhand/झारखंड</option>
                <option value="Karnataka">Karnataka/कर्नाटक</option>
                <option value="Kerala">Kerala/केरल</option>
                <option value="Madhya Pradesh">
                  Madhya Pradesh/मध्य प्रदेश
                </option>
                <option value="Maharashtra">Maharashtra/महाराष्ट्र</option>
                {/* Add more states */}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">
                {currentLanguage === "english"
                  ? "Type of Crops"
                  : "फसल के प्रकार"}
                :
              </label>
              <div className="flex">
                <label className="mr-4">
                  <input
                    type="radio"
                    name="cropType"
                    value="Rabi"
                    onChange={handleChange}
                    checked={formData.cropType === "Rabi"}
                  />
                  {currentLanguage === "english" ? "Rabi" : "रबी"}
                </label>
                <label className="mr-4">
                  <input
                    type="radio"
                    name="cropType"
                    value="Kharif"
                    onChange={handleChange}
                    checked={formData.cropType === "Kharif"}
                  />
                  {currentLanguage === "english" ? "Kharif" : "खरीफ"}
                </label>
                {/* Add more crop options */}
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="landAmount" className="block text-gray-700">
                {currentLanguage === "english"
                  ? "Amount of Land (in acres)"
                  : "ज़मीन की मात्रा (एकड़ में)"}
                :
              </label>
              <input
                type="number"
                id="landAmount"
                name="landAmount"
                value={formData.landAmount}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            {/* <div className="mb-4">
              <label htmlFor="familyMembers" className="block text-gray-700">
                {selectedLanguage === 'english'
                  ? 'Number of Family Members'
                  : 'परिवार के सदस्यों की संख्या'}:
              </label>
              <input
                type="number"
                id="familyMembers"
                name="familyMembers"
                value={formData.familyMembers}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
              />
            </div> */}

            <div className="mb-4">
              <label htmlFor="mobileNumber" className="block text-gray-700">
                {currentLanguage === "english" ? "Mobile Number" : "मोबाइल"}:
              </label>
              <input
                type="number"
                id="mobileNumber"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="familyIncome" className="block text-gray-700">
                {currentLanguage === "english"
                  ? "Family Income (per year)"
                  : "परिवार की आय (प्रति वर्ष)"}
                :
              </label>
              <input
                type="number"
                id="familyIncome"
                name="familyIncome"
                value={formData.familyIncome}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="education" className="block text-gray-700">
                {currentLanguage === "english"
                  ? "Education Level"
                  : "शिक्षा स्तर"}
                :
              </label>
              <input
                type="text"
                id="education"
                name="education"
                value={formData.education}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="farmingExperience"
                className="block text-gray-700"
              >
                {currentLanguage === "english"
                  ? "Farming Experience (in years)"
                  : "कृषि अनुभव (साल में)"}
                :
              </label>
              <input
                type="number"
                id="farmingExperience"
                name="farmingExperience"
                value={formData.farmingExperience}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">
                {currentLanguage === "english" ? "Languages Spoken" : "भाषा"}:
              </label>
              <div className="flex">
                <label className="mr-4">
                  <input
                    type="checkbox"
                    name="hindi"
                    checked={languages.hindi}
                    onChange={handleChange}
                  />
                  {currentLanguage === "english" ? "Hindi" : "हिंदी"}
                </label>
                <label className="mr-4">
                  <input
                    type="checkbox"
                    name="english"
                    checked={languages.english}
                    onChange={handleChange}
                  />
                  English
                </label>
                <label className="mr-4">
                  <input
                    type="checkbox"
                    name="regional"
                    checked={languages.regional}
                    onChange={handleChange}
                  />
                  {currentLanguage === "english" ? "Regional" : "क्षेत्रीय"}
                </label>
                {/* Add more language options */}
              </div>
            </div>

            <button
              type="submit"
              className="bg-[#555843] hover:bg-[#3D4829] text-white py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
            >
              {currentLanguage === "english" ? "Submit" : "प्रस्तुत करें"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;