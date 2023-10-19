import React, { useState } from "react";
import axios from "axios";
const FileUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };
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
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div className="flex flex-col items-center space-y-4 mt-8 border-1 border-green-400">
      {" "}
      {/* Add mt-8 for top margin */}
      <div className="relative border-dashed border-2 border-[#555843] p-8 w-4/5 h-96 flex flex-col items-center justify-center text-gray-400">
        {selectedImage ? (
          <div className="text-center">
            <p className="text-2xl mb-2">File Selected:</p>
            <p className="text-lg">{selectedImage.name}</p>
          </div>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-gray-400 mb-2"
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
            <p className="text-2xl text-center">Drag & Drop your files here</p>
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
      <div className="flex items-center justify-center">
        <label
          htmlFor="file-upload"
          className="bg-[#555843] hover:bg-[#F5EEC8] hover:text-[#555843] text-[#F5EEC8] font-bold py-2 px-4 rounded cursor-pointer"
        >
          Choose File
        </label>
        <button
          onClick={handleUpload}
          className="bg-[#555843] hover:bg-[#F5EEC8] hover:text-[#555843] text-[#F5EEC8] font-bold py-2 px-4 rounded cursor-pointer ml-2"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default FileUpload;
