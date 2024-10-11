import React, { useState } from "react";
import { Button, message, Steps, theme, TimePicker } from "antd";
import { Select } from "antd";
import { Tabs } from "antd";
import { Col, Row } from "antd";

import { Divider } from "antd";
import "../../App.css";
export interface Services {
  _id: string;
  name: string;
  price: number;
  description: string | null;
  duration: number;
  image: string | null;
  type: number;
}
const services: Services[] = [
  {
    _id: "1",
    name: "Cắt Tóc",
    price: 50000,
    description: "Cắt tóc đơn giản",
    duration: 20,
    image: "",
    type: 1,
  },
  {
    _id: "2",
    name: "Uốn Tóc",
    price: 50000,
    description: "Tạo kiểu, vuót keo.",
    duration: 30,
    image: "",
    type: 1,
  },
  {
    _id: "3",
    name: "Nhuộm tóc màu(không tẩy)",
    price: 400000,
    description: "Nhuộm tóc, các màu không cần tẩy",
    duration: 120,
    image: "",
    type: 2,
  },
  {
    _id: "4",
    name: "Gội Đầu Massages",
    price: 40000,
    description: "Gội đầu thẳng mượt.",
    duration: 90,
    image: "",
    type: 1,
  },
  {
    _id: "5",
    name: "Chăm sóc Tóc + Cắt Tóc",
    price: 120000,
    description: "Dịch vụ chăm sóc tóc chuyên sâu.",
    duration: 60,
    image: "",
    type: 3,
  },
  {
    _id: "6",
    name: "Chăm sóc Tóc + Cắt Tóc",
    price: 120000,
    description: "Dịch vụ chăm sóc tóc chuyên sâu.",
    duration: 60,
    image: "",
    type: 3,
  },
];
const filterServicesByType = (type: number) => {
  return services.filter((service) => service.type === type);
};
const steps = [
  {
    title: "Chọn salon và dịch vụ",
    content: (
      <div>
        <div className="w-1/2 ">
          <div className="w-full flex justify-start">
            <text className="text-black font-semibold text-base mr-5">
              Chọn cơ sở gần bạn:
            </text>
            <Select
              className="flex-1"
              showSearch
              placeholder="Select a person"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                { value: "1", label: "Jack" },
                { value: "2", label: "Lucy" },
                { value: "3", label: "Tom" },
              ]}
            />
          </div>
          <div className="">
            <text className="text-black font-semibold text-base mr-5 w-full">
              Chọn dịch vụ :
            </text>
            <div>
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
                            {filterServicesByType(1).map((service) => (
                              <Row key={service._id}>
                                <Col
                                  className=" text-lg text-start font-medium flex"
                                  span={8}
                                >
                                  <div
                                    className=" mr-4 my-auto"
                                    style={{ whiteSpace: "nowrap" }}
                                  >
                                    {service.name}
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
                            {filterServicesByType(2).map((service) => (
                              <Row key={service._id}>
                                <Col
                                  className=" text-lg text-start font-medium flex"
                                  span={8}
                                >
                                  <div
                                    className=" mr-4 my-auto"
                                    style={{ whiteSpace: "nowrap" }}
                                  >
                                    {service.name}
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
                            {filterServicesByType(3).map((service) => (
                              <Row key={service._id}>
                                <Col
                                  className=" text-lg text-start font-medium flex"
                                  span={8}
                                >
                                  <div
                                    className=" mr-4 my-auto"
                                    style={{ whiteSpace: "nowrap" }}
                                  >
                                    {service.name}
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
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Chọn stylish và thời gian",
    content: <TimePicker style={{ width: "100%" }} format="HH:mm" />,
  },
  {
    title: "Xác nhận thông tin",
    content: (
      <div>
        <p>Xác nhận rằng bạn đã chọn đúng ngày và giờ!</p>
        {/* Bạn có thể hiển thị thông tin đã chọn ở đây */}
      </div>
    ),
  },
];

const BookingPAge: React.FC = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
    padding: "20px",
  };

  return (
    <div>
      <div className="w-1/2 mx-auto my-10">
        <Steps current={current} items={items} />
      </div>
      <div className="w-11/12 mx-auto">
        <div style={contentStyle}>{steps[current].content}</div>
      </div>
      <div style={{ marginTop: 24 }}>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Tiếp theo
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Đặt lịch thành công!")}
          >
            Xác nhận
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Quay lại
          </Button>
        )}
      </div>
    </div>
  );
};

export default BookingPAge;
