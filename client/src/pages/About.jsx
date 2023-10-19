import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About = () => {
  return (
    <>
      <Navbar />
      <section className="bg-[#F5EEC8] text-gray-600 body-font min-h-screen">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Meet the Minds Behind अन्न-Data
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Meet the visionaries, innovators, and agriculture enthusiasts who
              form the core of अन्न-Data, a team committed to revolutionizing
              farming through cutting-edge technology, sustainable practices,
              and a shared dedication to feeding the world.
            </p>
          </div>
          <div className="flex flex-wrap -m-2">
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src="https://dummyimage.com/80x80"
                />
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">
                    Dev Thakkar
                  </h2>
                  <p className="text-gray-500">Backend-Engineer</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src="https://dummyimage.com/84x84"
                />
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">
                    Sagnik Santra
                  </h2>
                  <p className="text-gray-500">Frontend-Engineer</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src="https://dummyimage.com/88x88"
                />
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">
                    Abhigyan Basak
                  </h2>
                  <p className="text-gray-500">ML Scientist</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src="https://dummyimage.com/90x90"
                />
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">
                    Sujal Ranjan
                  </h2>
                  <p className="text-gray-500">Backend-Engineer</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src="https://dummyimage.com/94x94"
                />
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">
                    Milind Jha
                  </h2>
                  <p className="text-gray-500">ML Scientist</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default About;