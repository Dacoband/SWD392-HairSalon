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
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  SearchOutlined,
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
import { getBranchesAll } from "../../services/Branches/branches";
const ManagerStaffManager: React.FC = () => {
  const [staffManagers, setStaffManagers] = useState<StaffManager[]>([]);
  const [loading, setLoading] = useState(false);
  const [avatarImage, setSelectedFile] = useState<File | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [branches, setBranches] = useState<Branches[]>([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<StaffManager | null>(null);
  // const [form] = Form.useForm();
  // const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  // const [selectedStaff, setSelectedStaff] = useState<StaffManager | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchStaffManagers();
  }, []);

  const fetchStaffManagers = async () => {
    setLoading(true);
    try {
      const staffData = await getStaffAll();
      setStaffManagers(staffData);

      // Fetch all branches data
      const branchData = await getBranchesAll();
      setBranches(branchData); // Store branches in state
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
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          await deleteStaffManager(staffManagerId);
          message.success("Quản lí đã bị xóa");
          fetchStaffManagers(); // Refresh the list
        } catch (error: any) {
          message.error(
            error.response?.data?.message || "Failed to delete staff manager"
          );
        }
      },
    });
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setSelectedFile(file);
    }
  };
  const handleAddStaff = async (values: any) => {
    try {
      console.log(values);
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("password", values.password);
      //formData.append("branchID", null); // Default branchID is null
      formData.append("staffManagerName", values.staffManagerName);
      formData.append("dateOfBirth", values.dateOfBirth.format("YYYY-MM-DD"));
      formData.append("phoneNumber", values.phoneNumber);
      formData.append("address", values.address);
      if (avatarImage) {
        if (avatarImage instanceof File) {
          formData.append("AvatarImage", avatarImage);
        } else {
          const response = await fetch(avatarImage, { mode: "no-cors" });
          const blob = await response.blob();
          const file = new File([blob], "avatarImage.jpg", { type: blob.type });
          formData.append("AvatarImage", file);
        }
      }

      await createStaffManager(formData);
      message.success("Staff added successfully");
      setIsAddModalVisible(false);
      form.resetFields();
      fetchStaffManagers();
    } catch (error: any) {
      console.error("Error adding staff:", error);
      message.error(error.response?.data?.message || "Failed to add staff");
    }
  };
  const openAddServiceModal = () => {
    form.resetFields(); // Reset form fields
    setIsAddModalVisible(true); // Mở modal thêm dịch vụ
  };
  const openUpdateModal = (staffManager: StaffManager) => {
    setSelectedStaff(staffManager);
    form.setFieldsValue({
      staffManagerName: staffManager.staffManagerName,
      dateOfBirth: moment(staffManager.dateOfBirth),
      phoneNumber: staffManager.phoneNumber,
      address: staffManager.address,
    });
    setIsUpdateModalVisible(true);
  };
  const handleUpdateStaff = async (values: any) => {
    if (!selectedStaff) return;

    try {
      const formData = new FormData();
      formData.append("staffManagerName", values.staffManagerName);
      formData.append("dateOfBirth", values.dateOfBirth.format("YYYY-MM-DD"));
      formData.append("phoneNumber", values.phoneNumber);
      formData.append("address", values.address);

      // If an avatar image is selected, append it to the form data
      if (avatarImage) {
        formData.append("AvatarImage", avatarImage);
      }

      // Log FormData for debugging
      console.log("FormData before update:", Array.from(formData.entries()));

      // Make the API call to update the staff manager
      await updateStaffManager(selectedStaff.staffManagerID, formData);
      message.success("Staff updated successfully");
      setIsUpdateModalVisible(false);
      form.resetFields();
      fetchStaffManagers();
    } catch (error: any) {
      console.error("Error updating staff:", error);
      message.error(error.response?.data?.message || "Failed to update staff");
    }
  };

  const columns: ColumnsType<StaffManager> = [
    {
      title: "Avatar",
      dataIndex: "avatarImage",
      key: "avatarImage",
      render: (text: string) => (
        <img src={text} alt="avatar" style={{ width: 80, height: 90 }} />
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
      title: "Chi Nhánh",
      key: "branchName",
      render: (_, record) => {
        // Find the branch using the branchID
        const branch = branches.find((b) => b.branchID === record.branchID);
        return branch ? branch.salonBranches : "Chưa có chi nhánh";
      },
    },
    {
      title: "Hoạt động",
      key: "action",
      width: 120,
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => openUpdateModal(record)}
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
  );

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
          placeholder="Tìm kiếm tên"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 300 }}
          allowClear
        />
        <Button type="primary" onClick={openAddServiceModal}>
          Thêm Quản lí
        </Button>
      </Space>

      <Table
        columns={columns}
        dataSource={filteredStaffManagers}
        rowKey="staffManagerID"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />
      <Modal
        title="Thêm Quản Lí"
        visible={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleAddStaff}>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Vui lòng nhập email!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="staffManagerName"
            label="Họ và tên"
            rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="dateOfBirth"
            label="Ngày tháng năm sinh"
            rules={[{ required: true, message: "Vui lòng chọn ngày sinh!" }]}
          >
            <DatePicker inputReadOnly={false} format="DD/MM/YYYY" />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Số điện thoại"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <div>
              <input
                type="file"
                name="AvatarImage"
                onChange={handleFileChange}
              />
            </div>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Cập nhật Quản Lí"
        visible={isUpdateModalVisible}
        onCancel={() => setIsUpdateModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleUpdateStaff}>
          <Form.Item
            name="staffManagerName"
            label="Họ và tên"
            rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="dateOfBirth"
            label="Ngày tháng năm sinh"
            rules={[{ required: true, message: "Vui lòng chọn ngày sinh!" }]}
          >
            <DatePicker inputReadOnly={false} format="DD/MM/YYYY" />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Số điện thoại"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Cập nhật hình ảnh đại diện">
            <div>
              <input
                type="file"
                name="AvatarImage"
                onChange={handleFileChange}
              />
            </div>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManagerStaffManager;
