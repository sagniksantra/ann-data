// import React, { useState } from "react";
// import axios from "axios";
// import { useLanguage } from "../context/LanguageContext";

// const FileUpload = () => {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [predictionData, setPredictionData] = useState();
//   const [chatbotResponse, setChatbotResponse] = React.useState('');
//   const [hindiChatbotResponse, setHindiChatbotResponse] = React.useState('');
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setSelectedImage(file);
//   };
//   const { currentLanguage } = useLanguage();
//   const handleUpload = () => {
//     const formData = new FormData();
//     formData.append("image", selectedImage);

//     axios
//       .post("http://localhost:3500/upload", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       })
//       .then((response) => {

//         setPredictionData(response.data);

//         const predictedClass = response.data.predicted_class;
//         const prompt = "You are an AI assistant and answer the question as a farming expert. Don't reply with anything other than the answer. User: I am a farmer and my plant has " + predictedClass + " disease, how should i treat that and give me a detailed answer with a step by step procedure including all details. In the answer, include the necessary steps, fertilizers, medicines. Your Answer:"
//         console.log(prompt)

//         axios
//           .post("http://127.0.0.1:5000/chatbot/" + prompt +'/en/en/1')
//           .then((chatbotResponse) => {
//             // const text = chatbotResponse.data.Answer.split('\n');
//             // const html = text.join(<br />);
               // const html =  text.map((line, index) => <div key={index}>{line}</div>)
//             // var htmlObject = $(html);
//             // html = html.replace(/\n/g, '<br/>')
//             setChatbotResponse(chatbotResponse.data.Answer)
//             setHindiChatbotResponse(chatbotResponse.data.Hindi)
//           })
//           .catch((chatbotError) => {
//             console.error("Chatbot Error:", chatbotError);
//           });
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
      
//   };

//   return (
//     <div className="flex flex-col justify-center items-center">
//       <div className="flex flex-col sm:flex-row items-start justify-center w-4/5 mt-8 border-1 border-green-400">
//       {" "}
//       {/* Add mt-8 for top margin */}
//         <div className="w-1/2 flex flex-col items-center">
//           <div className="w-3/5 border-dashed border-2 border-[#555843] p-8 h-96 flex flex-col items-center justify-center text-gray-400">

//           {selectedImage ? (
//             <div className="text-center">
//               <p className="text-4xl mb-2 font-bold underline">File Selected:</p>
//               <p className="text-3xl underline;">{selectedImage.name}</p>
//             </div>
//           ) : (
//             <>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-12 w-12 text-gray-400 mb-2"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M12 6v6m0 0v6m0-6h6m-6 0H6"
//                 />
//               </svg>
//               <p className="text-2xl text-center">Drag & Drop your files here</p>
//             </>
//           )}
//           </div>
//           <input
//             type="file"
//             accept=".jpg, .jpeg, .png, .gif, .pdf"
//             className="hidden"
//             id="file-upload"
//             onChange={handleImageChange}
//           />
//           <div className="h-[20vh] flex flex-row items-center justify-between">
//             <label
//               htmlFor="file-upload"
//               className="bg-[#555843] hover:bg-[#817b59] hover:text-[#555843] text-[#F5EEC8] font-bold py-2 px-4 rounded cursor-pointer"
//             >
//               Choose File
//             </label>
//             <button
//               onClick={handleUpload}
//               className="bg-[#555843] hover:bg-[#817b59] hover:text-[#555843] text-[#F5EEC8] font-bold py-2 px-4 rounded cursor-pointer ml-2"
//             >
//               Submit
//             </button>
//           </div>
//         </div>
//         <div className="h-[60vh] w-1/2 flex flex-col justify-center items-center">
//           {predictionData && (
//             <div className="h-[60vh] w-4/5 flex flex-col justify-center items-center">
//               <h2 className="text-5xl font-bold">
//                 Predicted Disease:<br/> {predictionData.predicted_class}
//               </h2>
//               <p className="text-2xl font-bold">
//                 Confidence: {(predictionData.confidence * 100).toFixed(2)}%
//               </p>
//             </div>)
//           }
//         </div>
//       </div>
//       <p>{currentLanguage === "english"
//                     ? chatbotResponse
//                     : hindiChatbotResponse}</p>
//     </div>
//   );
// };

// export default FileUpload;
import React, { useState } from "react";
import axios from "axios";
import { useLanguage } from "../context/LanguageContext";

const FileUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [predictionData, setPredictionData] = useState();
  const [chatbotResponse, setChatbotResponse] = React.useState("");
  const [hindiChatbotResponse, setHindiChatbotResponse] = React.useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };
  const { currentLanguage } = useLanguage();
  const handleUpload = () => {
    const formData = new FormData();
    formData.append("image", selectedImage);

    axios
      .post("http://localhost:3500/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setPredictionData(response.data);

        const predictedClass = response.data.predicted_class;
        const prompt =
          "You are an AI assistant and answer the question as a farming expert. Don't reply with anything other than the answer. User: I am a farmer and my plant has " +
          predictedClass +
          " disease, how should i treat that and give me a detailed answer with a step by step procedure including all details. In the answer, include the necessary steps, fertilizers, medicines. Your Answer:";

        axios
          .post("http://127.0.0.1:5000/chatbot/" + prompt + "/en/en/1")
          .then((chatbotResponse) => {
            console.log("Chatbot Response:", chatbotResponse.data.Answer);
            const text = chatbotResponse.data.Answer.split('\n');
            const html =  text.map((line, index) => <div key={index}>{line}</div>)
            const text_hin = chatbotResponse.data.Hindi.split('\n');
            const html_hin =  text.map((line, index) => <div key={index}>{line}</div>)
            setChatbotResponse(html);
            setHindiChatbotResponse(html_hin);
          })
          .catch((chatbotError) => {
            console.error("Chatbot Error:", chatbotError);
          });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="flex flex-col px-4 justify-start items-center h-[120vh]">
      <div className="flex-col sm:flex-row items-center justify-between w-full mt-8 p-10">
        {" "}
        {/* Add mt-8 for top margin */}
        <div className=" flex justify-between w-full">
          <div className="w-1/4 mr-6 border-dashed border-2 border-[#555843] p-8 h-[65vh] flex flex-col items-center justify-center text-gray-400">
            {selectedImage ? (
              <div className="text-center">
                <p className="text-4xl mb-2 font-bold underline">
                  File Selected:
                </p>
                <p className="text-3xl underline;">{selectedImage.name}</p>
              </div>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-black mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <p className="text-2xl text-black text-center">Add File</p>
              </>
            )}
          </div>
          <input
            type="file"
            accept=".jpg, .jpeg, .png, .gif, .pdf"
            className="hidden"
            id="file-upload"
            onChange={handleImageChange}
          />

          <div className=" w-2/5 mr-6 h-[65vh] flex flex-col justify-center items-center border-dashed border-2 border-[#555843]">
            {predictionData ? (
              <div className="h-[60vh] w-4/5 flex flex-col justify-center items-center">
                <h2 className="text-5xl font-bold">
                  Predicted Disease:
                  <br /> <p className="text-red-500">{predictionData.predicted_class}</p>
                </h2>
                <h2 className="text-4xl font-bold w-full flex justify-start mt-4">
                  Confidence: <p className="text-green-600">{(predictionData.confidence * 100).toFixed(2)}%</p>
                </h2>
              </div>
            ) : (
              <>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M8 8H13M8 12H16M8 16H11M7.2 4H16.8C17.9201 4 18.4802 4 18.908 4.21799C19.2843 4.40973 19.5903 4.71569 19.782 5.09202C20 5.51984 20 6.0799 20 7.2V16.8C20 17.9201 20 18.4802 19.782 18.908C19.5903 19.2843 19.2843 19.5903 18.908 19.782C18.4802 20 17.9201 20 16.8 20H7.2C6.0799 20 5.51984 20 5.09202 19.782C4.71569 19.5903 4.40973 19.2843 4.21799 18.908C4 18.4802 4 17.9201 4 16.8V7.2C4 6.0799 4 5.51984 4.21799 5.09202C4.40973 4.71569 4.71569 4.40973 5.09202 4.21799C5.51984 4 6.0799 4 7.2 4Z"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
                <p className="text-2xl text-center">Results</p>
              </>
            )}
          </div>
          <div className="h-[65vh] min-height: fit-content; w-1/2 flex flex-col justify-center items-center overflow-y-scroll border-dashed border-2 border-[#555843] ">
            {chatbotResponse ? (
              <div className="h-full p-4">
                {currentLanguage === "english"
                  ? chatbotResponse
                  : hindiChatbotResponse}
              </div>
            ) : (
              <>
                <svg
                  fill="#000000"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 100"
                  xmlSpace="preserve"
                  className="w-10 h-10"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <g>
                      {" "}
                      <g>
                        {" "}
                        <path d="M47.6,20.1c-9.8,1.1-17.7,8.8-18.5,18.4c-0.6,7,2.5,13.4,7.5,17.5c1.5,1.2,2.4,3,2.4,4.9v0.1 c0,2.8,2.3,5.1,5.2,5.1h11.6c2.9,0,5.2-2.3,5.2-5.1v-0.1c0-1.9,0.9-3.7,2.4-4.9C68,52.2,71,46.6,71,40.3 C71,28.3,60.3,18.8,47.6,20.1z"></path>{" "}
                      </g>{" "}
                      <g>
                        {" "}
                        <path d="M59,72H41c-1.1,0-2,0.9-2,2c0,3.3,2.7,6,6,6h10c3.3,0,6-2.7,6-6C61,72.9,60.1,72,59,72z"></path>{" "}
                      </g>{" "}
                    </g>{" "}
                  </g>
                </svg>
                <p className="text-2xl text-center">Solution</p>
              </>
            )}
          </div>
        </div>
        <div className="h-[20vh] flex flex-row items-center justify-start">
          <label
            htmlFor="file-upload"
            className="bg-[#555843] hover:bg-[#817b59] hover:text-[#555843] text-[#F5EEC8] font-bold py-2 px-4 rounded cursor-pointer"
          >
            Choose File
          </label>
          <button
            onClick={handleUpload}
            className="bg-[#555843] hover:bg-[#817b59] hover:text-[#555843] text-[#F5EEC8] font-bold py-2 px-4 rounded cursor-pointer ml-2"
          >
            Submit
          </button>
        </div>
      </div>
      {/* {predictionData && (
        <div className="h-[60vh] w-4/5 flex flex-col justify-center items-center">
          <h2 className="text-5xl font-bold">
            Predicted Disease:
            <br /> {predictionData.predicted_class}
          </h2>
          <p className="text-2xl font-bold">
            Confidence: {(predictionData.confidence * 100).toFixed(2)}%
          </p>
        </div>
      )} */}
    </div>
  );
};

export default FileUpload;