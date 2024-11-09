import React, { useEffect, useState } from "react";
import {
  Table,
  Space,
  Input,
  Button,
  message,
  Form,
  Modal,
  DatePicker,
  Select,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import { StaffStylist, Branches } from "../../models/type";
import {
  fetchAllStylists,
  deleteStylist,
  AddStaffStylist,
} from "../../services/Admin/StaffStylist";
import { getBranchesAll } from "../../services/Branches/branches";

const ManagerStaffStylist: React.FC = () => {
  const [stylists, setStylists] = useState<StaffStylist[]>([]);
  const [branches, setBranches] = useState<Branches[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);
  const [avatarImage, setSelectedFile] = useState<File | null>(null);
  const [form] = Form.useForm();
  // Fetch stylists and branches from the API services
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [stylistsData, branchesData] = await Promise.all([
          fetchAllStylists(),
          getBranchesAll(),
        ]);
        setStylists(stylistsData);
        setBranches(branchesData);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []); // Runs once on mount
  const handleDelete = async (staffStylistId: string) => {
    try {
      await deleteStylist(staffStylistId);
      setStylists(
        stylists.filter((stylist) => stylist.staffStylistId !== staffStylistId)
      );
      message.success("Quản lí đã được xóa.");
    } catch (error) {
      message.error("Xóa quản lí thất bại.");
    }
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
      formData.append("branchId", values.branchId);
      formData.append("staffStylistName", values.staffStylistName);
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
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
      await AddStaffStylist(formData);
      message.success("Staff added successfully");
      setIsAddModalVisible(false);
      form.resetFields();
      fetchAllStylists();
    } catch (error: any) {
      console.error("Error adding staff:", error);
      message.error(error.response?.data?.message || "Failed to add staff");
    }
  };
  const openAddServiceModal = () => {
    form.resetFields(); // Reset form fields
    setIsAddModalVisible(true); // Open add staff modal
  };
  const columns: ColumnsType<StaffStylist> = [
    {
      title: "Hình Ảnh",
      dataIndex: "avatarImage",
      key: "avatarImage",
      render: (avatar: string) => (
        <img src={avatar} alt="Avatar" style={{ width: 80, height: 90 }} />
      ),
    },
    {
      title: "Họ và tên",
      dataIndex: "staffStylistName",
      key: "staffStylistName",
    },
    {
      title: "Ngày Sinh",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      render: (date: string) => new Date(date).toLocaleDateString(),
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
      title: "Tên Chi Nhánh",
      dataIndex: "branchId",
      key: "branchId",
      render: (branchId: string) => {
        const branch = branches.find((b) => b.branchID === branchId);
        return branch ? branch.salonBranches : "N/A"; // Display salonBranches or "N/A" if not found
      },
    },

    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button
          type="link"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record.staffStylistId)}
        ></Button>
      ),
    },
  ];

  // Filter stylists based on search text
  const filteredStylists = stylists.filter((stylist) =>
    stylist.staffStylistName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div style={{ padding: "24px" }}>
      <h2>Quản Lý Stylist</h2>

      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Tìm kiếm theo tên stylist"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 300 }}
          allowClear
        />
        <Button type="primary" onClick={openAddServiceModal}>
          Thêm Quản Lí
        </Button>
      </Space>

      <Table
        columns={columns}
        dataSource={filteredStylists}
        rowKey="staffStylistId"
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
            name="staffStylistName"
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
            <DatePicker format="DD/MM/YYYY" />
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
          <Form.Item
            name="branchId"
            label="Chi Nhánh"
            rules={[{ required: true, message: "Vui lòng chọn chi nhánh!" }]}
          >
            <Select placeholder="Chọn chi nhánh">
              {branches.map((branch) => (
                <Select.Option key={branch.branchID} value={branch.branchID}>
                  {branch.salonBranches}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <input type="file" name="AvatarImage" onChange={handleFileChange} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManagerStaffStylist;
