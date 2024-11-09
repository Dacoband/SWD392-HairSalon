import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import demo from "../../assets/images/demo.jpg";
import { Services } from "../../models/type";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState<Services[]>([]);

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
          alt=""
        />
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ bottom: "40%" }}
        >
          <div className="absolute items-center top-2 px-6 py-3">
            <img src="src\assets\Remove-bg.ai_1729154529873.png" />
          </div>
        </div>
        {/* <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-white text-2xl font-bold">
            Chăm chút từng đường cắt, tạo nên sự khác biệt
          </h2>
        </div> */}

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
        <div className="text-center items-center mx-5 ml-20 mr-20">
          <h2 className="text-3xl font-bold mb-6 text-[#c89c47]">
            <strong>Dịch Vụ</strong>
          </h2>
          <Slider {...settings}>
            {services.map((service) => (
              <div
              key={service.serviceID}
              className="flex flex-col items-center p-4 transition-transform transform hover:scale-105"
            >
              <div className="w-48 h-60 rounded-lg shadow-lg overflow-hidden bg-white transition-shadow hover:shadow-2xl">
                <div className="mt-0 px-4 py-2 text-center">
                  {service.avatarImage ? (
                    <img
                      src={service.avatarImage}
                      alt={service.serviceName}
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                    />
                  ) : (
                    <img
                      src="path/to/default/image.jpg" // Fallback image when avatarImage is null
                      alt="Default service image"
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                    />
                  )}
                </div>
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

        <div className="flex flex-col items-center mt-10 bg-gray-100 p-4 rounded-lg shadow-md mr-20 ml-20">
          <p className="mb-5 text-center text-3xl font-bold">
            <strong>Gói Dịch Vụ</strong>
          </p>

          <div className="flex flex-col md:flex-row justify-between w-full gap-2 mb-2 ">
            {/* Combo Item 1 */}
            <div className="flex-1 flex flex-col items-center transition-transform transform hover:scale-105">
              <img
                src="src\assets\cat toc va tao kieu.jpg"
                alt="Cắt Tóc Và Tạo Kiểu"
                className="w-48 h-48 object-cover rounded-lg shadow-md mb-3"
              />
              <button className="w-80 h-15 bg-[#c89c47] text-white px-3 py-3 rounded-md hover:bg-[#b68b38] transition-colors">
                Cắt Tóc Và Tạo Kiểu
              </button>
            </div>
            {/* Combo Item 2 */}
            <div className="flex-1 flex flex-col items-center transition-transform transform hover:scale-105">
              <img
                src="src\assets\nhuom toc va uon toc.jpg"
                alt="Nhuộm Tóc và Uốn Tóc"
                className="w-48 h-48 object-cover rounded-lg shadow-md mb-3"
              />
              <button className="w-80 h-15 bg-[#c89c47] text-white px-6 py-3 rounded-md hover:bg-[#b68b38] transition-colors">
                Nhuộm Tóc và Uốn Tóc
              </button>
            </div>
            {/* Combo Item 3 */}
            <div className="flex-1 flex flex-col items-center transition-transform transform hover:scale-105">
              <img
                src="src\assets\combo hot.jpg"
                alt="Combo Nóng"
                className="w-48 h-48 object-cover rounded-lg shadow-md mb-3"
              />
              <button className="w-80 h-15 bg-[#c89c47] text-white px-6 py-3 rounded-md hover:bg-[#b68b38] transition-colors">
                Combo Hot
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between p-8 bg-gray-50 ml-20 mr-20">
        <div className="w-full md:w-1/2 md:pr-8">
          <img
            src="src/assets/about-img.jpg"
            alt="Salon Experience"
            className="w-full h-[550px] rounded-lg shadow-lg"
          />
        </div>

        <div className="w-full md:w-1/2 mt-8 md:mt-0 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-6">
            HAIR SALON
          </h2>
          <h3 className="text-2xl text-gray-600 mb-8">
            Sự hài lòng của quý khách là ưu tiên hàng đầu của{" "}
            <strong className="text-[#8e7424]">Hair Salon</strong>
          </h3>

          <ul className="space-y-4 text-lg leading-relaxed">
            <li className="flex items-center">
              <span className="text-[#8e7424] mr-3 text-xl">✔</span>
              Đúng dịch vụ - Không kèo kéo khách hay phí ẩn
            </li>
            <li className="flex items-center">
              <span className="text-[#8e7424] mr-3 text-xl">✔</span>
              Ưu tiên trải nghiệm khách hàng
            </li>
            <li className="flex items-center">
              <span className="text-[#8e7424] mr-3 text-xl">✔</span>
              Luôn đưa ra các giải pháp phù hợp và chỉ bắt đầu khi khách hàng
              đồng ý
            </li>
            <li className="flex items-center">
              <span className="text-[#8e7424] mr-3 text-xl">✔</span>
              Thấu hiểu nhu cầu, hỗ trợ nhiệt tình
            </li>
            <li className="flex items-center">
              <span className="text-[#8e7424] mr-3 text-xl">✔</span>
              Lắng nghe cẩn thận và đảm bảo dịch vụ tận tâm, nhiệt tình
            </li>
          </ul>

          <button
            onClick={() => navigate("/branch")}
            className="mt-10 bg-[#8e7424] text-white font-semibold px-10 py-3 rounded-full hover:bg-[#74601d] transition duration-300"
          >
            Tìm Hiểu Thêm Về Chúng Tôi
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
