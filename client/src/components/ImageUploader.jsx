import React, { useState } from 'react';

function ImageUploader() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setSelectedImage(event.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Image Uploader</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="block w-full px-4 py-2 mt-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
      />
      {selectedImage && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Preview:</h3>
          <img
            src={selectedImage}
            alt="Selected"
            className="w-full max-h-40 object-cover"
          />
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
