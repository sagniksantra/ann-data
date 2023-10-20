import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
// import { set } from "mongoose";

const Dashboard = () => {
  // Initialize the state with default data
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

  // Define a function to fetch data from the API
  const fetchFarmerData = async () => {
    try {
      const { data } = await axios.get("http://localhost:3500/user-details", {
        withCredentials: true,
      });
      if (data.length > 0) {
        // Update the state with data from the API
        setFarmerData(data[0]);
      }
      // If there's no data, the default data will remain.
    } catch (error) {
      // Handle any errors here, e.g., log the error
      console.log(error);
    }
  };
  const temperature = [26, 27, 28, 29, 30, 32, 34];
  const humidity = [26, 28, 30, 48, 67, 33, 39];

  // Use useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchFarmerData();
  }, []);
  return (
    <>
      <Navbar />
      <h1 className="text-3xl font-normal ml-[45%] mt-2">Profile</h1>
      <div className="flex mt-4 flex-wrap">
        <div className="w-1/2  ">
          <h2 className="text-xl font-bold font-serif ml-4">Personal Info</h2>
          <div className="flex flex-wrap -m-2 p-4">
            <div className="p-2 lg:w-1/2 h-28 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <svg
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000000"
                  className="w-10 h-10 mr-4"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <g id="add-user" transform="translate(-2 -2)">
                      {" "}
                      <circle
                        id="secondary"
                        fill="#2ca9bc"
                        cx="4"
                        cy="4"
                        r="4"
                        transform="translate(7 3)"
                      ></circle>{" "}
                      <path
                        id="primary"
                        d="M13,15H8a5,5,0,0,0-5,5,1,1,0,0,0,1,1H15"
                        fill="none"
                        stroke="#000000"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      ></path>{" "}
                      <path
                        id="primary-2"
                        data-name="primary"
                        d="M17,17h4m-2-2v4M11,3a4,4,0,1,0,4,4A4,4,0,0,0,11,3Z"
                        fill="none"
                        stroke="#000000"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      ></path>{" "}
                    </g>{" "}
                  </g>
                </svg>
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">Name</h2>
                  <p className="text-gray-500">{farmerData.name}</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/2 h-28 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <svg
                  fill="#f5790c"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 241 260"
                  enable-background="new 0 0 241 260"
                  xmlSpace="preserve"
                  stroke="#f5790c"
                  className="w-12 h-12 mr-4"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <polygon points="227.822,63.335 215.884,64.816 195.815,80.809 197.159,87.984 179.343,90.9 171.988,87.529 170.643,79.845 163.422,80.02 165.128,93.27 146.79,93.703 121.821,86.002 100.271,74.179 106.398,62.15 90.884,51.603 89.61,41.434 93.782,43.975 98.261,41.155 93.118,31.532 102.741,22.739 104.772,15.626 97.113,12.953 82.998,15.439 68.397,2 52.291,3.126 47.145,9.69 58.727,18.336 55.858,21.297 52.997,21.914 52.814,35.434 63.024,41.67 34.41,80.535 22.268,79.373 14.591,89.807 26.46,109.512 17.324,113.75 7.186,112.018 2.289,116.552 10.581,125.209 9.784,132.863 23.954,145.028 24.25,144.8 37.85,140.7 39.582,147.898 39.855,169.221 58.216,223.805 62.682,232.394 68.741,252.441 73.594,258 82.205,257.339 83.845,251.986 98.311,235.424 98.311,233.897 98.015,226.243 98.357,225.15 102.366,211.822 101.957,211.572 102.116,211.185 102.366,211.822 102.207,211.048 100.157,197.766 101.957,191.866 134.397,168.287 140.16,160.633 143.737,154.984 153.578,152.455 162.076,137.579 167.497,134.252 175.448,136.394 168.5,105.412 168.181,93.908 177.999,95.798 179.594,102.428 184.265,104.774 200.826,105.002 199.186,109.284 200.621,116.712 204.198,130.198 210.167,121.153 208.959,113.112 214.745,113.727 218.96,99.625 222.879,88.44 234.451,81.128 238.711,74.794 "></polygon>{" "}
                  </g>
                </svg>
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">
                    State
                  </h2>
                  <p className="text-gray-500">{farmerData.state}</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/2 h-28 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <svg
                  fill="#000000"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 mr-4"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <title>ionicons-v5-q</title>
                    <path d="M256,368a16,16,0,0,1-7.94-2.11L108,285.84a8,8,0,0,0-12,6.94V368a16,16,0,0,0,8.23,14l144,80a16,16,0,0,0,15.54,0l144-80A16,16,0,0,0,416,368V292.78a8,8,0,0,0-12-6.94L263.94,365.89A16,16,0,0,1,256,368Z"></path>
                    <path d="M495.92,190.5s0-.08,0-.11a16,16,0,0,0-8-12.28l-224-128a16,16,0,0,0-15.88,0l-224,128a16,16,0,0,0,0,27.78l224,128a16,16,0,0,0,15.88,0L461,221.28a2,2,0,0,1,3,1.74V367.55c0,8.61,6.62,16,15.23,16.43A16,16,0,0,0,496,368V192A14.76,14.76,0,0,0,495.92,190.5Z"></path>
                  </g>
                </svg>
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">
                    Education
                  </h2>
                  <p className="text-gray-500">{farmerData.education}</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/2 h-28 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="w-10 h-10 mr-4"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      fill="#06d43d"
                      fill-rule="evenodd"
                      d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12zm7-6a1 1 0 0 0 0 2h3c.34 0 .872.11 1.29.412.19.136.372.321.505.588H7.997a1 1 0 1 0 0 2h4.798a1.58 1.58 0 0 1-.504.588A2.352 2.352 0 0 1 11 12H7.997a1 1 0 0 0-.625 1.781l5.003 4a1 1 0 1 0 1.25-1.562L10.848 14h.15c.661 0 1.629-.19 2.46-.789A3.621 3.621 0 0 0 14.896 11H16a1 1 0 1 0 0-2h-1.104a3.81 3.81 0 0 0-.367-1H16a1 1 0 1 0 0-2H8z"
                      clip-rule="evenodd"
                    ></path>
                  </g>
                </svg>
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">
                    Revenue
                  </h2>
                  <p className="text-gray-500">₹{farmerData.familyIncome}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <div class="flex justify-center">
            <div class="card  min-w-sm max-w-sm border border-gray-100 bg-gray-50   transition-shadow test  shadow-lg hover:shadow-shadow-xl w-full bg-green-600 text-purple-50 rounded-md">
              <h2 class="text-md mb-2 px-4 pt-4">
                <div class="flex justify-between">
                  <div class="badge relative top-0">
                    <span class="mt-2 py-1 h-12px text-md font-semibold w-12px  rounded right-1 bottom-1 px-4">
                      Jalandhar
                    </span>
                  </div>
                  <span class="text-lg font-bold ">{new Date().hours}</span>
                </div>
              </h2>

              <div class="flex items-center p-4">
                <div class="flex justify-center items-center w-96">
                  <svg
                    height="20"
                    width="20"
                    viewBox="0 0 32 32"
                    class="fill-current h-32 w-32 text-yellow-300"
                  >
                    <path
                      d="M21.743,18.6872A6.05,6.05,0,0,0,22.8,17.6006a5.9977,5.9977,0,1,0-10.7334-4.4444,7.5568,7.5568,0,0,0-5.7158,5.0879A5.9926,5.9926,0,0,0,8,30H19a5.9854,5.9854,0,0,0,2.743-11.3128ZM18,10a4.0042,4.0042,0,0,1,4,4,3.9613,3.9613,0,0,1-.8,2.3994,4.0122,4.0122,0,0,1-.94.8917,7.5416,7.5416,0,0,0-6.1339-4.2395A3.9985,3.9985,0,0,1,18,10Zm1,18H8a3.9928,3.9928,0,0,1-.6729-7.93L7.99,19.958l.1456-.6562a5.4958,5.4958,0,0,1,10.729,0l.1464.6562.6622.1123A3.9928,3.9928,0,0,1,19,28Z"
                      transform="translate(0 .005)"
                    ></path>
                    <path d="M26 13.005H30V15.005H26z"></path>
                    <path
                      d="M23.071 5.929H27.071V7.929H23.071z"
                      transform="rotate(-45 25.077 6.931)"
                    ></path>
                    <path d="M17 2.005H19V6.005H17z"></path>
                    <path
                      d="M9.929 4.929H11.929V8.929H9.929z"
                      transform="rotate(-45 10.935 6.931)"
                    ></path>
                  </svg>
                </div>
              </div>
              <div class="text-md pt-4 pb-4 px-4">
                <div class="flex justify-between items-center">
                  <div class="space-y-2">
                    <span class="flex space-x-2 items-center">
                      <svg
                        height="20"
                        width="20"
                        viewBox="0 0 32 32"
                        class="fill-current"
                      >
                        <path d="M13,30a5.0057,5.0057,0,0,1-5-5h2a3,3,0,1,0,3-3H4V20h9a5,5,0,0,1,0,10Z"></path>
                        <path d="M25 25a5.0057 5.0057 0 01-5-5h2a3 3 0 103-3H2V15H25a5 5 0 010 10zM21 12H6V10H21a3 3 0 10-3-3H16a5 5 0 115 5z"></path>
                      </svg>{" "}
                      <span>{Math.floor(Math.random() * 25)}km/h</span>
                    </span>
                    <span class="flex space-x-2 items-center">
                      <svg
                        height="20"
                        width="20"
                        viewBox="0 0 32 32"
                        class="fill-current"
                      >
                        <path d="M16,24V22a3.2965,3.2965,0,0,0,3-3h2A5.2668,5.2668,0,0,1,16,24Z"></path>
                        <path d="M16,28a9.0114,9.0114,0,0,1-9-9,9.9843,9.9843,0,0,1,1.4941-4.9554L15.1528,3.4367a1.04,1.04,0,0,1,1.6944,0l6.6289,10.5564A10.0633,10.0633,0,0,1,25,19,9.0114,9.0114,0,0,1,16,28ZM16,5.8483l-5.7817,9.2079A7.9771,7.9771,0,0,0,9,19a7,7,0,0,0,14,0,8.0615,8.0615,0,0,0-1.248-3.9953Z"></path>
                      </svg>{" "}
                      <span>{humidity[Math.floor(Math.random() * 6)]}%</span>
                    </span>
                  </div>
                  <div>
                    <h1 class="text-6xl">
                      {" "}
                      {temperature[Math.floor(Math.random() * 6)]}°C
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2  mt-5 ">
          <h2 className="text-xl font-bold font-serif ml-4">Seed Dealer</h2>
          {/* <div className="flex flex-wrap -m-2 p-4">
            <div className="p-2 lg:w-1/2 h-28 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <svg
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000000"
                  className="w-10 h-10 mr-4"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <g id="add-user" transform="translate(-2 -2)">
                      {" "}
                      <circle
                        id="secondary"
                        fill="#2ca9bc"
                        cx="4"
                        cy="4"
                        r="4"
                        transform="translate(7 3)"
                      ></circle>{" "}
                      <path
                        id="primary"
                        d="M13,15H8a5,5,0,0,0-5,5,1,1,0,0,0,1,1H15"
                        fill="none"
                        stroke="#000000"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      ></path>{" "}
                      <path
                        id="primary-2"
                        data-name="primary"
                        d="M17,17h4m-2-2v4M11,3a4,4,0,1,0,4,4A4,4,0,0,0,11,3Z"
                        fill="none"
                        stroke="#000000"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      ></path>{" "}
                    </g>{" "}
                  </g>
                </svg>
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">Name</h2>
                  <p className="text-gray-500">{farmerData.name}</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/2 h-28 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <svg
                  fill="#f5790c"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 241 260"
                  enable-background="new 0 0 241 260"
                  xmlSpace="preserve"
                  stroke="#f5790c"
                  className="w-12 h-12 mr-4"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <polygon points="227.822,63.335 215.884,64.816 195.815,80.809 197.159,87.984 179.343,90.9 171.988,87.529 170.643,79.845 163.422,80.02 165.128,93.27 146.79,93.703 121.821,86.002 100.271,74.179 106.398,62.15 90.884,51.603 89.61,41.434 93.782,43.975 98.261,41.155 93.118,31.532 102.741,22.739 104.772,15.626 97.113,12.953 82.998,15.439 68.397,2 52.291,3.126 47.145,9.69 58.727,18.336 55.858,21.297 52.997,21.914 52.814,35.434 63.024,41.67 34.41,80.535 22.268,79.373 14.591,89.807 26.46,109.512 17.324,113.75 7.186,112.018 2.289,116.552 10.581,125.209 9.784,132.863 23.954,145.028 24.25,144.8 37.85,140.7 39.582,147.898 39.855,169.221 58.216,223.805 62.682,232.394 68.741,252.441 73.594,258 82.205,257.339 83.845,251.986 98.311,235.424 98.311,233.897 98.015,226.243 98.357,225.15 102.366,211.822 101.957,211.572 102.116,211.185 102.366,211.822 102.207,211.048 100.157,197.766 101.957,191.866 134.397,168.287 140.16,160.633 143.737,154.984 153.578,152.455 162.076,137.579 167.497,134.252 175.448,136.394 168.5,105.412 168.181,93.908 177.999,95.798 179.594,102.428 184.265,104.774 200.826,105.002 199.186,109.284 200.621,116.712 204.198,130.198 210.167,121.153 208.959,113.112 214.745,113.727 218.96,99.625 222.879,88.44 234.451,81.128 238.711,74.794 "></polygon>{" "}
                  </g>
                </svg>
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">
                    State
                  </h2>
                  <p className="text-gray-500">{farmerData.state}</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/2 h-28 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <svg
                  fill="#000000"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 mr-4"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <title>ionicons-v5-q</title>
                    <path d="M256,368a16,16,0,0,1-7.94-2.11L108,285.84a8,8,0,0,0-12,6.94V368a16,16,0,0,0,8.23,14l144,80a16,16,0,0,0,15.54,0l144-80A16,16,0,0,0,416,368V292.78a8,8,0,0,0-12-6.94L263.94,365.89A16,16,0,0,1,256,368Z"></path>
                    <path d="M495.92,190.5s0-.08,0-.11a16,16,0,0,0-8-12.28l-224-128a16,16,0,0,0-15.88,0l-224,128a16,16,0,0,0,0,27.78l224,128a16,16,0,0,0,15.88,0L461,221.28a2,2,0,0,1,3,1.74V367.55c0,8.61,6.62,16,15.23,16.43A16,16,0,0,0,496,368V192A14.76,14.76,0,0,0,495.92,190.5Z"></path>
                  </g>
                </svg>
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">
                    Education
                  </h2>
                  <p className="text-gray-500">{farmerData.education}</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/2 h-28 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="w-10 h-10 mr-4"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      fill="#06d43d"
                      fill-rule="evenodd"
                      d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12zm7-6a1 1 0 0 0 0 2h3c.34 0 .872.11 1.29.412.19.136.372.321.505.588H7.997a1 1 0 1 0 0 2h4.798a1.58 1.58 0 0 1-.504.588A2.352 2.352 0 0 1 11 12H7.997a1 1 0 0 0-.625 1.781l5.003 4a1 1 0 1 0 1.25-1.562L10.848 14h.15c.661 0 1.629-.19 2.46-.789A3.621 3.621 0 0 0 14.896 11H16a1 1 0 1 0 0-2h-1.104a3.81 3.81 0 0 0-.367-1H16a1 1 0 1 0 0-2H8z"
                      clip-rule="evenodd"
                    ></path>
                  </g>
                </svg>
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">
                    Revenue
                  </h2>
                  <p className="text-gray-500">₹{farmerData.familyIncome}</p>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Dashboard;
