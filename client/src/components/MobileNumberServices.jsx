import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const MobileNumberService = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3500/submit-mobile-number",
        {
          mobileNumber: mobileNumber,
        }
      );

      if (response.status === 200) {
        const data = response.data;
        if (data.redirect === "/marketplace") {
          navigate("/marketplace");
        } else if (data.redirect === "/buy") {
          navigate("/buy");
        }
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-10 p-6 bg-[#F5EEC8]rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <label className="block mb-4 text-xl font-bold">
            Enter Mobile Number:
            <input
              type="text"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </label>
          <button
            type="submit"
            className="px-6 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default MobileNumberService;
