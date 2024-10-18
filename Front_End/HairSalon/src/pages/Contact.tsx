import React from "react";
import { useNavigate } from "react-router-dom";
const Contact = () => {
  const navigate = useNavigate();
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
          className="absolute bottom-10 left-10 px-6 py-3 bg-[#8e7424] text-white rounded-full hover:bg-[#74601d]"
          onClick={() => navigate("/service")}
        >
          Booking Now!!!
        </button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start">
        {/* Left Column: Contact Info */}
        <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-lg mb-6 md:mb-0">
          <h2 className="text-xl font-semibold mb-4">CONTACT INFO</h2>
          <p className="mb-2">Hair Salon</p>
          <p className="mb-2">FPT University</p>
          <p className="mb-2">Thủ Đức, Việt Nam</p>
          <p className="mb-2">P: (+84) 123456789</p>
          <p className="mb-4">Email: HairSalon@gmail.com</p>
          {/* Social Media Links */}
          <div className="flex space-x-3">
            <a className="text-gray-600 hover:text-yellow-500"></a>
            <a className="text-gray-600 hover:text-yellow-500"></a>
            <a className="text-gray-600 hover:text-yellow-500"></a>
            <a className="text-gray-600 hover:text-yellow-500"></a>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">CONTACT FORM</h2>
          <p className="mb-4">
            Please complete the form below. We'll do everything we can to
            respond to you as quickly as possible.
          </p>
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Name"
                className="p-3 border border-gray-300 rounded-md"
                required
              />
              <input
                type="tel"
                placeholder="Phone"
                className="p-3 border border-gray-300 rounded-md"
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="p-3 border border-gray-300 rounded-md"
                required
              />
              <input
                type="text"
                placeholder="Subject"
                className="p-3 border border-gray-300 rounded-md"
                required
              />
            </div>
            <textarea
              placeholder="Message"
              className="p-3 border border-gray-300 rounded-md w-full mb-4"
              rows={4}
              required
            ></textarea>
            <button className="bg-[#c89c47] text-white px-6 py-2 rounded-md hover:bg-[#b08e3a]">
              SEND MESSAGE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
