import React, { useEffect, useState } from "react";
import { Table, message, Space, Input, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { getAppointmentsWithDetails } from "../../services/Admin/Appointment";

interface Service {
  serviceId: string;
  unitPrice: number;
}

interface Appointment {
  appointmentId: string;
  customerId: string;
  memberName?: string;
  stylistId: string;
  stylistName?: string;
  status: number;
  totalPrice: number;
  insDate: string;
  upDate: string;
  startTime: string;
  endTime: string;
  sevicesList: Service[];
}

const ManagerAppointment: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const data = await getAppointmentsWithDetails();
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      message.error("Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  const getStatusTag = (status: number) => {
    let color = "";
    let text = "";

    switch (status) {
      case 1:
        color = "cyan";
        text = "Đặt lịch thành công";
        break;
      case 2:
        color = "blue";
        text = "Thanh toán thành công";
        break;
      case 3:
        color = "red";
        text = "Hủy hẹn";
        break;
      case 4:
        color = "green";
        text = "Hoàn Thành";
        break;
      default:
        color = "default";
        text = "Unknown";
    }

    return <Tag color={color}>{text}</Tag>;
  };

  const formatDateTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleString();
  };

  const columns = [
    {
      title: "Tên Khách Hàng",
      dataIndex: "memberName",
      key: "memberName",
      width: 300,
    },
    {
      title: "Tên Stylish",
      dataIndex: "stylistName",
      key: "stylistName",
      width: 300,
    },

    {
      title: "Thời gian hẹn",
      dataIndex: "endTime",
      key: "endTime",
      render: (time: string) => formatDateTime(time),
    },
    {
      title: "Tổng thanh toán",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price: number) => `${price.toLocaleString()} VND`,
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      render: (status: number) => getStatusTag(status),
      filters: [
        { text: "Đặt lịch thành công", value: 1 },
        { text: "Đã thanh toán", value: 2 },
        { text: "Đã Hủy", value: 3 },
        { text: "Đã hoàn thành", value: 4 },
      ],
      onFilter: (value: any, record: any) => record.status === value,
    },
  ];

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.memberName
        ?.toLowerCase()
        .includes(searchText.toLowerCase()) ||
      appointment.stylistName?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div style={{ padding: "24px" }}>
      <h2>Quản lí lịch hẹn</h2>

      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Nhập tên khách hàng hoặc stylish"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 300 }}
          allowClear
        />
      </Space>

      <Table
        columns={columns}
        dataSource={filteredAppointments}
        rowKey="appointmentId"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default ManagerAppointment;
