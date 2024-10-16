// import React, { useState } from "react";
// import { Button, message, Steps, theme } from "antd";

import bg from "../../assets/images/bgsdn.jpg";
// import { Divider } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "../../App.css";
import { Select } from "antd";
import { MdAddBox } from "react-icons/md";
import { FaCheckSquare } from "react-icons/fa";

import React, { useEffect, useState } from "react";
import { Steps, Button, Popover, Checkbox } from "antd";
import type { StepsProps } from "antd";
import { getBranchesAll } from "../../services/Branches/branches";
import { Branches, Services } from "../../models/type";
// import { Checkbox } from "antd";
import { FaScissors } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";

import { getServicesByType } from "../../services/serviceSalon";
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

const BookingPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [branches, setBranches] = useState<Branches[]>([]);

  const [servicesType1, setServicesType1] = useState<Services[]>([]);
  const [servicesType2, setServicesType2] = useState<Services[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

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
        const services1 = await getServicesByType(1);
        const services2 = await getServicesByType(2);
        setServicesType1(services1);
        setServicesType2(services2);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchBranches();
    fetchServices();
  }, []);
  const handleServiceClick = (serviceID: string) => {
    const isSelected = selectedServices.includes(serviceID);
    if (isSelected) {
      setSelectedServices(selectedServices.filter((id) => id !== serviceID));
    } else {
      setSelectedServices([...selectedServices, serviceID]);
    }
  };

  const steps = [
    {
      title: "Chọn cơ sở và dịch vụ",
      content: (
        <div className="w-4/5 mx-auto flex">
          <div className="w-3/5">
            <div className="text-3xl text-[#937b34] font-bold pb-1  w-fit pr-2 border-b-4 border-[#937b34]">
              Thông tin lịch hẹn:
            </div>
            <div className="mt-8">
              <div className="mb-8">
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
                          fontSize: "24px",
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
              <div className="text-2xl mb-4 font-semibold flex items-center">
                <FaScissors className="mr-2" /> Chọn dịch vụ bạn muốn:
              </div>

              <div>
                <div className="text-xl font-semibold text-[#937b34]">
                  Dịch vụ tạo kiểu và dịch vụ lẻ:
                </div>
                {servicesType1.map((service) => (
                  <div
                    key={service.serviceID}
                    className="border-2 border-slate-500 p-2 flex items-center"
                  >
                    {selectedServices.includes(service.serviceID) ? (
                      <FaCheckSquare
                        size={20}
                        onClick={() => handleServiceClick(service.serviceID)}
                      />
                    ) : (
                      <MdAddBox
                        size={20}
                        onClick={() => handleServiceClick(service.serviceID)}
                      />
                    )}
                    <div className="ml-2">
                      <strong>{service.serviceName}</strong>
                      <div>{service.price} VNĐ</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-xl font-semibold text-[#937b34]">
                Dịch vụ nhuộm tóc:
              </div>
              <div>
                <div className="text-xl font-semibold text-[#937b34]">
                  Dịch vụ theo Combo:
                </div>
                {servicesType2.map((service) => (
                  <div
                    key={service.serviceID}
                    className="border-2 border-slate-500 p-2 flex items-center"
                  >
                    {selectedServices.includes(service.serviceID) ? (
                      <FaCheckSquare
                        size={20}
                        onClick={() => handleServiceClick(service.serviceID)}
                      />
                    ) : (
                      <MdAddBox
                        size={20}
                        onClick={() => handleServiceClick(service.serviceID)}
                      />
                    )}
                    <div className="ml-2">
                      <strong>{service.serviceName}</strong>
                      <div>{service.price} VNĐ</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex-1 ml-10 border-2 border-slate-500 rounded-md">
            <div className=" flex justify-center mt-4">
              <div className="text-2xl text-[#937b34] font-semibold w-fit  text-center border-b-4 border-[#937b34]">
                Xac Nhan
              </div>
            </div>
            <div>
              <div>Co so: </div>
              <div>Dich vu da chon:</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Đặt lịch với Stylish",
      content: "Nội dung cho bước 2: Đặt lịch với Stylish",
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
