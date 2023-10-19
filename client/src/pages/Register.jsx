import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  });

  const [languages, setLanguages] = useState({
    hindi: false,
    english: false,
    regional: false,
  });

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
      navigate("/dashboard");
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
            Farmer Details
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">
                Name:
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
                State:
              </label>
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                required
              >
                <option value="">Select State</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="Assam">Assam</option>
                <option value="Bihar">Bihar</option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                {/* Add more states */}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Type of Crops:</label>
              <div className="flex">
                <label className="mr-4">
                  <input
                    type="radio"
                    name="cropType"
                    value="Rice"
                    onChange={handleChange}
                    checked={formData.cropType === "Rice"}
                  />
                  Rice
                </label>
                <label className="mr-4">
                  <input
                    type="radio"
                    name="cropType"
                    value="Wheat"
                    onChange={handleChange}
                    checked={formData.cropType === "Wheat"}
                  />
                  Wheat
                </label>
                {/* Add more crop options */}
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="landAmount" className="block text-gray-700">
                Amount of Land (in acres):
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

            <div className="mb-4">
              <label htmlFor="familyMembers" className="block text-gray-700">
                Number of Family Members:
              </label>
              <input
                type="number"
                id="familyMembers"
                name="familyMembers"
                value={formData.familyMembers}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="familyIncome" className="block text-gray-700">
                Family Income (per year):
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
                Education Level:
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
                Farming Experience (in years):
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
              <label className="block text-gray-700">Languages Spoken:</label>
              <div className="flex">
                <label className="mr-4">
                  <input
                    type="checkbox"
                    name="hindi"
                    checked={languages.hindi}
                    onChange={handleChange}
                  />
                  Hindi
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
                  Regional
                </label>
                {/* Add more language options */}
              </div>
            </div>

            <button
              type="submit"
              className="bg-[#555843] hover:bg-[#3D4829] text-white py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
