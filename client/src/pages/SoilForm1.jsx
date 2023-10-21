import * as React from 'react';
// import TextField from '@mui/material/TextField';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { useLanguage } from "../context/LanguageContext";
import { Input } from '@chakra-ui/react';

const SoilForm1 = () => {
  const [formData, setFormData] = React.useState({
    state: '',
    district: '',
    season: ''
  });
  const [result, setResult] = React.useState('');

  const { currentLanguage } = useLanguage();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  console.log(formData)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const x = Object.values(formData);
      
      let s = ""
      for (let i = 0; i < x.length; i++){
        if (i !== x.length - 1) {
          x[i] = x[i].replace(/ /g,'');
          s += String(x[i]).toLowerCase() + " ";
        }
        else {
          x[i] = x[i].replace(/ /g,'')
          s += String(x[i]).toLowerCase();
        }
      }
      const response = await axios.post('http://127.0.0.1:5000/rec/'+s);
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
              ? "Crop Recommendation"
              : "फसल की सिफ़ारिश"}
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Input Fields */}
            <div className="relative mb-4 flex flex-col justify-center items-start font-bold">
              <label htmlFor="state" className="leading-7 text-sm text-[#555843] pb-2">
              {currentLanguage === "english"
              ? "State"
              : "राज्य"}
              </label>
              <Input
                id="state"
                name="state"
                type="text"
                value={formData.state}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </div>
            <div className="relative mb-4 flex flex-col justify-center items-start font-bold">
              <label htmlFor="district" className="leading-7 text-sm text-[#555843] pb-2">
              {currentLanguage === "english"
              ? "District"
              : "ज़िला"}
              </label>
              <Input
                id="district"
                name="district"
                type="text"
                value={formData.district}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </div>
            <div className="relative mb-4 flex flex-col justify-center items-start font-bold">
              <label htmlFor="season" className="leading-7 text-sm text-[#555843] pb-2">
              {currentLanguage === "english"
              ? "Season"
              : "मौसम"}
              </label>
              <Input
                id="season"
                name="season"
                type="text"
                value={formData.season}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
              {/* <select id="season"
                name="season"
                type="text"
                value={formData.season}>
                <option value="rabi">{currentLanguage === "english"
              ? "Rabi"
              : "ज़िला"}</option>
                <option value="kharif">{currentLanguage === "english"
              ? "Kharif"
              : "ज़िला"}</option>
                <option value="summer">{currentLanguage === "english"
              ? "Summer"
              : "ज़िला"}</option>
                <option value="autumn">{currentLanguage === "english"
              ? "Autumn"
              : "ज़िला"}</option>
                <option value="winter">{currentLanguage === "english"
              ? "Autumn"
              : "ज़िला"}</option>
                <option value="wholeyear">{currentLanguage === "english"
              ? "Whole Year"
              : "ज़िला"}</option>
            </select>*/}
            </div>
            {/* Submit Button */}
            <button className="text-white bg-[#555843] border-0 py-2 px-2 focus:outline-none rounded text-lg w-1/2">
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

export default SoilForm1;
