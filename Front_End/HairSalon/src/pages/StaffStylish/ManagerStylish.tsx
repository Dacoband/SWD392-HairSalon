import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Input, Form, message } from "antd";
import type { ColumnsType } from "antd/es/table";

interface Stylist {
  branchId: string;
  stylistId: string;
  stylistName: string;
  averageRating: number;
  phoneNumber: string;
  address: string;
  avatarImage: string;
}

const ManagerStylishStaff: React.FC = () => {
  const [stylists, setStylists] = useState<Stylist[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStylist, setEditingStylist] = useState<Stylist | null>(null);

  // Lấy branchId từ nơi bạn đã lưu trữ, ví dụ như localStorage
  const loggedInBranchId = localStorage.getItem("branchId");

  useEffect(() => {
    fetchStylists();
  }, []);

  const fetchStylists = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://api.vol-ka.studio/api/v1/stylist/all"
      );
      // Lọc stylist theo branchId của nhân viên đang đăng nhập
      const filteredStylists = response.data.filter(
        (stylist: Stylist) => stylist.branchId === loggedInBranchId
      );
      setStylists(filteredStylists);
    } catch (error) {
      console.error("Error fetching stylists:", error);
      message.error("Error fetching stylists");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (stylist: Stylist) => {
    setEditingStylist(stylist);
    setIsModalVisible(true);
  };

  const handleDelete = async (stylistId: string) => {
    try {
      await axios.delete(
        `https://api.vol-ka.studio/api/v1/stylist/delete/${stylistId}`
      );
      setStylists(
        stylists.filter((stylist) => stylist.stylistId !== stylistId)
      );
      message.success("Stylist deleted successfully");
    } catch (error) {
      console.error("Error deleting stylist:", error);
      message.error("Error deleting stylist");
    }
  };

  const handleModalOk = async (values: Partial<Stylist>) => {
    if (editingStylist) {
      try {
        const response = await axios.put(
          `https://api.vol-ka.studio/api/v1/stylist/update/${editingStylist.stylistId}`,
          values
        );
        const updatedStylist = response.data;
        setStylists((prevStylists) =>
          prevStylists.map((stylist) =>
            stylist.stylistId === updatedStylist.stylistId
              ? updatedStylist
              : stylist
          )
        );
        message.success("Stylist updated successfully");
      } catch (error) {
        console.error("Error updating stylist:", error);
        message.error("Error updating stylist");
      }
    }
    setIsModalVisible(false);
    setEditingStylist(null);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingStylist(null);
  };

  const columns: ColumnsType<Stylist> = [
    {
      title: "Avatar",
      dataIndex: "avatarImage",
      key: "avatarImage",
      render: (text: string) => (
        <img
          src={text}
          alt="avatar"
          style={{ width: 50, height: 50, borderRadius: "50%" }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "stylistName",
      key: "stylistName",
    },
    {
      title: "Branch ID",
      dataIndex: "branchId",
      key: "branchId",
    },
    {
      title: "Rating",
      dataIndex: "averageRating",
      key: "averageRating",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: 200,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button
            type="link"
            danger
            onClick={() => handleDelete(record.stylistId)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={stylists}
        rowKey="stylistId"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />
      <Modal
        title="Edit Stylist"
        visible={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form
          initialValues={editingStylist || {}}
          onFinish={handleModalOk}
          layout="vertical"
        >
          <Form.Item name="stylistName" label="Stylist Name">
            <Input />
          </Form.Item>
          <Form.Item name="phoneNumber" label="Phone Number">
            <Input />
          </Form.Item>
          <Form.Item name="address" label="Address">
            <Input />
          </Form.Item>
          <Form.Item name="avatarImage" label="Avatar URL">
            <Input type="url" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default ManagerStylishStaff;
