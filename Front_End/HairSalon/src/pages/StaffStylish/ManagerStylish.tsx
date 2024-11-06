import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Input, Form, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { Stylish } from "../../models/type";
import {
  getStylishByBranchID,
  addStylishById,
  updateStylistById,
  deleteStylistById,
} from "../../services/Stylish";

const ManagerStylish_staff: React.FC = () => {
  const [stylists, setStylists] = useState<Stylish[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingStylist, setEditingStylist] = useState<Stylish | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [branchId, setBranchId] = useState<string>("");

  const fetchStylists = async () => {
    // Moved the function declaration outside of useEffect
    setLoading(true);
    try {
      const branchId = localStorage.getItem("branchId"); // Lấy branchId từ local storage
      if (branchId) {
        const fetchedStylists = await getStylishByBranchID(branchId);
        setStylists(fetchedStylists);
      } else {
        message.error("Branch ID not found. User may not be logged in.");
      }
    } catch (error) {
      console.error("Failed to fetch stylists:", error);
      message.error("Failed to fetch stylists");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStylists(); // Gọi hàm fetchStylists khi component được mount
  }, []);

  // Handle upload change
  const handleUploadChange = (info: any) => {
    if (info.file.status === "done") {
      setAvatarFile(info.file.originFileObj);
      message.success(`${info.file.name} uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} upload failed.`);
    }
  };

  const handleAddSubmit = async (values: any) => {
    setLoadingSubmit(true);
    try {
      const token = localStorage.getItem("token"); // Get the token from local storage
      const staffStylistId = localStorage.getItem("actorId"); // Retrieve actorId as staffStylistId
      const branchId = localStorage.getItem("branchId");
      if (!token || !staffStylistId || !branchId) {
        message.error("No authentication token or staff stylist ID found");
        return;
      }

      const {
        email,
        password,
        stylistName,
        phoneNumber,
        address,
        averageRating,
        dateOfBirth,
      } = values;
      const avatar = avatarFile ? URL.createObjectURL(avatarFile) : "";

      // Make API call
      const newStylish: Stylish = {
        stylistId: "", // Gán giá trị mặc định hoặc để trống nếu cần
        staffStylistId: staffStylistId as string, // Gán giá trị từ localStorage
        email,
        password,
        stylistName,
        phoneNumber,
        address,
        averageRating: averageRating || 0,
        avatarImage: avatar,
        branchId,
        updDate: new Date(), // Sử dụng updDate thay vì updDatets
        insDate: new Date(),
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth).toISOString() : "", // Cung cấp giá trị cho dateOfBirth
      };

      await addStylishById(staffStylistId, newStylish, token);

      message.success("Stylist added successfully");
      setIsAddModalVisible(false);
      setAvatarFile(null); // Reset avatar
      fetchStylists(); // Re-fetch stylists to update list
    } catch (error) {
      message.error("Failed to add stylist");
      console.error("Error adding stylist:", error);
    } finally {
      setLoadingSubmit(false);
    }
  };

  const handleEditSubmit = async (values: any) => {
    setLoadingSubmit(true);
    try {
      if (editingStylist) {
        const token = localStorage.getItem("token"); // Retrieve token from local storage
        if (!token) {
          message.error("No authentication token found");
          return;
        }

        const updatedStylistData: Stylish = {
          stylistId: editingStylist.stylistId, // Ensure stylistId is included
          staffStylistId: editingStylist.staffStylistId,
          email: values.email || editingStylist.email,
          password: values.password || editingStylist.password,
          stylistName: values.stylistName || editingStylist.stylistName,
          phoneNumber: values.phoneNumber || editingStylist.phoneNumber,
          address: values.address || editingStylist.address,
          averageRating: values.averageRating || editingStylist.averageRating,
          avatarImage: avatarFile
            ? URL.createObjectURL(avatarFile)
            : editingStylist.avatarImage,

          branchId: editingStylist.branchId,
          updDate: new Date(),
          insDate: editingStylist.insDate,
          dateOfBirth: values.dateOfBirth || editingStylist.dateOfBirth,
        };

        await updateStylistById(
          editingStylist.stylistId,
          updatedStylistData,
          token
        );

        // Update the stylists state to reflect the changes
        setStylists((prevStylists) =>
          prevStylists.map((stylist) =>
            stylist.stylistId === editingStylist.stylistId
              ? updatedStylistData
              : stylist
          )
        );

        message.success("Stylist updated successfully");
        setIsEditModalVisible(false);
      }
    } catch (error) {
      message.error("Failed to update stylist");
      console.error("Error updating stylist:", error);
    } finally {
      setLoadingSubmit(false);
    }
  };

  const handleDelete = async (stylistId: string) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        message.error("No authentication token found");
        return;
      }

      await deleteStylistById(stylistId, token);
      setStylists(
        stylists.filter((stylist) => stylist.stylistId !== stylistId)
      );
      message.success("Stylist deleted successfully");
    } catch (error) {
      message.error("Failed to delete stylist");
    } finally {
      setLoading(false);
    }
  };

  const columns: ColumnsType<Stylish> = [
    {
      title: "Name",
      dataIndex: "stylistName",
    },
    {
      title: "Avatar",
      dataIndex: "avatarImage",
      render: (text: string) => (
        <img src={text} alt="Avatar" style={{ width: 50, height: 50 }} />
      ),
    },
    { title: "Phone Number", dataIndex: "phoneNumber" },
    { title: "Address", dataIndex: "address" },
    { title: "Average Rating", dataIndex: "averageRating" },
    {
      title: "Action",
      render: (_, record) => (
        <>
          <Button
            onClick={() => {
              setEditingStylist(record);
              setIsEditModalVisible(true);
            }}
          >
            Edit
          </Button>
          <Button onClick={() => handleDelete(record.stylistId)} danger>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h1>Manage Stylists</h1>
      <Button type="primary" onClick={() => setIsAddModalVisible(true)}>
        Add Stylist
      </Button>
      <Table
        columns={columns}
        dataSource={stylists}
        rowKey="stylistId"
        loading={loading}
      />

      {/* Add Stylist Modal */}
      <Modal
        title="Add Stylist"
        open={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        footer={null}
      >
        <Form onFinish={handleAddSubmit}>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true }]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>
          <Form.Item
            name="stylistName"
            label="Name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter stylist name" />
          </Form.Item>
          <Form.Item name="averageRating" label="Average Rating">
            <Input placeholder="Enter average rating" />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter phone number" />
          </Form.Item>
          <Form.Item name="address" label="Address">
            <Input placeholder="Enter address" />
          </Form.Item>
          <Upload onChange={handleUploadChange}>
            <Button icon={<UploadOutlined />}>Upload Avatar</Button>
          </Upload>
          <Button type="primary" htmlType="submit" loading={loadingSubmit}>
            Submit
          </Button>
        </Form>
      </Modal>

      {/* Edit Stylist Modal */}
      <Modal
        title="Edit Stylist"
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
      >
        <Form initialValues={editingStylist || {}} onFinish={handleEditSubmit}>
          <Form.Item
            name="stylistName"
            label="Name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter stylist name" />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter phone number" />
          </Form.Item>
          <Form.Item name="address" label="Address">
            <Input placeholder="Enter address" />
          </Form.Item>
          <Form.Item name="averageRating" label="Average Rating">
            <Input placeholder="Enter average rating" />
          </Form.Item>
          <Upload onChange={handleUploadChange}>
            <Button icon={<UploadOutlined />}>Upload Avatar</Button>
          </Upload>
          <Button type="primary" htmlType="submit" loading={loadingSubmit}>
            Update
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default ManagerStylish_staff;
