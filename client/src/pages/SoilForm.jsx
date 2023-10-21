import * as React from 'react';
// import TextField from '@mui/material/TextField';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { useLanguage } from "../context/LanguageContext";
import { Input } from '@chakra-ui/react';

const SoilForm = () => {
  const [formData, setFormData] = React.useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    temperature: '',
    humidity: '',
    pH: '',
    rainfall: '',
  });
  const [result, setResult] = React.useState('');
  const { currentLanguage } = useLanguage();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const x = Object.values(formData);
      
      let s = "";
      for (let i = 0; i < x.length; i++){
        if (i !== x.length - 1) {
          s += String(x[i]) + " ";
        }
        else {
          s += String(x[i]);
        }
      }
      const response = await axios.post('http://127.0.0.1:5000/predict/'+s);
      let output = "";
      for (let i = 0; i < Object.keys(response.data).length; i++) {
        let crop_num = "crop" + String(i + 1);
        if (i !== Object.keys(response.data).length - 1) {
            output += "Crop " + String(i + 1) + " : " + String(response.data[crop_num]) + " ";
          }
          else {
            output += "Crop " + String(i + 1) + " : " + String(response.data[crop_num]);
          }
      }
      setResult(output);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="bg-[#F5EEC8] text-gray-600 body-font min-h-screen">
      <Navbar />
      <div className="container px-5 py-24 mx-auto flex flex-wrap items-center justify-center">
        <div className="bg-[#A7D397] lg:w-7/12 md:w-1/2 rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0 items-center">
          <h2 className="text-gray-900 text-4xl font-medium title-font mb-5">{currentLanguage === "english"
                    ? "Soil Composition"
                    : "मिट्टी की संरचना"}</h2>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-wrap justify-evenly'>
            {/* Input Fields */}
            <div className="relative mb-4 flex flex-col justify-center items-start font-bold">
              <label htmlFor="nitrogen" className="leading-7 text-sm text-[#555843] pb-2">
              {currentLanguage === "english"
                    ? "Nitrogen"
                    : "नाइट्रोजन"}
              </label>
              <Input
                id="nitrogen"
                name="nitrogen"
                // label="Quantity"
                type="number"
                value={formData.nitrogen}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </div>
            <div className="relative mb-4 flex flex-col justify-center items-start font-bold">
              <label htmlFor="phosphorus" className="leading-7 text-sm text-[#555843] pb-2">
              {currentLanguage === "english"
                    ? "Phosphorus"
                    : "फास्फोरस"}
              </label>
              <Input
                id="phosphorus"
                name="phosphorus"
                // label="Quantity"
                type="number"
                value={formData.phosphorus}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </div>
            <div className="relative mb-4 flex flex-col justify-center items-start font-bold">
              <label htmlFor="potassium" className="leading-7 text-sm text-[#555843] pb-2">
              {currentLanguage === "english"
                    ? "Potassium"
                    : "पोटैशियम"}
              </label>
              <Input
                id="potassium"
                name="potassium"
                // label="Quantity"
                type="number"
                value={formData.potassium}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </div>
            <div className="relative mb-4 flex flex-col justify-center items-start font-bold">
              <label htmlFor="temperature" className="leading-7 text-sm text-[#555843] pb-2">
              {currentLanguage === "english"
                    ? "Temperature"
                    : "तापमान"}
              </label>
              <Input
                id="temperature"
                name="temperature"
                // label="Quantity"
                type="number"
                value={formData.temperature}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </div>
            <div className="relative mb-4 flex flex-col justify-center items-start font-bold">
              <label htmlFor="humidity" className="leading-7 text-sm text-[#555843] pb-2">
              {currentLanguage === "english"
                    ? "Humidity"
                    : "नमी"}
              </label>
              <Input
                id="humidity"
                name="humidity"
                // label="Quantity"
                type="number"
                value={formData.humidity}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </div>
            <div className="relative mb-4 flex flex-col justify-center items-start font-bold">
              <label htmlFor="pH" className="leading-7 text-sm text-[#555843] pb-2">
              {currentLanguage === "english"
                    ? "pH"
                    : "पीएच"}
              </label>
              <Input
                id="pH"
                name="pH"
                // label="Quantity"
                type="number"
                value={formData.pH}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </div>
            <div className="relative mb-4 flex flex-col justify-center items-start font-bold">
              <label htmlFor="rainfall" className="leading-7 text-sm text-[#555843] pb-2">
              {currentLanguage === "english"
                    ? "Rainfall"
                    : "वर्षा"}
              </label>
              <Input
                id="rainfall"
                name="rainfall"
                label="Quantity"
                type="number"
                value={formData.rainfall}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </div>
            </div>
            {/* Submit Button */}
            <button className="text-white bg-[#555843] border-0 py-2 px-2 focus:outline-none rounded text-lg w-1/4 ml-[19rem]">
            {currentLanguage === "english"
              ? "Predict"
              : "भविष्यवाणी"}
            </button>
          </form>
          {/* Display Result */}
          {result && (
            <div className="mt-6 p-4 bg-white border rounded-lg shadow">
              <p className="text-[#555843] text-lg font-semibold">Predicted Crop:</p>
              <p className="text-gray-900 text-xl">{result}</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default SoilForm;
