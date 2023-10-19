import React from "react";
import ImageUploader from "../components/ImageUploader";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ImgUpload = () => {
  return (
    <section className="min-h-screen bg-[#F5EEC8]">
      <Navbar />
      <ImageUploader />
      {/* <Footer /> */}
    </section>
  );
};

export default ImgUpload;
