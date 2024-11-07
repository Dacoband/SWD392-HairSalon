// components/Admin/ManagerStylist.tsx
import React, { useEffect, useState } from "react";
import { Table, message, Space, Input, Button, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import { getStylistsWithBranch, deleteStylist } from "../../services/Admin/StaffStylist";

interface Stylist {
  staffStylistId: string;
  staffStylistName: string;
  dateOfBirth: string;
  phoneNumber: string;
  address: string;
  salonBranches: string;
}

const ManagerStaffStylist: React.FC = () => {
  const [stylists, setStylists] = useState<Stylist[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    fetchStylists();
  }, []);

  const fetchStylists = async () => {
    setLoading(true);
    try {
      const data = await getStylistsWithBranch();
      setStylists(data);
    } catch (error) {
      console.error("Error fetching stylists:", error);
      message.error("Failed to fetch stylists");
    } finally {
      setLoading(false);
    }
  };

  const columns: ColumnsType<Stylist> = [
    {
      title: "Stylist Name",
      dataIndex: "staffStylistName",
      key: "staffStylistName",
    },
    {
      title: "Date of Birth",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Salon Branch",
      dataIndex: "salonBranches",
      key: "salonBranches",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Popconfirm
          title="Delete Stylist"
          description="Are you sure you want to delete this stylist?"
          onConfirm={() => handleDelete(record.staffStylistId)}
          okText="Yes"
          cancelText="No"
        >
          <Button 
            danger
            icon={<DeleteOutlined />}
            size="small"
          >
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const filteredStylists = stylists.filter((stylist) =>
    stylist.staffStylistName.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleDelete = async (staffStylistId: string) => {
    try {
      await deleteStylist(staffStylistId);
      message.success("Stylist deleted successfully");
      fetchStylists(); // Refresh danh sách sau khi xóa
    } catch (error) {
      console.error("Error deleting stylist:", error);
      message.error("Failed to delete stylist");
    }
  };

  return (
    <div style={{ padding: "24px" }}>
      <h2>Stylist Management</h2>
      
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search by Stylist Name"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 300 }}
          allowClear
        />
      </Space>

      <Table
        columns={columns}
        dataSource={filteredStylists}
        rowKey="staffStylistId"
        loading={loading}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1000 }}
      />
    </div>
  );
};

export default ManagerStaffStylist;
