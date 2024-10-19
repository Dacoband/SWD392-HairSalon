import React from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  // Slider settings for showing 4 services at a time
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Display 4 slides at a time
    slidesToScroll: 1,
    nextArrow: <div>›</div>, // Custom next arrow if needed
    prevArrow: <div>‹</div>, // Custom previous arrow if needed
  };

  return (
    <div className="relative">
      <div className="relative">
        <img
          src="src/assets/hero-img.jpg"
          className="w-full h-30 object-cover"
          alt="Hero"
        />
        {/* Button positioned on top of the image */}
        <button
          className="absolute font-bold bottom-10 left-10 px-6 py-3 bg-[#8e7424] text-white rounded-full hover:bg-[#74601d]"
          onClick={() => {
            // Get the user data from localStorage
            const userData = JSON.parse(
              localStorage.getItem("userData") || "{}"
            );

            // Check if the user is logged in and has the role "MB"
            if (userData && userData.role === "MB") {
              navigate("/service");
            } else {
              // If not logged in or not an "MB" role, navigate to /login
              navigate("/login");
            }
          }}
        >
          Đặt Lịch Hẹn Ngay!
        </button>
      </div>

      {/* Content based on the provided image */}
      <div className="bg-gradient-to-br py-3 from-white to-[#8e7424] p-5">
        {/* Service Package Section */}
        <div className="text-center items-center ml-5 mr-5">
          <h2 className="text-2xl font-bold mb-5">Gói Dịch Vụ </h2>
          {/* Slider for Service Cards */}
          <Slider {...settings}>
            {Array(6)
              .fill("")
              .map((_, index) => (
                <div key={index} className="flex flex-col items-center p-3">
                  {/* Container for both image and service name */}
                  <div className="w-48 h-60 rounded-lg shadow-lg overflow-hidden">
                    <img
                      src="src/assets/post-img-2.jpg" // Replace with actual image source
                      alt="Service"
                      className="w-full h-48 object-cover"
                    />
                    <div className="bg-[#c89c47] mt-0 px-4 py-2 w-full text-center">
                      <span className="text-white">Service {index + 1}</span>
                    </div>
                  </div>
                </div>
              ))}
          </Slider>
        </div>
        {/* Booking Section */}
        <div className="flex flex-col items-center mt-10 bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="mb-5 text-center">
            <strong>Booking just in a few seconds</strong>
          </p>
          <ul className="list-disc ml-5 mb-5 text-left">
            <li>No fee when canceled</li>
            <li>No need to pay first to get a seat</li>
          </ul>

          {/* Container for form inputs with horizontal spacing */}
          <div className="flex justify-center gap-4 mb-4">
            <select className="p-2 border border-gray-300 rounded-md">
              <option>Select Branch</option>
              {/* Add options for stylists */}
            </select>
            {/* <input
              type="date"
              className="p-2 border border-gray-300 rounded-md"
            /> */}
            {/* <select className="p-2 border border-gray-300 rounded-md">
              <option>Select time</option>
            </select> */}
          </div>

          {/* Booking button with spacing */}
          <button className="bg-[#c89c47] text-white px-6 py-3 rounded-md mt-4">
            Booking
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-gray-50">
        {/* Left Column: Image */}
        <div className="w-full md:w-1/2">
          <img
            src="src\assets\about-img.jpg" // Replace with actual image source
            alt="Salon Experience"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Right Column: Text Content */}
        <div className="w-full md:w-1/2 md:pl-6 mt-4 md:mt-0">
          <h2 className="text-3xl font-bold mb-2">HAIR SALON WEBSITE</h2>
          <h3 className="text-xl text-gray-600 mb-4">BEST EXPERIENCE EVER</h3>
          <p className="mb-4">Hair Salon</p>
          <p className="mb-4">Hair Salon</p>
          <p className="mb-4">Hair Salon</p>
          <button className="bg-[#8e7424] text-white px-6 py-2 rounded-md hover:bg-[#74601d]">
            VIEW MORE ABOUT US
          </button>
        </div>
      </div>
      <div>
        <h1 onClick={() => navigate("/logout")}>Logout</h1>
      </div>
    </div>
  );
};

export default HomePage;
