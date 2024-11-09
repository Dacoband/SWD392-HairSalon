import React, { useEffect, useState } from "react";
import { Table, Button, message, Space, Input, Rate, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";
import { getStylist, deleteStylist } from "../../services/Admin/Stylist";

interface Stylist {
  branchId: string;
  stylistId: string;
  stylistName: string;
  averageRating: number;
  phoneNumber: string;
  address: string;
  avatarImage: string;
  insDate: string;
  updDate: string;
}

const ManageStylist: React.FC = () => {
  const [stylists, setStylists] = useState<Stylist[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    fetchStylists();
  }, []);

  const fetchStylists = async () => {
    setLoading(true);
    try {
      const data = await getStylist();
      setStylists(data);
    } catch (error) {
      console.error("Error fetching stylists:", error);
      message.error("Failed to fetch stylists");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteStylist(id);
      setStylists((prevStylists) =>
        prevStylists.filter((stylist) => stylist.stylistId !== id)
      );
      message.success("Stylist deleted successfully");
    } catch (error) {
      console.error("Error deleting stylist:", error);
      message.error("Failed to delete stylist");
    }
  };

  const columns: ColumnsType<Stylist> = [
    {
      title: "Tên Stylist",
      dataIndex: "stylistName",
      key: "stylistName",
      sorter: (a, b) => a.stylistName.localeCompare(b.stylistName),
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Đại chỉ",
      dataIndex: "address",
      key: "address",
      ellipsis: true,
    },
    {
      title: "Đánh giá",
      dataIndex: "averageRating",
      key: "averageRating",
      render: (rating: number) => (
        <Rate
          disabled
          defaultValue={rating}
          allowHalf
          style={{ fontSize: "16px" }}
        />
      ),
      sorter: (a, b) => a.averageRating - b.averageRating,
    },
    {
      title: "Avatar",
      dataIndex: "avatarImage",
      key: "avatarImage",
      render: (avatar: string) =>
        avatar ? (
          <img
            src={avatar}
            alt="Avatar"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        ) : (
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#f0f0f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            N/A
          </div>
        ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Popconfirm
          title="Are you sure you want to delete this stylist?"
          onConfirm={() => handleDelete(record.stylistId)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" danger>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const filteredStylists = stylists.filter((stylist) => {
    if (!searchText) return true;

    const searchLower = searchText.toLowerCase();
    return (
      stylist.stylistName?.toLowerCase().includes(searchLower) ||
      stylist.phoneNumber?.toLowerCase().includes(searchLower) ||
      stylist.address?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div style={{ padding: "24px" }}>
      <h2>Stylist Management</h2>

      <Space
        style={{
          marginBottom: 16,
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Input
          placeholder="Search by name, phone or address"
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
        rowKey="stylistId"
        loading={loading}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} stylists`,
        }}
        scroll={{ x: 1000 }}
      />
    </div>
  );
};

export default ManageStylist;
