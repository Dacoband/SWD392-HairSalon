import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Modal,
  Input,
  Form,
  message,
  Space,
  Select,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { getAuthToken } from "../../services/authSalon";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

interface Service {
  serviceID: string;
  serviceName: string;
  type: number;
  price: number;
  description: string | null;
  duration: number;
  avatarImage: string;
  delFlg: boolean;
}

const ManagerService: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [avatarImage, setSelectedFile] = useState<File | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [isAddModalVisible, setIsAddModalVisible] = useState(false); // State for modal visibility
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentService, setCurrentService] = useState<Service | null>(null);
  const [form] = Form.useForm(); // Form instance
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const token = getAuthToken();
      const response = await axios.get(
        "https://api.vol-ka.studio/api/v1/service/get-all?DelFig=true",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
      message.error("Error fetching services");
    } finally {
      setLoading(false);
    }
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setSelectedFile(file);
    }
  };
  const handleDelete = (serviceID: string) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa dịch vụ này?",
      okText: "Có",
      okType: "danger",
      cancelText: "Không",
      onOk: async () => {
        try {
          const token = getAuthToken();
          await axios.patch(
            `https://api.vol-ka.studio/api/v1/service/delete/${serviceID}`,
            { delFlg: false },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setServices((prevServices) =>
            prevServices.filter((service) => service.serviceID !== serviceID)
          );
          message.success("Dịch vụ đã được cập nhật trạng thái xóa");
        } catch (error) {
          console.error("Lỗi khi cập nhật trạng thái xóa dịch vụ:", error);
          message.error("Lỗi khi cập nhật trạng thái xóa dịch vụ");
        }
      },
    });
  };
  const handleAddService = async (values: any) => {
    const { serviceName, type, price, description, duration } = values;

    try {
      const token = getAuthToken();
      const formData = new FormData();
      if (serviceName) formData.append("ServiceName", serviceName);
      formData.append("Type", type);
      formData.append("Price", price.toString());
      formData.append("Description", description || "");
      formData.append("Duration", duration.toString());
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

      formData.append("DelFlg", "true");

      const response = await axios.post(
        "https://api.vol-ka.studio/api/v1/service/create",
        formData,
        // {
        //   serviceName,
        //   type,
        //   price,
        //   description,
        //   duration,
        //   avatarImage,
        //   delFlg: true,
        // },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setServices([...services, response.data]); // Thêm dịch vụ mới vào danh sách
      message.success("Dịch vụ đã được thêm thành công!");
      setIsAddModalVisible(false); // Đóng modal
      form.resetFields(); // Reset form
    } catch (error) {
      console.error("Lỗi khi thêm dịch vụ:", error);
      message.error("Lỗi khi thêm dịch vụ");
    }
  };

  const handleEditService = async (values: any) => {
    const { serviceName, type, price, description, duration } = values;

    try {
      const token = getAuthToken();
      const formData = new FormData();
      if (serviceName) formData.append("ServiceName", serviceName);
      formData.append("Type", type);
      formData.append("Price", price.toString());
      formData.append("Description", description || "");
      formData.append("Duration", duration.toString());
      if (avatarImage) {
        formData.append("AvatarImage", avatarImage);
      }

      // Make the API call to update the service
      const response = await axios.patch(
        `https://api.vol-ka.studio/api/v1/service/update/${currentService?.serviceID}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Log the response data for debugging
      console.log("Updated service response:", response.data);

      // Optionally, you can re-fetch the services to ensure the latest data
      fetchServices();

      // Alternatively, update the local state directly
      setServices((prevServices) =>
        prevServices.map((service) =>
          service.serviceID === currentService?.serviceID
            ? { ...service, ...response.data } // Merge the updated data
            : service
        )
      );

      message.success("Dịch vụ đã được cập nhật thành công!");
      setIsEditModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Lỗi khi cập nhật dịch vụ:", error);
      message.error("Lỗi khi cập nhật dịch vụ");
    }
  };
  const openEditModal = (service: Service) => {
    setCurrentService(service);
    form.setFieldsValue({
      serviceName: service.serviceName,
      type: service.type,
      price: service.price,
      description: service.description,
      duration: service.duration,
    });
    setIsEditModalVisible(true);
  };

  const filteredServices = services
    .filter((service) => service.delFlg)
    .filter((service) =>
      service.serviceName.toLowerCase().includes(searchText.toLowerCase())
    );

  const columns: ColumnsType<Service> = [
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
      title: "Tên dịch vụ",
      dataIndex: "serviceName",
      key: "serviceName",
    },
    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `${price.toLocaleString()} VND`,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      render: (text: string | null) => text || "No description",
      width: 200,
    },
    {
      title: "Thời gian",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Hoạt động",
      key: "actions",
      render: (_, record) => (
        <>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => openEditModal(record)}
          ></Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.serviceID)}
          ></Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search by service name"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 200 }}
          allowClear
        />
        <Button type="primary" onClick={() => setIsAddModalVisible(true)}>
          Thêm dịch vụ
        </Button>
      </Space>

      <Table
        columns={columns}
        dataSource={filteredServices}
        rowKey="serviceID"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />
      {/* Modal for adding service */}
      <Modal
        title="Thêm dịch vụ"
        visible={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleAddService} layout="vertical">
          <Form.Item
            name="serviceName"
            label="Tên dịch vụ"
            rules={[{ required: true, message: "Vui lòng nhập tên dịch vụ!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="type"
            label="Loại"
            rules={[{ required: true, message: "Vui lòng chọn loại dịch vụ!" }]}
          >
            <Select>
              <Select.Option value={1}>Cắt tóc và Tạo Kiểu</Select.Option>
              <Select.Option value={2}>Nhuộm Tóc và Uốn Tóc</Select.Option>
              <Select.Option value={3}>Combo</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="price"
            label="Giá"
            rules={[
              { required: true, message: "Vui lòng nhập giá!" },
              {
                type: "number",
                min: 999,
                message: "Giá phải lớn hơn 10,000!",
              },
            ]}
          >
            <Input
              type="number"
              onChange={(e) =>
                form.setFieldsValue({ price: parseFloat(e.target.value) })
              }
            />
          </Form.Item>

          <Form.Item name="description" label="Mô tả">
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            name="duration"
            label="Thời gian (phút)"
            rules={[
              { required: true, message: "Vui lòng nhập thời gian!" },
              {
                type: "number",
                min: 10,
                max: 480,
                message: "Thời gian phải lớn hơn 10 phút và ít hơn 480 phút!",
              },
            ]}
          >
            <Input
              type="number"
              onChange={(e) =>
                form.setFieldsValue({ duration: parseFloat(e.target.value) })
              }
            />
          </Form.Item>

          {/* <Form.Item
            name="avatarImage"
            label="Ảnh đại diện"
            rules={[
              { required: true, message: "Vui lòng nhập URL ảnh đại diện!" },
            ]}
          >
            <Input />
          </Form.Item> */}
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
            <Button type="primary" htmlType="submit" block>
              Thêm dịch vụ
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Chỉnh sửa dịch vụ"
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleEditService} layout="vertical">
          <Form.Item
            name="serviceName"
            label="Tên dịch vụ"
            rules={[{ required: true, message: "Vui lòng nhập tên dịch vụ!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="type"
            label="Loại"
            rules={[{ required: true, message: "Vui lòng chọn loại dịch vụ!" }]}
          >
            <Select>
              <Select.Option value={1}>Cắt tóc và Tạo Kiểu</Select.Option>
              <Select.Option value={2}>Nhuộm Tóc và Uốn Tóc</Select.Option>
              <Select.Option value={3}>Combo</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="price"
            label="Giá"
            rules={[{ required: true, message: "Vui lòng nhập giá!" }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item name="description" label="Mô tả">
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            name="duration"
            label="Thời gian (phút)"
            rules={[{ required: true, message: "Vui lòng nhập thời gian!" }]}
          >
            <Input type="number" />
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
            <Button type="primary" htmlType="submit" block>
              Cập nhật dịch vụ
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ManagerService;
