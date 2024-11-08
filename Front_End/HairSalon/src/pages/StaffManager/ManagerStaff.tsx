import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Input, Form, message } from "antd";
import type { ColumnsType } from "antd/es/table";

// Define the data type for a stylist
interface StaffStylist {
  staffStylistId: string;
  staffStylistName: string;
  dateOfBirth: string;
  phoneNumber: string;
  address: string;
  avatarImage: string;
}

const ManagerStaff: React.FC = () => {
  const [staffList, setStaffList] = useState<StaffStylist[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffStylist | null>(null);

  useEffect(() => {
    fetchStaffList();
  }, []);

  const fetchStaffList = async () => {
    setLoading(true);
    try {
      const response = await axios.get<StaffStylist[]>(
        "https://api.vol-ka.studio/api/v1/staff-stylist/all"
      );
      setStaffList(response.data);
    } catch (error) {
      console.error("Error fetching staff list:", error);
      message.error("Error fetching staff list");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (staff: StaffStylist) => {
    setEditingStaff(staff);
    setIsModalVisible(true);
  };

  const handleDelete = async (staffStylistId: string) => {
    try {
      await axios.delete(
        `https://api.vol-ka.studio/api/v1/staff-stylist/delete/${staffStylistId}`
      );
      setStaffList(
        staffList.filter((staff) => staff.staffStylistId !== staffStylistId)
      );
      message.success("Staff deleted successfully");
    } catch (error) {
      console.error("Error deleting staff:", error);
      message.error("Error deleting staff");
    }
  };

  const handleModalOk = async (values: Partial<StaffStylist>) => {
    if (editingStaff) {
      try {
        const response = await axios.put(
          `https://api.vol-ka.studio/api/v1/staff-stylist/update/${editingStaff.staffStylistId}`,
          values
        );
        const updatedStaff = response.data;
        setStaffList((prevList) =>
          prevList.map((staff) =>
            staff.staffStylistId === updatedStaff.staffStylistId
              ? updatedStaff
              : staff
          )
        );
        message.success("Staff updated successfully");
      } catch (error) {
        console.error("Error updating staff:", error);
        message.error("Error updating staff");
      }
    }
    setIsModalVisible(false);
    setEditingStaff(null);
  };

  const handleAddModalOk = async (values: StaffStylist) => {
    try {
      const response = await axios.post(
        "https://api.vol-ka.studio/api/v1/staff-stylist/create",
        values
      );
      setStaffList([...staffList, response.data]);
      message.success("Staff added successfully");
    } catch (error) {
      console.error("Error adding staff:", error);
      message.error("Error adding staff");
    }
    setIsAddModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingStaff(null);
  };

  const handleAddModalCancel = () => {
    setIsAddModalVisible(false);
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
      title: "Name",
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
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button
            type="link"
            danger
            onClick={() => handleDelete(record.staffStylistId)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return <>ok</>;
};

export default ManagerStaff;
