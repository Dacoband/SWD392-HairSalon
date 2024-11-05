import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Modal,
  Input,
  Form,
  message,
  DatePicker,
  Upload,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { Stylish, StaffStylish } from "../../models/type"; 
import { getStaffStylishByBranchID, addStylish } from "../../services/StaffStylish"; 

const ManagerStylish_staff: React.FC = () => {
  const [stylists, setStylists] = useState<Stylish[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStylist, setEditingStylist] = useState<Stylish | null>(null);
  const [branchId, setBranchId] = useState<string>("af638270-05e0-48b6-b47b-9fde0b937151");
  const [avatarFile, setAvatarFile] = useState<any>(null);

  useEffect(() => {
    const fetchStylists = async () => {
      setLoading(true);
      try {
        const fetchedStylists: StaffStylish[] = await getStaffStylishByBranchID(branchId);
        const styledList: Stylish[] = fetchedStylists.map(staff => ({
          branchId: staff.branchId,
          stylistId: staff.staffStylistId,
          stylistName: staff.staffStylistName,
          averageRating: 0,
          phoneNumber: staff.phoneNumber,
          address: staff.address,
          avatarImage: staff.avatarImage,
          email: staff.email || "",
          password: staff.password || "",
          insDate: new Date(),
          updDate: new Date(),
          staffStylistId: staff.staffStylistId,
        }));
        
        setStylists(styledList);
      } catch (error) {
        console.error("Failed to fetch stylists:", error);
        message.error("Failed to fetch stylists");
      } finally {
        setLoading(false);
      }
    };

    if (branchId) {
      fetchStylists();
    }
  }, [branchId]);

  const handleAddStylist = async (values: any) => {
    const token = "your-auth-token"; // Retrieve this from context or secure storage

    const stylistData: Stylish = {
      stylistId: "",
      email: values.email,
      password: values.password,
      branchId: branchId,
      staffStylistId: "unique-id", // Replace with actual ID if needed
      stylistName: values.stylistName,
      averageRating: 0,
      phoneNumber: values.phoneNumber,
      address: values.address,
      avatarImage: avatarFile ? avatarFile.url : "",
      insDate: new Date(),
      updDate: new Date(),
    };
  
    try {
      await addStylish(stylistData, token);
      message.success("Stylist added successfully!");
      setAvatarFile(null);
      setIsModalVisible(false);
      // Optionally reload stylists
    } catch (error) {
      message.error("Failed to add stylist: " + (error as Error).message);
    }
  };

  const handleUploadChange = ({ fileList }: any) => {
    setAvatarFile(fileList[0] || null); // Store the latest file or reset to null
  };

  const columns: ColumnsType<Stylish> = [
    {
      title: "Avatar",
      dataIndex: "avatarImage",
      key: "avatarImage",
      render: (image: string) => (
        <img src={image} alt="Avatar" style={{ width: 50, height: 50 }} />
      ),
    },
    {
      title: "Name",
      dataIndex: "stylistName",
      key: "stylistName",
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
      title: "Date of Birth",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button>Edit</Button>
          <Button>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h2>Manager Staff Stylists</h2>
      <Button
        type="primary"
        onClick={() => setIsModalVisible(true)}
        style={{ marginBottom: 16 }}
      >
        Add Stylist
      </Button>
      <Table
        loading={loading}
        columns={columns}
        dataSource={stylists}
        rowKey="stylistId"
        pagination={{ pageSize: 4 }}
      />
      <Modal
        title={editingStylist ? "Edit Stylist" : "Add Stylist"}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingStylist(null);
          setAvatarFile(null);
        }}
        footer={null}
      >
        <Form
          initialValues={
            editingStylist || {
              stylistName: "",
              phoneNumber: "",
              address: "",
              dateOfBirth: null,
              avatarImage: "",
              email: "",
              password: "",
            }
          }
          layout="vertical"
          onFinish={handleAddStylist}
        >
          <Form.Item
            label="Name"
            name="stylistName"
            rules={[{ required: true, message: "Please enter the stylist's name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter the email!" },
              { type: "email", message: "The input is not a valid E-mail!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter the password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[{ required: true, message: "Please enter the phone number!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please enter the address!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Date of Birth"
            name="dateOfBirth"
            rules={[{ required: true, message: "Please select the date of birth!" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Avatar Image" name="avatarImage">
            <Upload
              name="avatarImage"
              listType="picture"
              beforeUpload={() => false}
              onChange={handleUploadChange}
              fileList={avatarFile ? [avatarFile] : []}
            >
              <Button>Upload Avatar</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingStylist ? "Update" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManagerStylish_staff;
