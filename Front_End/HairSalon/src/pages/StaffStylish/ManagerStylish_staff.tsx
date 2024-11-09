import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Input, Form, message, Upload } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Stylish, StaffStylist } from "../../models/type";
import { getStylishByBranchID, addStylishById, deleteStylistById } from "../../services/Stylish";
import { getStaffStylistByBranchID, getStaffStylistIdsByBranchID } from "../../services/StaffStylish";

const ManagerStylish_staff: React.FC = () => {
  const [stylists, setStylists] = useState<Stylish[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [form] = Form.useForm();

  const fetchStylists = async () => {
    setLoading(true);
    try {
      const branchId = localStorage.getItem("branchId");
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
    fetchStylists();
  }, []);

  // const handleAddStylist = async (values: Stylish) => {
  //   setLoadingSubmit(true);
  //   try {
  //     const token = localStorage.getItem("token") || "";
  //     const branchId = localStorage.getItem("branchId") || "";
      
  //     // Fetch the staffStylistId list for the current branch
  //     const staffStylistIds = await getStaffStylistIdsByBranchID(branchId);
  //     if (staffStylistIds.length === 0) {
  //       message.error("No staff stylist ID found for this branch.");
  //       setLoadingSubmit(false);
  //       return;
  //     }
      
  //     const newStylist = {
  //       ...values,
  //       branchId,
  //       staffStylistId: staffStylistIds[0], // Use the first available staffStylistId
  //     };
  
  //     await addStylishById(newStylist.staffStylistId, newStylist, token);
  //     message.success("Stylist added successfully!");
  //     setIsAddModalVisible(false);
  //     fetchStylists(); // Refresh the list of stylists
  //     form.resetFields();
  //   } catch (error) {
  //     console.error("Error adding stylist:", error);
  //     message.error("Failed to add stylist.");
  //   } finally {
  //     setLoadingSubmit(false);
  //   }
  // };
  

  const handleDeleteStylist = (stylistId: string) => {
    const token = localStorage.getItem("token") || "";
    if (!token) {
      message.error("Token not found");
      return;
    }
  
    // Show confirmation modal before deleting
    Modal.confirm({
      title: 'Are you sure you want to delete this stylist?',
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          const result = await deleteStylistById(stylistId, token);
          if (result === "Stylist deleted successfully") {
            message.success("Stylist deleted successfully");
            fetchStylists(); // Refresh the list of stylists
          } else {
            message.error(result);
          }
        } catch (error) {
          message.error("Failed to delete stylist");
          console.error("Error deleting stylist:", error);
        }
      },
    });
  };
  
  
  const columns: ColumnsType<Stylish> = [
    { title: "Name", dataIndex: "stylistName" },
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
      key: "action",
      render: (_: any, record: Stylish) => (
        <>
          <Button
            onClick={() => {
              
              form.setFieldsValue(record);
          
            }}
            type="primary"
            style={{ marginRight: 8 }}
          >
            Update
          </Button>
          <Button
            onClick={() => handleDeleteStylist(record.stylistId)}
            type="primary"
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  const openAddModal = () => {
    form.setFieldsValue({
      branchId: localStorage.getItem("branchId"),
      staffStylistId: localStorage.getItem("StaffStylistId"),
    });
    setIsAddModalVisible(true);
  };

  return (
    <div>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "3px" }}>
        Manage Stylists
      </h1>
      <Button
        type="primary"
        style={{ marginBottom: 16 }}
        onClick={openAddModal}
      >
        Add Stylist
      </Button>
      <Table
        columns={columns}
        dataSource={stylists}
        rowKey="stylistId"
        loading={loading}
      />

      <Modal
        title="Add Stylist"
        visible={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="Email"
            label="Email"
            rules={[
              { required: true, message: "Please enter Stylist Email" },
              { type: "email", message: "Please enter a valid email address" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Password"
            label="Password"
            rules={[
              { required: true, message: "Please enter Stylist Password" },
              {
                min: 8,
                max: 180,
                message: "Password must be 8-180 characters long",
              },
              {
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Password must contain uppercase, lowercase, number, and special character",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[
              { required: true, message: "Please enter Phone Number" },
              {
                pattern: /^\d{10}$/,
                message: "Phone number must be exactly 10 digits",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="averageRating"
            label="Average Rating"
            rules={[
              { required: true, message: "Please enter average rating" },
             
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="avatarImage"
            label="Avatar Image"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
            rules={[
              { required: true, message: "Please upload an avatar image" },
            ]}
          >
            <Upload
              name="avatar"
              listType="picture"
              maxCount={1}
              beforeUpload={() => false}
            >
              <Button>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loadingSubmit}
              style={{ width: "100%" }}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManagerStylish_staff;
