import React, { useEffect, useState } from "react";
import {
  Table,
  Space,
  message,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Upload,
  Popconfirm,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { StaffStylist } from "../../models/type";
import { UserInfoData } from "../../models/type";
import {
  getStaffStylistByBranchID,
  addStaffStylish,
  updateStaffStylishById,
  getStaffAll,
  deleteStaffStylistById,
} from "../../services/StaffStylish";
import moment from "moment";
import {
  SearchOutlined,
  PlusOutlined,
  UploadOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";

const ManagerStaff: React.FC = () => {
  const [userData, setUserData] = useState<UserInfoData | null>(null);
  const [staffList, setStaffList] = useState<StaffStylist[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffStylist | null>(null);
  const [form] = Form.useForm();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [apiErrors, setApiErrors] = useState<Record<string, string[]>>({});
  const [searchText, setSearchText] = useState<string>("");
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const branchId = localStorage.getItem("branchId");
    if (branchId) {
      fetchStaffList(branchId);
    } else {
      message.error("Branch ID not found in local storage.");
    }
  }, []);

  const fetchStaffList = async (branchId: string) => {
    setLoading(true);
    try {
      const data = await getStaffStylistByBranchID(branchId);
      setStaffList(data);
    } catch (error) {
      message.error("Error fetching staff data.");
    } finally {
      setLoading(false);
    }
  };

  const fetchStaffAll = async () => {
    setLoading(true);
    try {
      const data = await getStaffAll();
      setStaffList(data);
    } catch (error) {
      console.error("Error fetching staff managers:", error);
      message.error("Error fetching staff managers");
    } finally {
      setLoading(false);
    }
  };

  const filteredStaffManagers = staffList.filter(
    (st) =>
      st.staffStylistName?.toLowerCase().includes(searchText.toLowerCase()) ||
      st.email?.toLowerCase().includes(searchText.toLowerCase()) ||
      st.phoneNumber?.includes(searchText)
  );

  const getImageSrc = () => {
    const avatarImage = userData?.avatarImage;
    if (avatarImage instanceof File) {
      return URL.createObjectURL(avatarImage);
    }

    return avatarImage || "../../assets/images/demo.jpg";
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleAddStaff = async (values: any) => {
    const branchId = localStorage.getItem("branchId");
    if (!branchId) {
      message.error("Branch ID not found in local storage.");
      return;
    }

    const formData = new FormData();
    formData.append("staffStylistName", values.staffStylistName);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("dateOfBirth", values.dateOfBirth.format("YYYY-MM-DD"));
    formData.append("phoneNumber", values.phoneNumber);
    formData.append("address", values.address);
    if (selectedFile) {
      formData.append("avatarImage", selectedFile);
    }
    formData.append("branchId", branchId);

    // Log the formData for debugging
    console.log("Form Data being sent:", formData);

    try {
      const newStaff = await addStaffStylish(formData);
      message.success("Staff added successfully");
      fetchStaffList(branchId);
      setIsModalVisible(false);
      form.resetFields();
    } catch (error: any) {
      console.error("Error adding staff stylist:", error.response?.data);
      // You can also display the error message from the API if it's in the response data
      message.error(
        error.response?.data?.message || "Failed to add staff stylist"
      );
    }
  };

  const handleUpdateStaffStylist = async (values: any) => {
    if (!editingStaff) return;

    const updatedStaffData = {
      staffStylistName: values.staffStylistName,
      dateOfBirth: values.dateOfBirth.format("YYYY/MM/DD"),
      phoneNumber: values.phoneNumber,
      address: values.address,
      avatarImage:
        values.avatarImage?.fileList?.[0]?.originFileObj ||
        editingStaff.avatarImage,
    };

    try {
      await updateStaffStylishById(
        editingStaff.staffStylistId,
        updatedStaffData
      );
      message.success("Staff updated successfully");
      setIsEditModalVisible(false);
      form.resetFields();
      fetchStaffAll();
      // Fetch updated staff list
      const branchId = localStorage.getItem("branchId");
      if (branchId) {
        fetchStaffList(branchId);
      }
    } catch (error: any) {
      message.error(
        error.response?.data?.message || "Failed to update staff stylish"
      );
    }
  };

  const handleDeleteStaffStylish = async (staffStylistId: string) => {
    try {
      await deleteStaffStylistById(staffStylistId);
      message.success("Staff stylist deleted successfully");
      // After deletion, refresh the list of staff
      const branchId = localStorage.getItem("branchId");
      if (branchId) {
        fetchStaffList(branchId);
      }
    } catch (error) {
      message.error("Error deleting staff stylist");
    }
  };

  const columns: ColumnsType<StaffStylist> = [
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
      title: "staffStylistName",
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
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button
            icon={<EditOutlined />}
            // Set the staff to be edited
            size="small"
          >
            Edit
          </Button>

          <Popconfirm
            title="Delete Stylist"
            description="Are you sure you want to delete this stylist?"
            onConfirm={() => handleDeleteStaffStylish(record.staffStylistId)} // Pass the correct ID
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />} size="small">
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <Space
        style={{
          marginBottom: 16,
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Input
          placeholder="Search by name"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 300 }}
          allowClear
        />
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          Add Staff Stylish
        </Button>
      </Space>

      <Table
        dataSource={filteredStaffManagers}
        columns={columns}
        rowKey="staffstylistID"
        loading={loading}
        pagination={{
          current: currentPage,
          pageSize: 4,
          total: filteredStaffManagers.length,
          onChange: (page) => {
            setCurrentPage(page); // Update the current page in state
          },
        }}
      />

      {/* Add Staff Modal */}
      <Modal
        title="Add New Staff"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddStaff}>
          <Form.Item
            name="staffStylistName"
            label="staffStylistName"
            rules={[
              { required: true, message: "Please enter the staffStylistName" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Please input password!" },
              {
                min: 8,
                message:
                  "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
              },
              {
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="dateOfBirth"
            label="Date of Birth"
            rules={[
              { required: true, message: "Please select date of birth!" },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[
              { required: true, message: "Please enter the phone number" },
              {
                pattern: /^(0)[1-9]{1}[0-9]{8}$/,
                message: "Phone number must be exactly 10 digits and valid.",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: "Please enter the address" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="avatarImage"
            label="Avatar Image"
            valuePropName="file"
          >
            <Upload maxCount={1} beforeUpload={() => false} listType="picture">
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Staff Modal */}
      <Modal
        title="Edit Staff"
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
        width={600}
        style={{ top: 20 }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdateStaffStylist}
          style={{ maxWidth: "100%" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            <Form.Item
              name="staffStylistName"
              label="Staff Stytist Name"
              rules={[{ required: true, message: "Please input name!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="dateOfBirth"
              label="Date of Birth"
              rules={[
                { required: true, message: "Please select date of birth!" },
              ]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              name="phoneNumber"
              label="Phone Number"
              rules={[
                { required: true, message: "Please input phone number!" },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: "Please enter the address" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <div>
              <div>
                <img src={getImageSrc()} alt="" />
              </div>
              <div>
                <input
                  type="file"
                  name="AvatarImage"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            {apiErrors.AvatarImage &&
              apiErrors.AvatarImage.map((error, index) => (
                <span key={index} className="error-message">
                  {error}
                </span>
              ))}
          </Form.Item>
          <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
            <Space>
              <Button onClick={() => setIsUpdateModalVisible(false)}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManagerStaff;
