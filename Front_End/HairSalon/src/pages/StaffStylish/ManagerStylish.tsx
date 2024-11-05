import React, { useEffect, useState } from "react"; 
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
import {
  getStaffStylishByBranchID,
  addStylishById,
  updateStylistById,
  deleteStylistById,
} from "../../services/StaffStylish"; 

const ManagerStylish_staff: React.FC = () => {
  const [stylists, setStylists] = useState<Stylish[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingStylist, setEditingStylist] = useState<Stylish | null>(null);
  const [branchId, setBranchId] = useState<string>("af638270-05e0-48b6-b47b-9fde0b937151");
  const [avatarFile, setAvatarFile] = useState<any>(null);
  const [token, setToken] = useState<string>("YOUR_TOKEN_HERE"); // Replace with your token management

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

  const handleUploadChange = ({ fileList }: any) => {
    setAvatarFile(fileList[0] || null); // Store the latest file or reset to null
  };

  const handleAddStylist = async (values: any) => {
    const stylistData: Stylish = {
      ...values,
      avatarImage: avatarFile ? avatarFile.originFileObj : "", // Use the file if uploaded
    };

    try {
      await addStylishById(values.stylistId, stylistData, token);
      message.success("Stylist added successfully");
      await refreshStylists();
      setIsAddModalVisible(false); // Close modal
    } catch (error) {
      console.error("Error adding stylist:", error);
      message.error("Error adding stylist");
    }
  };

  const handleUpdateStylist = async (values: any) => {
    const stylistData: Stylish = {
      ...values,
      avatarImage: avatarFile ? avatarFile.originFileObj : "", // Use the file if uploaded
    };

    try {
      await updateStylistById(editingStylist!.stylistId, stylistData, token);
      message.success("Stylist updated successfully");
      await refreshStylists();
      setIsEditModalVisible(false); // Close modal
    } catch (error) {
      console.error("Error updating stylist:", error);
      message.error("Error updating stylist");
    }
  };

  const refreshStylists = async () => {
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
  };

  const handleEdit = (stylist: Stylish) => {
    setEditingStylist(stylist);
    setAvatarFile(null); // Reset avatar file
    setIsEditModalVisible(true);
  };

  const handleDelete = async (stylistId: string) => {
    try {
      await deleteStylistById(stylistId, token);
      message.success("Stylist deleted successfully");
      await refreshStylists();
    } catch (error) {
      console.error("Error deleting stylist:", error);
      message.error("Error deleting stylist");
    }
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
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button onClick={() => handleDelete(record.stylistId)} danger>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h2>Manager Staff Stylists</h2>
      <Button
        type="primary"
        onClick={() => {
          setEditingStylist(null);
          setIsAddModalVisible(true);
          setAvatarFile(null); // Reset for new stylist
        }}
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

      {/* Add Stylist Modal */}
      <Modal
        title="Add Stylist"
        visible={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        footer={null}
      >
        <Form
          initialValues={{
            stylistName: "",
            phoneNumber: "",
            address: "",
            dateOfBirth: null,
            email: "",
            password: "",
          }}
          onFinish={handleAddStylist}
        >
          <Form.Item label="Name" name="stylistName" rules={[{ required: true, message: 'Please enter stylist name' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Phone Number" name="phoneNumber" rules={[{ required: true, message: 'Please enter phone number' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Please enter address' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Date of Birth" name="dateOfBirth">
            <DatePicker />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter email' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter password' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item label="Avatar">
            <Upload
              listType="picture"
              beforeUpload={() => false} // Prevent automatic upload
              onChange={handleUploadChange}
            >
              <Button>Upload Avatar</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Stylist
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Stylist Modal */}
      <Modal
        title="Update Stylist"
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
      >
        <Form
          initialValues={{
            stylistName: editingStylist?.stylistName || "",
            phoneNumber: editingStylist?.phoneNumber || "",
            address: editingStylist?.address || "",
            dateOfBirth: editingStylist?.dateOfBirth || null,
            email: editingStylist?.email || "",
            password: editingStylist?.password || "",
          }}
          onFinish={handleUpdateStylist}
        >
          <Form.Item label="Name" name="stylistName" rules={[{ required: true, message: 'Please enter stylist name' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Phone Number" name="phoneNumber" rules={[{ required: true, message: 'Please enter phone number' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Please enter address' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Date of Birth" name="dateOfBirth">
            <DatePicker />
          </Form.Item>
          <Form.Item label="Avatar">
            <Upload
              listType="picture"
              beforeUpload={() => false} // Prevent automatic upload
              onChange={handleUploadChange}
            >
              <Button>Upload Avatar</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Stylist
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManagerStylish_staff;
