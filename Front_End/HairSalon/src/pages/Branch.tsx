import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {Branches} from "../models/type";

// URL API
const API_URL = "https://api.vol-ka.studio/api/v1/branch/all";

const Branch: React.FC = () => {
  const [branches, setBranches] = useState<Branches[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await axios.get(API_URL);
        setBranches(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load branches");
        setLoading(false);
      }
    };

    fetchBranches();
  }, []);

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  return (
    <div className="relative">
      <div className="relative">
        <img
          src="src/assets/hero-img.jpg"
          className="w-full h-60 object-cover mb-6"
          alt="Hero"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-5xl font-bold">
            Chi Nhánh Của Chúng Tôi
          </h1>
        </div>

        <button
          className="absolute font-bold bottom-10 left-10 px-6 py-3 bg-[#8e7424] text-white rounded-full hover:bg-[#74601d] transition duration-300"
          onClick={() => {
            const userData = JSON.parse(
              localStorage.getItem("userData") || "{}"
            );
            if (userData && userData.role === "MB") {
              navigate("/service");
            } else {
              navigate("/login");
            }
          }}
        >
          Đặt Lịch Hẹn Ngay!
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {branches.map((branch) => (
          <div
            key={branch.branchID}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
          >
            <img
              src="src/assets/branch-placeholder.jpg" // Placeholder image
              alt={branch.salonBranches}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2 text-[#333]">
                {branch.salonBranches}
              </h3>
              <p className="text-gray-700 mb-1">Address: {branch.address}</p>
              <p className="text-gray-700">Phone: {branch.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Branch;

// import React from "react";
// import { useNavigate } from "react-router-dom";
// const Branch: React.FC = () => {
//   const navigate = useNavigate();
//   return (
//     <div className="relative">
//       <div className="relative">
//         <img
//           src="src/assets/hero-img.jpg"
//           className="w-full h-30 object-cover"
//           alt="Hero"
//         />
//         {/* Button positioned on top of the image */}
//         <button
//           className="absolute bottom-10 left-10 px-6 py-3 bg-[#8e7424] text-white rounded-full hover:bg-[#74601d]"
//           onClick={() => navigate("/service")}
//         >
//           Booking Now!!!
//         </button>
//       </div>

//       <div className="flex flex-col md:flex-row justify-between items-start">
//         {/* Left Column: Contact Info */}
//         <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-lg mb-6 md:mb-0">
//           <h2 className="text-xl font-semibold mb-4">CONTACT INFO</h2>
//           <p className="mb-2">Hair Salon</p>
//           <p className="mb-2">FPT University</p>
//           <p className="mb-2">Thủ Đức, Việt Nam</p>
//           <p className="mb-2">P: (+84) 123456789</p>
//           <p className="mb-4">Email: HairSalon@gmail.com</p>
//           {/* Social Media Links */}
//           <div className="flex space-x-3">
//             <a className="text-gray-600 hover:text-yellow-500"></a>
//             <a className="text-gray-600 hover:text-yellow-500"></a>
//             <a className="text-gray-600 hover:text-yellow-500"></a>
//             <a className="text-gray-600 hover:text-yellow-500"></a>
//           </div>
//         </div>

//         {/* Right Column: Contact Form */}
//         <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-lg">
//           <h2 className="text-xl font-semibold mb-4">CONTACT FORM</h2>
//           <p className="mb-4">
//             Please complete the form below. We'll do everything we can to
//             respond to you as quickly as possible.
//           </p>
//           <form>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//               <input
//                 type="text"
//                 placeholder="Name"
//                 className="p-3 border border-gray-300 rounded-md"
//                 required
//               />
//               <input
//                 type="tel"
//                 placeholder="Phone"
//                 className="p-3 border border-gray-300 rounded-md"
//                 required
//               />
//               <input
//                 type="email"
//                 placeholder="Email"
//                 className="p-3 border border-gray-300 rounded-md"
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Subject"
//                 className="p-3 border border-gray-300 rounded-md"
//                 required
//               />
//             </div>
//             <textarea
//               placeholder="Message"
//               className="p-3 border border-gray-300 rounded-md w-full mb-4"
//               rows={4}
//               required
//             ></textarea>
//             <button
//               className="bg-[#c89c47] text-white px-6 py-2 rounded-md hover:bg-[#b08e3a]"
//               onClick={() => {
//                 // Get the user data from localStorage
//                 const userData = JSON.parse(
//                   localStorage.getItem("userData") || "{}"
//                 );

//                 // Check if the user is logged in and has the role "MB"
//                 if (userData && userData.role === "MB") {
//                   navigate("/homePage");
//                 } else {
//                   // If not logged in or not an "MB" role, navigate to /login
//                   navigate("/login");
//                 }
//               }}
//             >
//               SEND MESSAGE
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Branch;
