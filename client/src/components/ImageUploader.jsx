import React, { useState } from 'react';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 mt-8"> {/* Add mt-8 for top margin */}
      <div className="relative border-dashed border-2 border-[#555843] p-8 w-64 h-64 flex flex-col items-center justify-center text-gray-400">
        {selectedFile ? (
          <div className="text-center">
            <p className="text-2xl mb-2">File Selected:</p>
            <p className="text-lg">{selectedFile.name}</p>
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
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
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
        onChange={handleFileSelect}
      />
      <label
        htmlFor="file-upload"
        className="bg-[#555843] hover:bg-[#F5EEC8] hover:text-[#555843] text-[#F5EEC8] font-bold py-2 px-4 rounded cursor-pointer"
      >
        Choose File
      </label>
    </div>
  );
};

export default FileUpload;
