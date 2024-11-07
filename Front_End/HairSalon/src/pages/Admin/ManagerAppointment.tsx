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
      case 0:
        color = "gold";
        text = "Pending";
        break;
      case 1:
        color = "blue";
        text = "Confirmed";
        break;
      case 2:
        color = "green";
        text = "Completed";
        break;
      case 3:
        color = "red";
        text = "Cancelled";
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
      title: "Customer Name",
      dataIndex: "memberName",
      key: "memberName",
      width: 300,
    },
    {
      title: "Stylist Name",
      dataIndex: "stylistName",
      key: "stylistName",
      width: 300,
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
        { text: "Pending", value: 0 },
        { text: "Confirmed", value: 1 },
        { text: "Completed", value: 2 },
        { text: "Cancelled", value: 3 },
      ],
      onFilter: (value: any, record: any) => record.status === value,
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price: number) => `${price.toLocaleString()} VND`,
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
      <h2>Appointment Management</h2>

      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search by Customer or Stylist Name"
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
