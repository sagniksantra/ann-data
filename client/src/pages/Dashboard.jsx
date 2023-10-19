import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

const Dashboard = () => {
  // Placeholder data for the dashboard
  const [farmerData, setFarmerData] = useState({
    name: "Ram Kumar",
    state: "Maharashtra",
    cropType: "Rice",
    landAmount: 5.5,
    familyMembers: 4,
    familyIncome: 600000,
    education: "High School",
    farmingExperience: 8,
  });

  const fetchFarmerData = async () => {
    try {
      const { data } = await axios.get("http://localhost:3500/user-details", {
        withCredentials: true,
      });
      setFarmerData(data[0]);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFarmerData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-[#F5EEC8] min-h-screen flex items-center justify-center">
        <div className="p-6 bg-[#F5EEC8] rounded-lg">
          <h1 className="text-2xl font-bold mb-4 text-center">
            Personal Information
          </h1>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="p-4">
              <p className="mb-2">
                <span className="font-semibold">Name:</span> {farmerData.name}
              </p>
              <p className="mb-2">
                <span className="font-semibold">State:</span> {farmerData.state}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Crop Type:</span>{" "}
                {farmerData.cropType}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Land Amount:</span>{" "}
                {farmerData.landAmount} acres
              </p>
              <p className="mb-2">
                <span className="font-semibold">Number of Family Members:</span>{" "}
                {farmerData.familyMembers}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Education Level:</span>{" "}
                {farmerData.education}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Farming Experience:</span>{" "}
                {farmerData.farmingExperience} years
              </p>
              {/* <p className="mb-2">
                <span className="font-semibold">Languages Spoken:</span>{" "}
                {farmerData.languages.join(", ")}
              </p> */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
