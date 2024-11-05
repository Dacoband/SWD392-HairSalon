import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Input, Form, message } from "antd";
import type { ColumnsType } from "antd/es/table";

interface Stylish {
  stylistId: string;
  stylistName: string;
  averageRating: number;
  phoneNumber: string;
  address: string;
  avatarImage: string;
  insDate: string;
  updDate: string;
}

const ManagerStylish_staff: React.FC<{ branchId: string }> = ({ branchId }) => {
  const [stylists, setStylists] = useState<Stylish[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStylist, setEditingStylist] = useState<Stylish | null>(null);

  useEffect(() => {
    if (branchId) fetchStylists();
  }, [branchId]);

  // Fetch stylists based on branchId
  const fetchStylists = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.vol-ka.studio/api/v1/stylist/branch?branchId=${branchId}`
      );
      setStylists(response.data);
    } catch (error) {
      console.error("Error fetching stylists:", error);
      message.error("Error fetching stylists");
    } finally {
      setLoading(false);
    }
  };

  // Handle modal open for edit
  const handleEdit = (stylist: Stylish) => {
    setEditingStylist(stylist);
    setIsModalVisible(true);
  };

  // Handle stylist update
  const handleModalOk = async (values: Partial<Stylish>) => {
    if (editingStylist) {
      try {
        const response = await axios.put(
          `https://api.vol-ka.studio/api/v1/stylist/update/${editingStylist.stylistId}`,
          values
        );
        const updatedStylist = response.data;
        setStylists((prev) =>
          prev.map((stylist) =>
            stylist.stylistId === updatedStylist.stylistId
              ? updatedStylist
              : stylist
          )
        );
        message.success("Stylist updated successfully");
      } catch (error) {
        console.error("Error updating stylist:", error);
        message.error("Error updating stylist");
      } finally {
        setIsModalVisible(false);
        setEditingStylist(null);
      }
    }
  };

  // Handle modal close
  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingStylist(null);
  };

  const columns: ColumnsType<Stylish> = [
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
      title: "Stylist Name",
      dataIndex: "stylistName",
      key: "stylistName",
    },
    {
      title: "Rating",
      dataIndex: "averageRating",
      key: "averageRating",
      render: (rating: number) => rating.toFixed(1),
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
      title: "Added On",
      dataIndex: "insDate",
      key: "insDate",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Last Updated",
      dataIndex: "updDate",
      key: "updDate",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button type="link" onClick={() => handleEdit(record)}>
          Edit
        </Button>
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
          <Form.Item
            name="stylistName"
            label="Stylist Name"
            rules={[
              { required: true, message: "Please input the stylist's name" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[
              { required: true, message: "Please input the phone number" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="address" label="Address">
            <Input />
          </Form.Item>
          <Form.Item name="avatarImage" label="Avatar Image URL">
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default ManagerStylish_staff;
