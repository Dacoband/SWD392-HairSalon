<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Input, Form, message, Upload } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Stylish } from "../../models/type";
import {
  getStylishByBranchID,
  addStylishById,
} from "../../services/Stylish";

const ManagerStylish_staff: React.FC = () => {
  const [stylists, setStylists] = useState<Stylish[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [branchId, setBranchId] = useState<string>("");

  const fetchStylists = async () => {
    // Moved the function declaration outside of useEffect
    setLoading(true);
    try {
      const branchId = localStorage.getItem("branchId"); // Lấy branchId từ local storage
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
    fetchStylists(); // Gọi hàm fetchStylists khi component được mount
  }, []);

  // Handle upload change with loading status
  const handleUploadImage = (info: any) => {
    if (info.file.status === "done" || info.file.status === "success") {
      setAvatarFile(info.file.originFileObj); // Save file for submission
      message.success(`${info.file.name} uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} upload failed.`);
    }
  };

  

  const columns: ColumnsType<Stylish> = [
    {
      title: "Name",
      dataIndex: "stylistName",
    },
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
  ];

  return (
    <div>
     <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom:'3px' }}>
  Manage Stylists
</h1>
      <Table
        columns={columns}
        dataSource={stylists}
        rowKey="stylistId"
        loading={loading}
      />

    </div>
  );
=======
import React from "react";

const ManagerStylish: React.FC = () => {
  return <h2> Profile All</h2>;
>>>>>>> TAT
};

export default ManagerStylish;
