import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import demo from "../../assets/images/demo.jpg";
interface Service {
  serviceID: number;
  avatarImage: string;
  serviceName: string;
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <div>›</div>,
    prevArrow: <div>‹</div>,
  };

  const fetchServices = async () => {
    try {
      const response = await axios.get(
        "https://api.vol-ka.studio/api/v1/service/get-all"
      );
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="relative">
      <div className="relative">
        <img
          src="src/assets/hero-img.jpg"
          className="w-full h-30 object-cover"
          alt="Hero"
        />
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ bottom: "40%" }}
        >
          <h1 className="text-white text-5xl font-bold">Hair Salon</h1>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-white text-2xl font-bold">
            Chăm chút từng đường cắt, tạo nên sự khác biệt
          </h2>
        </div>

        <button
          className="absolute font-bold bottom-10 left-10 px-6 py-3 bg-[#8e7424] text-white rounded-full hover:bg-[#74601d]"
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

      <div className="bg-gradient-to-br py-3 from-white to-[#8e7424] p-5">
        <div className="text-center items-center mx-5">
          <h2 className="text-3xl font-bold mb-6 text-[#c89c47]">
            <strong>Gói Dịch Vụ</strong>
          </h2>
          <Slider {...settings}>
            {services.map((service) => (
              <div
                key={service.serviceID}
                className="flex flex-col items-center p-4 transition-transform transform hover:scale-105"
              >
                <div className="w-48 h-60 rounded-lg shadow-lg overflow-hidden bg-white transition-shadow hover:shadow-2xl">
                  <img
                    src="https://i.mydramalist.com/WPdAVD_5c.jpg"
                    alt={service.serviceName}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="bg-[#c89c47] mt-0 px-4 py-2 text-center">
                    <span className="text-white font-semibold">
                      {service.serviceName}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        <div className="flex flex-col items-center mt-10 bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="mb-5 text-center text-3xl font-bold">
            <strong>Combo</strong>
          </p>

          <div className="flex flex-col md:flex-row justify-between w-full gap-6 mb-4">
            {/* Combo Item 1 */}
            <div className="flex-1 flex flex-col items-center transition-transform transform hover:scale-105">
              <img
                src="https://britishm.vn/wp-content/uploads/2019/02/cham-soc-toc-ma-mac-phai-6-sai-lam-nay-bao-sao-toc-nam-gioi-luon-kho-cung-xo-roi.jpg"
                alt="Cắt Tóc Và Tạo Kiểu"
                className="w-48 h-48 object-cover rounded-lg shadow-md mb-3"
              />
              <button className="w-full bg-[#c89c47] text-white px-6 py-3 rounded-md hover:bg-[#b68b38] transition-colors">
                Cắt Tóc Và Tạo Kiểu
              </button>
            </div>
            {/* Combo Item 2 */}
            <div className="flex-1 flex flex-col items-center transition-transform transform hover:scale-105">
              <img
                src="https://britishm.vn/wp-content/uploads/2019/02/cham-soc-toc-ma-mac-phai-6-sai-lam-nay-bao-sao-toc-nam-gioi-luon-kho-cung-xo-roi.jpg"
                alt="Nhuộm Tóc và Uốn Tóc"
                className="w-48 h-48 object-cover rounded-lg shadow-md mb-3"
              />
              <button className="w-full bg-[#c89c47] text-white px-6 py-3 rounded-md hover:bg-[#b68b38] transition-colors">
                Nhuộm Tóc và Uốn Tóc
              </button>
            </div>
            {/* Combo Item 3 */}
            <div className="flex-1 flex flex-col items-center transition-transform transform hover:scale-105">
              <img
                src="https://britishm.vn/wp-content/uploads/2019/02/cham-soc-toc-ma-mac-phai-6-sai-lam-nay-bao-sao-toc-nam-gioi-luon-kho-cung-xo-roi.jpg"
                alt="Combo Nóng"
                className="w-48 h-48 object-cover rounded-lg shadow-md mb-3"
              />
              <button className="w-full bg-[#c89c47] text-white px-6 py-3 rounded-md hover:bg-[#b68b38] transition-colors">
                Combo Hot
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-gray-50">
        <div className="w-full md:w-1/2">
          <img
            src="src/assets/about-img.jpg"
            alt="Salon Experience"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

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
    </div>
  );
};

export default HomePage;
