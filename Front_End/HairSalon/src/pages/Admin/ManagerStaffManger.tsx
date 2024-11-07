import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  message,
  Space,
  Input,
  Modal,
  Form,
  DatePicker,
  Upload,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  SearchOutlined,
  PlusOutlined,
  UploadOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {
  getStaffAll,
  createStaffManager,
  deleteStaffManager,
  updateStaffManager,
} from "../../services/Admin/StaffManager";
import moment from "moment";

import { StaffManager, Branches } from "../../models/type";

const ManagerStaffManager: React.FC = () => {
  const [staffManagers, setStaffManagers] = useState<StaffManager[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState<string>("");
  // const [isModalVisible, setIsModalVisible] = useState(false);
  // const [form] = Form.useForm();
  // const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  // const [selectedStaff, setSelectedStaff] = useState<StaffManager | null>(null);
  const [updateForm] = Form.useForm();

  useEffect(() => {
    fetchStaffManagers();
  }, []);

  const fetchStaffManagers = async () => {
    setLoading(true);
    try {
      const data = await getStaffAll();
      setStaffManagers(data);
    } catch (error) {
      console.error("Error fetching staff managers:", error);
      message.error("Error fetching staff managers");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (staffManagerId: string) => {
    Modal.confirm({
      title: "Bạn có muốn xóa quản lí này?",
      content: "This action cannot be undone.",
      okText: "Có",
      okType: "Không Xóa",
      cancelText: "No",
      onOk: async () => {
        try {
          await deleteStaffManager(staffManagerId);
          message.success("Staff manager deleted successfully");
          fetchStaffManagers(); // Refresh the list
        } catch (error: any) {
          message.error(
            error.response?.data?.message || "Failed to delete staff manager"
          );
        }
      },
    });
  };

  // const handleUpdate = async (values: any) => {
  //   try {
  //     if (!selectedStaff) return;

  //     const updateData = {
  //       staffManagerName: values.staffManagerName,
  //       dateOfBirth: values.dateOfBirth.format("YYYY-MM-DD"),
  //       phoneNumber: values.phoneNumber,
  //       address: values.address,
  //       // email: values.email,
  //     };

  //     await updateStaffManager(selectedStaff.staffManagerID, updateData);
  //     message.success("Staff manager updated successfully");
  //     setIsUpdateModalVisible(false);
  //     updateForm.resetFields();
  //     fetchStaffManagers();
  //   } catch (error: any) {
  //     message.error(
  //       error.response?.data?.message || "Failed to update staff manager"
  //     );
  //   }
  // };

  // const showUpdateModal = (record: StaffManager) => {
  //   setSelectedStaff(record);
  //   updateForm.setFieldsValue({
  //     // email: record.email,
  //     staffManagerName: record.staffManagerName,
  //     dateOfBirth: moment(record.dateOfBirth),
  //     phoneNumber: record.phoneNumber,
  //     address: record.address,
  //   });
  //   setIsUpdateModalVisible(true);
  // };

  const columns: ColumnsType<StaffManager> = [
    {
      title: "Avatar",
      dataIndex: "avatarImage",
      key: "avatarImage",
      render: (text: string) => (
        <img
          src={text}
          alt="avatar"
          style={{ width: 80, height: 80, borderRadius: "50%" }}
        />
      ),
    },
    {
      title: "Họ và tên",
      dataIndex: "staffManagerName",
      key: "staffManagerName",
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Ngày tháng năm sinh",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "ID Chi Nhánh",
      dataIndex: "branchID", // Giả sử bạn có trường này trong dữ liệu StaffManager
      key: "branchID",
    },
    {
      title: "Hoạt động",
      key: "action",
      width: 120,
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            // onClick={() => showUpdateModal(record)}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.staffManagerID)}
          />
        </Space>
      ),
    },
  ];

  const filteredStaffManagers = staffManagers.filter(
    (sm) =>
      sm.staffManagerName?.toLowerCase().includes(searchText.toLowerCase()) ||
      false
    // (sm.email?.toLowerCase().includes(searchText.toLowerCase()) || false)
  );

  // const handleAddStaff = async (values: any) => {
  //   try {
  //     const formData = new FormData();
  //     // formData.append('email', values.email);
  //     formData.append("password", values.password);
  //     formData.append("staffManagerName", values.staffManagerName);
  //     formData.append("dateOfBirth", values.dateOfBirth.format("YYYY-MM-DD"));
  //     formData.append("phoneNumber", values.phoneNumber);
  //     formData.append("address", values.address);
  //     if (values.avatarImage?.fileList[0]?.originFileObj) {
  //       formData.append(
  //         "avatarImage",
  //         values.avatarImage.fileList[0].originFileObj
  //       );
  //     }

  //     await createStaffManager(formData);
  //     message.success("Staff added successfully");
  //     setIsModalVisible(false);
  //     form.resetFields();
  //     fetchStaffManagers();
  //   } catch (error: any) {
  //     message.error(error.response?.data?.message || "Failed to add staff");
  //   }
  // };

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
        <Button type="primary">Add Staff Manager</Button>
      </Space>

      <Table
        columns={columns}
        dataSource={filteredStaffManagers}
        rowKey="staffManagerID"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />

      {/* <Modal
        title="Add Staff Manager"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddStaff}> */}
      {/* <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please input email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input />
          </Form.Item> */}

      {/* <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Please input password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="staffManagerName"
            label="Staff Manager Name"
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
            rules={[{ required: true, message: "Please input phone number!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: "Please input address!" }]}
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

      <Modal
        title="Update Staff Manager"
        open={isUpdateModalVisible}
        onCancel={() => setIsUpdateModalVisible(false)}
        footer={null}
        width={600}
        style={{ top: 20 }}
      >
        <Form
          form={updateForm}
          layout="vertical"
          onFinish={handleUpdate}
          style={{ maxWidth: "100%" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          > */}
      {/* <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please input email!' },
                { type: 'email', message: 'Please enter a valid email!' }
              ]}
            >
              <Input />
            </Form.Item> */}

      {/* <Form.Item
              name="staffManagerName"
              label="Staff Manager Name"
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
            rules={[{ required: true, message: "Please input address!" }]}
          >
            <Input />
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
      </Modal> */}
    </div>
  );
};

export default ManagerStaffManager;
