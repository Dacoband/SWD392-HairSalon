import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Input, Form, message, Upload } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Stylish } from "../../models/type";
import {
  getStylishByBranchID,
  addStylishById,
} from "../../services/Stylish";

const ManagerStylish_staff: React.FC = () => {
  const [stylists, setStylists] = useState<Stylish[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
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

  // Handle upload change with loading status
  const handleUploadImage = (info: any) => {
    if (info.file.status === "done" || info.file.status === "success") {
      setAvatarFile(info.file.originFileObj); // Save file for submission
      message.success(`${info.file.name} uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} upload failed.`);
    }
  };
  // const handleAddSubmit = async (values: any) => {
  //   setLoadingSubmit(true);
  //   try {
  //     const token = localStorage.getItem("token"); // Get the token from local storage
  //     const staffStylistId = localStorage.getItem("actorId"); // Retrieve actorId as staffStylistId
  //     const branchId = localStorage.getItem("branchId");
  //     if (!token || !staffStylistId || !branchId) {
  //       message.error("No authentication token or staff stylist ID found");
  //       return;
  //     }

  //     const {
  //       email,
  //       password,
  //       stylistName,
  //       phoneNumber,
  //       address,
  //       averageRating,
  //     } = values;
  //     const avatar = avatarFile ? URL.createObjectURL(avatarFile) : "";

  //     // Make API call
  //     const newStylish: Stylish = {
  //       stylistId: "", // Gán giá trị mặc định hoặc để trống nếu cần
  //       staffStylistId: staffStylistId as string, // Gán giá trị từ localStorage
  //       email,
  //       password,
  //       stylistName,
  //       phoneNumber,
  //       address,
  //       averageRating: averageRating || 0,
  //       avatarImage: avatar,
  //       branchId,
  //       updDate: new Date(), // Sử dụng updDate thay vì updDatets
  //       insDate: new Date(),
  //     };

  //     await addStylishById(staffStylistId, newStylish, token);

  //     message.success("Stylist added successfully");
  //     setIsAddModalVisible(false);
  //     setAvatarFile(null); // Reset avatar
  //     fetchStylists(); // Re-fetch stylists to update list
  //   } catch (error) {
  //     message.error("Failed to add stylist");
  //     console.error("Error adding stylist:", error);
  //   } finally {
  //     setLoadingSubmit(false);
  //   }
  // };

  

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
  ];

  return (
    <div>
     <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom:'3px' }}>
  Manage Stylists
</h1>

      {/* <Button type="primary" onClick={() => setIsAddModalVisible(true)}>
        Add Stylist
      </Button> */}
      <Table
        columns={columns}
        dataSource={stylists}
        rowKey="stylistId"
        loading={loading}
      />

      {/* Add Stylist Modal
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
          <Upload onChange={handleUploadImage}>
            <Button>Upload Avatar</Button>
          </Upload>
          <Button type="primary" htmlType="submit" loading={loadingSubmit}>
            Submit
          </Button>
        </Form>
      </Modal> */}
    </div>
  );
};

export default ManagerStylish_staff;
