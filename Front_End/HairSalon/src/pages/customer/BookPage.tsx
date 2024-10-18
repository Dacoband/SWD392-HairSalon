// import React, { useState } from "react";
// import { Button, message, Steps, theme } from "antd";
import demo from "../../assets/images/demo.jpg";
import bg from "../../assets/images/bgsdn.jpg";

import { SearchOutlined } from "@ant-design/icons";
import "../../App.css";
import { Select } from "antd";
import { MdAddBox } from "react-icons/md";
import { FaCheckSquare } from "react-icons/fa";
import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { Steps, Button, Popover, Input } from "antd";
import type { StepsProps } from "antd";
import { getBranchesAll } from "../../services/Branches/branches";
import { Branches, Services } from "../../models/type";

import { FaScissors } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";

import { getServicesByType, getAllServices } from "../../services/serviceSalon";
const customDot: StepsProps["progressDot"] = (dot, { status, index }) => (
  <Popover
    content={
      <span>
        step {index} status: {status}
      </span>
    }
  >
    {dot}
  </Popover>
);

const BookingPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [branches, setBranches] = useState<Branches[]>([]);
  const [serviceAll, setServicesAll] = useState<Services[]>([]);
  const [servicesType1, setServicesType1] = useState<Services[]>([]);
  const [servicesType2, setServicesType2] = useState<Services[]>([]);
  const [selectedServices, setSelectedServices] = useState<Services[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await getBranchesAll();
        setBranches(response);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };

    const fetchServices = async () => {
      try {
        const serviceAll = await getAllServices();
        const services1 = await getServicesByType(1);
        const services2 = await getServicesByType(2);
        setServicesAll(serviceAll);
        setServicesType1(services1);
        setServicesType2(services2);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchBranches();
    fetchServices();
  }, []);

  const handleServiceClick = (service: Services) => {
    const isSelected = selectedServices.some(
      (s) => s.serviceID === service.serviceID
    );

    if (isSelected) {
      setSelectedServices(
        selectedServices.filter((s) => s.serviceID !== service.serviceID)
      );
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  const formatDuration = (duration: number) => {
    if (duration > 60) {
      const hours = Math.floor(duration / 60);
      const minutes = duration % 60;
      return `${hours} giờ ${minutes} phút`;
    }
    return `${duration} phút`;
  };

  const filteredServicesAll = serviceAll.filter((service) =>
    service.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredServicesType1 = servicesType1.filter((service) =>
    service.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredServicesType2 = servicesType2.filter((service) =>
    service.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const steps = [
    {
      title: "Chọn cơ sở và dịch vụ",
      content: (
        <div className="w-4/5 mx-auto flex">
          <div className="w-2/3">
            <div className="text-3xl text-[#937b34] font-bold pb-1  w-fit pr-2 border-b-4 border-[#937b34]">
              Thông tin lịch hẹn:
            </div>
            <div className="mt-8">
              {/* SERVICE */}
              <div className="text-2xl mb-5 font-semibold flex items-center">
                <FaScissors className="mr-2" /> Chọn dịch vụ bạn muốn:
              </div>
              <div>
                <Input
                  placeholder="Tìm kiếm dịch vụ"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  prefix={
                    <SearchOutlined
                      style={{ fontSize: "25px", marginRight: "15px" }}
                    />
                  }
                  className="mb-5 text-lg h-14"
                />
              </div>
              <Tabs
                defaultActiveKey="1"
                items={[
                  {
                    label: (
                      <Button
                        type="text"
                        shape="round"
                        className=" text-black font-semibold text-lg"
                      >
                        Tất cả
                      </Button>
                    ),
                    key: "1",
                    children: (
                      <div className="mt-10">
                        {filteredServicesAll.map((service) => (
                          <div
                            key={service.serviceID}
                            className="border-2 border-slate-400 px-4 py-3 flex mb-5 rounded-md"
                          >
                            <div>
                              <img
                                src={demo}
                                alt={service.serviceName}
                                className="w-48 h-40 rounded-md object-cover object-top mr-4 m-1"
                              />
                            </div>
                            <div className="flex-1 h-40 ml-2">
                              <div className="text-xl py-2 font-bold">
                                {service.serviceName}
                              </div>
                              <div className="text-lg line-clamp mb-1 text-gray-700">
                                <span className="text-gray-800 mr-1 font-bold">
                                  Mô tả:
                                </span>
                                Tóc được uốn và tạo kiểu vuốt ngược về phía sau,
                                mang đến phong cách gọn gàng, mạnh mẽ mà vẫn
                                lịch lãm, cuốn hút, tạo kiểu dễ dàng hơn bao giờ
                                hết. Phần tóc 2 bên được điều chỉnh độ dài, tuỳ
                                thuộc với từng gương mặt
                              </div>
                              <div className="text-base text-slate-700 mb-1">
                                <span className="text-gray-800 font-bold">
                                  Thời gian:
                                </span>
                                <span className="ml-1">
                                  {formatDuration(service.duration)}
                                </span>
                              </div>

                              <div className="text-black text-xl font-semibold">
                                <span className="font-bold mr-1">Giá:</span>
                                {formatCurrency(service.price)}VNĐ
                              </div>
                            </div>
                            <div className="w-1/12 flex items-center justify-end p-2">
                              {selectedServices.includes(service) ? (
                                <FaCheckSquare
                                  className="cursor-pointer text-[#937b34]"
                                  size={32}
                                  onClick={() => handleServiceClick(service)}
                                />
                              ) : (
                                <MdAddBox
                                  size={38}
                                  className="cursor-pointer"
                                  onClick={() => handleServiceClick(service)}
                                />
                              )}
                            </div>
                          </div>
                        ))}
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
                        Cắt Tóc Và Tạo Kiểu
                      </Button>
                    ),
                    key: "2",
                    children: (
                      <div>
                        {filteredServicesType1.map((service) => (
                          <div
                            key={service.serviceID}
                            className="border-2 border-slate-400 px-4 py-3 flex mb-5 rounded-md "
                          >
                            <div>
                              <img
                                src={demo}
                                alt={service.serviceName}
                                className="w-48 h-40 rounded-md object-cover object-top mr-4 m-1"
                              />
                            </div>
                            <div className="flex-1 h-40 ml-2">
                              <div className="text-xl py-2 font-bold">
                                {service.serviceName}
                              </div>
                              <div className="text-lg line-clamp mb-1  text-gray-700">
                                <span className="text-gray-800 mr-1 font-bold">
                                  Mô tả:
                                </span>
                                Tóc được uốn và tạo kiểu vuốt ngược về phía sau,
                                mang đến phong cách gọn gàng, mạnh mẽ mà vẫn
                                lịch lãm, cuốn hút, tạo kiểu dễ dàng hơn bao giờ
                                hết. Phần tóc 2 bên được điều chỉnh độ dài, tuỳ
                                thuộc với từng gương mặt
                              </div>
                              <div className="text-base text-slate-700 mb-1">
                                <span className="text-gray-800 font-bold">
                                  Thời gian:
                                </span>
                                <span className="ml-1">
                                  {formatDuration(service.duration)}
                                </span>
                              </div>

                              <div className="text-black text-xl font-semibold">
                                <span className="font-bold mr-1">Giá:</span>
                                {formatCurrency(service.price)}VNĐ
                              </div>
                            </div>
                            <div className="w-1/12 flex items-center justify-end p-2">
                              {selectedServices.includes(service) ? (
                                <FaCheckSquare
                                  className="cursor-pointer text-[#937b34]"
                                  size={32}
                                  onClick={() => handleServiceClick(service)}
                                />
                              ) : (
                                <MdAddBox
                                  size={38}
                                  className="cursor-pointer "
                                  onClick={() => handleServiceClick(service)}
                                />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ),
                  },
                  {
                    label: (
                      <Button
                        type="text"
                        shape="round"
                        className=" text-black font-semibold text-lg p-4"
                      >
                        Nhuộm Tóc và Uốn Tóc
                      </Button>
                    ),
                    key: "3",
                    children: (
                      <div>
                        {filteredServicesType1.map((service) => (
                          <div
                            key={service.serviceID}
                            className="border-2 border-slate-400 px-4 py-3 flex mb-5 rounded-md"
                          >
                            <div>
                              <img
                                src={demo}
                                alt={service.serviceName}
                                className="w-48 h-40 rounded-md object-cover object-top mr-4 m-1"
                              />
                            </div>
                            <div className="flex-1 h-40 ml-2">
                              <div className="text-xl py-2 font-bold">
                                {service.serviceName}
                              </div>
                              <div className="text-lg line-clamp mb-1 text-gray-700">
                                <span className="text-gray-800 mr-1 font-bold">
                                  Mô tả:
                                </span>
                                Tóc được uốn và tạo kiểu vuốt ngược về phía sau,
                                mang đến phong cách gọn gàng, mạnh mẽ mà vẫn
                                lịch lãm, cuốn hút, tạo kiểu dễ dàng hơn bao giờ
                                hết. Phần tóc 2 bên được điều chỉnh độ dài, tuỳ
                                thuộc với từng gương mặt
                              </div>
                              <div className="text-base text-slate-700 mb-1">
                                <span className="text-gray-800 font-bold">
                                  Thời gian:
                                </span>
                                <span className="ml-1">
                                  {formatDuration(service.duration)}
                                </span>
                              </div>

                              <div className="text-black text-xl font-semibold">
                                <span className="font-bold mr-1">Giá:</span>
                                {formatCurrency(service.price)}VNĐ
                              </div>
                            </div>
                            <div className="w-1/12 flex items-center justify-end p-2">
                              {selectedServices.includes(service) ? (
                                <FaCheckSquare
                                  className="cursor-pointer text-[#937b34]"
                                  size={32}
                                  onClick={() => handleServiceClick(service)}
                                />
                              ) : (
                                <MdAddBox
                                  size={38}
                                  className="cursor-pointer"
                                  onClick={() => handleServiceClick(service)}
                                />
                              )}
                            </div>
                          </div>
                        ))}
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
                    key: "4",
                    children: (
                      <div>
                        {filteredServicesType2.map((service) => (
                          <div
                            key={service.serviceID}
                            className="border-2 border-slate-400 px-4 py-3 flex mb-5 rounded-md"
                          >
                            <div>
                              <img
                                src={demo}
                                alt={service.serviceName}
                                className="w-48 h-40 rounded-md object-cover object-top mr-4 m-1"
                              />
                            </div>
                            <div className="flex-1 h-40 ml-2">
                              <div className="text-xl py-2 font-bold">
                                {service.serviceName}
                              </div>
                              <div className="text-lg line-clamp mb-1 text-gray-700">
                                <span className="text-gray-800 mr-1 font-bold">
                                  Mô tả:
                                </span>
                                Tóc được uốn và tạo kiểu vuốt ngược về phía sau,
                                mang đến phong cách gọn gàng, mạnh mẽ mà vẫn
                                lịch lãm, cuốn hút, tạo kiểu dễ dàng hơn bao giờ
                                hết. Phần tóc 2 bên được điều chỉnh độ dài, tuỳ
                                thuộc với từng gương mặt
                              </div>
                              <div className="text-base text-slate-700 mb-1">
                                <span className="text-gray-800 font-bold">
                                  Thời gian:
                                </span>
                                <span className="ml-1">
                                  {formatDuration(service.duration)}
                                </span>
                              </div>

                              <div className="text-black text-xl font-semibold">
                                <span className="font-bold mr-1">Giá:</span>
                                {formatCurrency(service.price)}VNĐ
                              </div>
                            </div>
                            <div className="w-1/12 flex items-center justify-end p-2">
                              {selectedServices.includes(service) ? (
                                <FaCheckSquare
                                  className="cursor-pointer text-[#937b34]"
                                  size={32}
                                  onClick={() => handleServiceClick(service)}
                                />
                              ) : (
                                <MdAddBox
                                  size={38}
                                  className="cursor-pointer"
                                  onClick={() => handleServiceClick(service)}
                                />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          </div>
          <div className="flex-1 ml-10 border-2 border-slate-500 rounded-md px-4">
            <div className=" flex justify-center mt-4">
              <div className="text-2xl text-[#937b34] font-semibold w-fit mb-10  text-center border-b-4 border-[#937b34]">
                Xác nhận thông tin
              </div>
            </div>
            <div className="">
              {selectedServices.map((service) => (
                <div
                  key={service.serviceID}
                  className="mb-2 flex justify-between"
                >
                  <span className="text-lg font-bold">
                    {service.serviceName}:
                  </span>
                  <span className="text-lg ml-1">
                    {formatCurrency(service.price)}
                  </span>
                </div>
              ))}
            </div>
            <Button>Xác nhận Đặt dịch vụ</Button>
          </div>
        </div>
      ),
    },
    {
      title: "Đặt lịch với Stylish",
      content: (
        <div>
          {/* LOCAL */}
          <div className="mb-10">
            <div className="text-2xl mb-3 font-semibold flex items-center">
              <FaLocationDot className="mr-2" />
              Chọn cơ sở gần bạn:
            </div>
            <div>
              <Select
                className="custom-select w-full h-fit min-h-16 my-auto flex justify-center text-xl"
                showSearch
                suffixIcon={
                  <SearchOutlined
                    style={{ fontSize: "30px", marginRight: "25px" }}
                  />
                }
                //
                placeholder={
                  <span
                    style={{
                      fontSize: "20px",
                      color: "#a0a0a0",
                      padding: "25px 25px",
                    }}
                  >
                    Tìm kiếm cơ sở
                  </span>
                }
                optionLabelProp="label"
                filterOption={(input, option) =>
                  typeof option?.address === "string" &&
                  option.address.toLowerCase().includes(input.toLowerCase())
                }
                options={branches.map((branch) => ({
                  value: branch.branchID,
                  label: (
                    <div className="space-y-1 pl-2">
                      <strong className="text-base pt-2">
                        {branch.salonBranches}
                      </strong>
                      <div className="text-sm text-slate-600 pb-2">
                        {branch.address}
                      </div>
                    </div>
                  ),
                  address: branch.address,
                }))}
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Xác nhận thông tin",
      content: "Nội dung cho bước 3: Xác nhận thông tin",
    },
  ];

  const next = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div>
      <div
        className="bg-cover bg-center flex items-center justify-center "
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="bg-black bg-opacity-75 h-72 my-auto w-full flex flex-col items-center justify-center">
          <div className="text-white font-bold text-3xl p-5 mb-8">
            HAIR SALON
          </div>
          <div className="w-3/5">
            <Steps
              className="custom-dot"
              current={currentStep}
              progressDot={customDot}
              items={steps.map((step) => ({
                title: step.title,
              }))}
            />
          </div>
        </div>
      </div>
      <div className="pt-10 bg-[#FFFFFF] ">
        <div className="steps-content">{steps[currentStep].content}</div>
        <div className="steps-action">
          <Button
            type="primary"
            onClick={next}
            disabled={currentStep === steps.length - 1}
          >
            Tiếp theo
          </Button>
          <Button
            style={{ margin: "0 8px" }}
            onClick={prev}
            disabled={currentStep === 0}
          >
            Quay lại
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
