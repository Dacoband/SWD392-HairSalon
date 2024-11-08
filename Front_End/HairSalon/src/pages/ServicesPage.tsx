import React, { useEffect, useState } from "react";
import bg from "../assets/images/bgsdn.jpg";
import { Tabs } from "antd";
import "../style.css";
import { Button } from "antd";
// import { Services } from "../models/type";
import { Col, Row } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Divider } from "antd";
import { Link } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { Services } from "../models/type";
import { getServicesByType, getAllServices } from "../services/serviceSalon";
const ServicesPage = () => {
  const [servicesType1, setServicesType1] = useState<Services[]>([]);
  const [servicesType2, setServicesType2] = useState<Services[]>([]);
  const [servicesType3, setServicesType3] = useState<Services[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  // // Hàm để lọc các dịch vụ theo type
  // const filterServicesByType = (type: number) => {
  //   return services.filter((service) => service.type === type);
  // };
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const services1 = await getServicesByType(1);
        const services2 = await getServicesByType(2);
        const services3 = await getServicesByType(3);

        setServicesType1(services1);
        setServicesType2(services2);
        setServicesType3(services3);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);
  const filteredServicesType1 = servicesType1.filter((service) =>
    service.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredServicesType2 = servicesType2.filter((service) =>
    service.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredServicesType3 = servicesType3.filter((service) =>
    service.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="pb-0 mb-0 ">
      <div
        className="bg-cover bg-center flex items-center justify-center "
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="bg-black bg-opacity-75 h-72 my-auto w-full flex items-center justify-center">
          <div>
            <div className="text-white text-center text-3xl font-bold mb-8">
              Các Dịch Vụ Của <span className="font-bold"> HAIR SALON</span>
            </div>
            <div className="text-white text-center text-lg">
              Cơ hội thay đổi bản thân không còn xa khi
              <span className="font-bold"> HAIR SALON </span> có tất cả các loại
              dịch vụ mà khách hàng mong muốn. Đặt chất lượng lên hàng đầu,
            </div>
            <div className="text-slate-100 text-center text-lg">
              <span className="font-bold"> HAIR SALON </span>hy vọng đem đến mái
              tóc đẹp nhất, dịch vụ tốt nhất đến mọi người.
            </div>
          </div>
        </div>
      </div>
      <div className="my-8 min-h-[420px] ">
        <Tabs
          defaultActiveKey="1"
          centered
          items={[
            {
              label: (
                <Button
                  type="text"
                  shape="round"
                  className=" text-black font-semibold text-lg p-3"
                >
                  Cắt Tóc Và Tạo Kiểu
                </Button>
              ),
              key: "1",
              children: (
                <div>
                  <div className="font-bold  text-2xl text-center m-8">
                    ( Haircut and Styling )
                  </div>
                  <div>
                    <div className="w-1/2 mx-auto ">
                      {filteredServicesType1.map((service) => (
                        <Row key={service.serviceID}>
                          <Col
                            className=" text-lg text-start font-medium flex"
                            span={8}
                          >
                            <div
                              className=" mr-4 my-auto"
                              style={{ whiteSpace: "nowrap" }}
                            >
                              {service.serviceName}
                            </div>
                            <Divider style={{ borderColor: "#a9acad" }} />
                          </Col>
                          <Col span={8}>
                            <Divider style={{ borderColor: "#a9acad" }} />
                          </Col>
                          <Col
                            className="flex text-end text-lg font-medium "
                            span={8}
                          >
                            <Divider style={{ borderColor: "#a9acad" }} />
                            <div
                              className=" ml-4 my-auto"
                              style={{ whiteSpace: "nowrap" }}
                            >
                              {service.price}VNĐ
                            </div>
                          </Col>
                        </Row>
                      ))}
                    </div>
                  </div>
                </div>
              ),
            },
            {
              label: (
                <Button
                  type="text"
                  shape="round"
                  className=" text-black font-semibold text-lg p-3"
                >
                  Nhuộm Tóc và Uốn Tóc
                </Button>
              ),
              key: "2",
              children: (
                <div>
                  <div className="font-bold  text-2xl text-center m-8">
                    (Hair Coloring And Perming)
                  </div>
                  <div>
                    <div className="w-1/2 mx-auto ">
                      {filteredServicesType2.map((service) => (
                        <Row key={service.serviceID}>
                          <Col
                            className=" text-lg text-start font-medium flex"
                            span={8}
                          >
                            <div
                              className=" mr-4 my-auto"
                              style={{ whiteSpace: "nowrap" }}
                            >
                              {service.serviceName}
                            </div>
                            <Divider style={{ borderColor: "#a9acad" }} />
                          </Col>
                          <Col span={8}>
                            <Divider style={{ borderColor: "#a9acad" }} />
                          </Col>
                          <Col
                            className="flex text-end text-lg font-medium "
                            span={8}
                          >
                            <Divider style={{ borderColor: "#a9acad" }} />
                            <div
                              className=" ml-4 my-auto"
                              style={{ whiteSpace: "nowrap" }}
                            >
                              {service.price}VNĐ
                            </div>
                          </Col>
                        </Row>
                      ))}
                    </div>
                  </div>
                </div>
              ),
            },
            {
              label: (
                <Button
                  type="text"
                  shape="round"
                  className=" text-black font-semibold text-lg p-3"
                >
                  Combo Hot
                </Button>
              ),
              key: "3",
              children: (
                <div>
                  <div className="font-bold  text-2xl text-center m-8">
                    ( Combo )
                  </div>
                  <div>
                    <div className="w-1/2 mx-auto ">
                      {filteredServicesType3.map((service) => (
                        <Row key={service.serviceID}>
                          <Col
                            className=" text-lg text-start font-medium flex"
                            span={8}
                          >
                            <div
                              className=" mr-4 my-auto"
                              style={{ whiteSpace: "nowrap" }}
                            >
                              {service.serviceName}
                            </div>
                            <Divider style={{ borderColor: "#a9acad" }} />
                          </Col>
                          <Col span={8}>
                            <Divider style={{ borderColor: "#a9acad" }} />
                          </Col>
                          <Col
                            className="flex text-end text-lg font-medium "
                            span={8}
                          >
                            <Divider style={{ borderColor: "#a9acad" }} />
                            <div
                              className=" ml-4 my-auto"
                              style={{ whiteSpace: "nowrap" }}
                            >
                              {service.price}VNĐ
                            </div>
                          </Col>
                        </Row>
                      ))}
                    </div>
                  </div>
                </div>
              ),
            },
          ]}
        />
      </div>
      <div
        style={{
          backgroundColor: "#937b34",
        }}
        className="mt-14 flex px-28
         py-8 justify-between"
      >
        <div>
          <div className="text-3xl font-semibold text-white mb-2">
            CUỘC HẸN TRỰC TUYẾN
          </div>
          <li className="text-slate-50 text-lg">
            Nhanh tay đặt hẹn làm tóc để tiết kiệm thời gian và nhận được nhiều
            ưu đãi đến từ <span className="font-bold">HAIR SALON</span>.
          </li>
          <li className="text-slate-50 text-lg">
            Chúng tôi luôn mang lại cho mỗi khách hàng những trãi ghiệm tốt
            nhất.
          </li>
        </div>
        <div className=" my-auto">
          <Link to="/bookAppoiment">
            <Button
              type="primary"
              size="large"
              shape="round"
              style={{
                backgroundColor: "white",

                color: "#937b34",
              }}
              className="text-xl font-bold py-8 px-6 my-auto"
            >
              <ClockCircleOutlined />
              Đặt Lịch Tại HAIR SALON
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
