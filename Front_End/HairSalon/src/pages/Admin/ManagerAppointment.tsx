import React, { useEffect, useState } from "react";
import { Table, message, Space, Input, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";
import { getAppointments } from "../../services/Admin/Appointment";

interface Service {
  serviceId: string;
  unitPrice: number;
}

interface Appointment {
  customerId: string;
  stylistId: string;
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
      const data = await getAppointments();
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      message.error("Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  const getStatusTag = (status: number) => {
    let color = '';
    let text = '';

    switch (status) {
      case 0:
        color = 'gold';  // Màu vàng cho Pending
        text = 'Pending';
        break;
      case 1:
        color = 'blue';  // Màu xanh dương cho Confirmed
        text = 'Confirmed';
        break;
      case 2:
        color = 'green'; // Màu xanh lá cho Completed
        text = 'Completed';
        break;
      case 3:
        color = 'red';   // Màu đỏ cho Cancelled
        text = 'Cancelled';
        break;
      default:
        color = 'default';
        text = 'Unknown';
    }

    return <Tag color={color}>{text}</Tag>;
  };

  const formatDateTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleString();
  };

  const columns: ColumnsType<Appointment> = [
    {
      title: "Customer ID",
      dataIndex: "customerId",
      key: "customerId",
      width: 300,
    },
    {
      title: "Stylist ID",
      dataIndex: "stylistId",
      key: "stylistId",
      width: 300,
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      render: (time: string) => formatDateTime(time),
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
      render: (time: string) => formatDateTime(time),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: number) => getStatusTag(status),
      filters: [
        { text: 'Pending', value: 0 },
        { text: 'Confirmed', value: 1 },
        { text: 'Completed', value: 2 },
        { text: 'Cancelled', value: 3 },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price: number) => `${price.toLocaleString()} VND`,
    },
    {
      title: "Services Count",
      dataIndex: "sevicesList",
      key: "servicesCount",
      render: (services: Service[]) => services.length,
    },
  ];

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.customerId.toLowerCase().includes(searchText.toLowerCase()) ||
      appointment.stylistId.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div style={{ padding: "24px" }}>
      <h2>Appointment Management</h2>
      
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search by ID (Appointment/Customer/Stylist)"
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
        scroll={{ x: 1500 }} // Add horizontal scroll for many columns
      />
    </div>
  );
};

export default ManagerAppointment;
