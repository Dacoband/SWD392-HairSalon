import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Input, Form, message } from "antd";
import type { ColumnsType } from "antd/es/table";

interface Service {
  serviceID: string;
  serviceName: string;
  type: number;
  price: number;
  description: string | null;
  duration: number;
  avatarImage: string;
}

const ManagerService: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://api.vol-ka.studio/api/v1/service/get-all"
      );
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
      message.error("Error fetching services");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setIsModalVisible(true);
  };

  const handleDelete = async (serviceID: string) => {
    try {
      await axios.delete(
        `https://api.vol-ka.studio/api/v1/service/delete/${serviceID}`
      );
      setServices(
        services.filter((service) => service.serviceID !== serviceID)
      );
      message.success("Service deleted");
    } catch (error) {
      console.error("Error deleting service:", error);
      message.error("Error deleting service");
    }
  };

  const handleModalOk = async (values: Partial<Service>) => {
    if (editingService) {
      try {
        const response = await axios.put(
          `https://api.vol-ka.studio/api/v1/service/update/${editingService.serviceID}`,
          values
        );
        const updatedService = response.data;
        setServices((prevServices) =>
          prevServices.map((service) =>
            service.serviceID === updatedService.serviceID
              ? updatedService
              : service
          )
        );
        message.success("Service updated successfully");
      } catch (error) {
        console.error("Error updating service:", error);
        message.error("Error updating service");
      }
    }
    setIsModalVisible(false);
    setEditingService(null);
  };

  const handleAddModalOk = async (values: Service) => {
    try {
      const response = await axios.post(
        "https://api.vol-ka.studio/api/v1/service/create",
        values
      );
      setServices([...services, response.data]);
      message.success("Service added successfully");
    } catch (error) {
      console.error("Error adding service:", error);
      message.error("Error adding service");
    }
    setIsAddModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingService(null);
  };

  const handleAddModalCancel = () => {
    setIsAddModalVisible(false);
  };

  const columns: ColumnsType<Service> = [
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
      title: "Service Name",
      dataIndex: "serviceName",
      key: "serviceName",
    },
    {
      title: "Type",
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
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text: string | null) => text || "No description",
      width: 200,
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button
            type="link"
            danger
            onClick={() => handleDelete(record.serviceID)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Button
        type="primary"
        onClick={() => setIsAddModalVisible(true)}
        style={{ marginBottom: 16 }}
      >
        Add Service
      </Button>
      <Table
        columns={columns}
        dataSource={services}
        rowKey="serviceID"
        loading={loading}
        pagination={{ pageSize: 4 }}
      />
      <Modal
        title="Edit Service"
        visible={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form
          initialValues={editingService || {}}
          onFinish={handleModalOk}
          layout="vertical"
        >
          <Form.Item name="serviceName" label="Service Name">
            <Input />
          </Form.Item>
          <Form.Item name="avatarImage" label="Service Image">
            <Input type="url" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name="price" label="Price">
            <Input type="number" />
          </Form.Item>
          <Form.Item name="duration" label="Duration">
            <Input type="number" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form>
      </Modal>
      <Modal
        title="Add Service"
        visible={isAddModalVisible}
        onCancel={handleAddModalCancel}
        footer={null}
      >
        <Form onFinish={handleAddModalOk} layout="vertical">
          <Form.Item
            name="serviceName"
            label="Service Name"
            rules={[{ required: true, message: "Please enter service name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="avatarImage"
            label="Service Image"
            rules={[{ required: true, message: "Please enter service Image!" }]}
          >
            <Input type="url" />
          </Form.Item>
          <Form.Item name="price" label="Price">
            <Input type="number" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name="duration" label="Duration">
            <Input type="number" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default ManagerService;
