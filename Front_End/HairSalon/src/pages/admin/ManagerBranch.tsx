import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Table, Modal, Form, Input } from "antd";
import { ColumnsType } from "antd/es/table";
=======
import { Table, Input, Space, Button, message, Select, Form, Modal } from "antd";
import type { ColumnsType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";
import { getBranchesAll, addBranch } from "../../services/Branches/branches";
import { getStaffAll } from "../../services/Admin/StaffManager";
import dayjs from "dayjs";

interface StaffManager {
  staffManagerID: string;
  staffManagerName: string;
}
>>>>>>> TAT

interface Branch {
  branchID: string;
  staffManagerID: string;
  salonBranches: string;
  address: string;
  phone: string;
<<<<<<< HEAD
  staffManagerID?: string;
}

// URL API
const API_URL = "https://api.vol-ka.studio/api/v1/branch";

const ManagerBranch: React.FC = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newBranch, setNewBranch] = useState<Branch>({
    branchID: "",
    salonBranches: "",
    address: "",
    phone: "",
    staffManagerID: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editBranchID, setEditBranchID] = useState<string | null>(null);
  const navigate = useNavigate();
=======
  insDate: string;
  updDate: string;
  delFlg: boolean;
  staffManager?: StaffManager;
}

const ManagerBranch: React.FC = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [staffManagers, setStaffManagers] = useState<StaffManager[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
>>>>>>> TAT

  useEffect(() => {
    fetchBranches();
    fetchStaffManagers();
  }, []);

  const fetchBranches = async () => {
<<<<<<< HEAD
    try {
      const response = await axios.get(`${API_URL}/all`);
      setBranches(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load branches");
      setLoading(false);
    }
  };

  const handleAddBranch = async () => {
    try {
      await axios.post(`${API_URL}/add`, newBranch);
      setNewBranch({
        branchID: "",
        salonBranches: "",
        address: "",
        phone: "",
        staffManagerID: "",
      });
      fetchBranches();
    } catch (error) {
      console.error("Error adding branch:", error);
    }
  };

  const handleUpdateBranch = async () => {
    if (!editBranchID) return;

    try {
      await axios.put(`${API_URL}/update/${editBranchID}`, newBranch);
      setNewBranch({
        branchID: "",
        salonBranches: "",
        address: "",
        phone: "",
        staffManagerID: "",
      });
      setIsEditing(false);
      setEditBranchID(null);
      fetchBranches();
    } catch (error) {
      console.error("Error updating branch:", error);
    }
  };

  const handleDeleteBranch = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/delete/${id}`);
      fetchBranches();
    } catch (error) {
      console.error("Error deleting branch:", error);
    }
  };

  const handleEditClick = (branch: Branch) => {
    setIsEditing(true);
    setEditBranchID(branch.branchID);
    setNewBranch(branch);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBranch((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }
=======
    setLoading(true);
    try {
      const [branchesData, staffManagersData] = await Promise.all([
        getBranchesAll(),
        getStaffAll()
      ]);
      
      // Combine branch data with staff manager data
      const branchesWithStaffInfo = branchesData.map(branch => ({
        ...branch,
        staffManager: staffManagersData.find(
          (sm: StaffManager) => sm.staffManagerID === branch.staffManagerID
        )
      }));
      
      setBranches(branchesWithStaffInfo);
      setStaffManagers(staffManagersData);
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };
>>>>>>> TAT

  const fetchStaffManagers = async () => {
    try {
      const data = await getStaffAll();
      setStaffManagers(data);
    } catch (error) {
      console.error("Error fetching staff managers:", error);
    }
  };

  const columns: ColumnsType<Branch> = [
    {
      title: "Staff Manager",
      dataIndex: "staffManagerID",
      key: "staffManagerID",
      render: (staffManagerID: string) => {
        const staffManager = staffManagers.find(
          (sm) => sm.staffManagerID === staffManagerID
        );
        return staffManager?.staffManagerName || "Không có";
      },
    },
    {
      title: "Branch Name",
      dataIndex: "salonBranches",
      key: "salonBranches",
      sorter: (a, b) => a.salonBranches.localeCompare(b.salonBranches),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Created Date",
      dataIndex: "insDate",
      key: "insDate",
      render: (date: string) => dayjs(date).format("DD/MM/YYYY"),
      sorter: (a, b) => dayjs(a.insDate).unix() - dayjs(b.insDate).unix(),
    },
    {
      title: "Updated Date",
      dataIndex: "updDate",
      key: "updDate",
      render: (date: string) => dayjs(date).format("DD/MM/YYYY"),
      sorter: (a, b) => dayjs(a.updDate).unix() - dayjs(b.updDate).unix(),
    },
    {
      title: "Status",
      dataIndex: "delFlg",
      key: "delFlg",
      render: (delFlg: boolean) => (
        <span style={{ color: delFlg ? "green" : "red" }}>
          {!delFlg ? "Inactive" : "Active"}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button 
            danger 
            onClick={() => handleDelete(record.branchID)}
            disabled={record.delFlg}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleEdit = (branch: Branch) => {
    setEditingBranch(branch);
    setIsModalVisible(true);
  };

  const handleDelete = (branchID: string) => {
    // Implement delete functionality
    console.log("Delete branch:", branchID);
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
    setEditingBranch(null);
  };

  const handleAddBranch = async (values: any) => {
    try {
      const newBranch = await addBranch(values);
      setBranches([...branches, newBranch]);
      message.success("Branch added successfully");
      setIsAddModalVisible(false);
    } catch (error) {
      console.error("Error adding branch:", error);
      message.error("Failed to add branch");
    }
  };

  const filteredBranches = branches.filter((branch) =>
    branch.salonBranches.toLowerCase().includes(searchText.toLowerCase())
  );

  const EditBranchForm = ({ branch, staffManagers, onFinish }: any) => {
    return (
      <Form
        initialValues={branch}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          name="staffManagerID"
          label="Staff Manager"
          rules={[{ required: true, message: 'Please select a staff manager' }]}
        >
          <Select>
            {staffManagers.map((sm: StaffManager) => (
              <Select.Option key={sm.staffManagerID} value={sm.staffManagerID}>
                {sm.staffManagerName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="salonBranches" label="Branch Name">
          <Input />
        </Form.Item>
        <Form.Item name="address" label="Address">
          <Input />
        </Form.Item>
        <Form.Item name="phone" label="Phone">
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form>
    );
  };

  const AddBranchForm = ({ staffManagers, onFinish }: any) => {
    return (
      <Form
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          name="staffManagerID"
          label="Staff Manager"
          rules={[{ required: true, message: 'Please select a staff manager' }]}
        >
          <Select>
            {staffManagers.map((sm: StaffManager) => (
              <Select.Option key={sm.staffManagerID} value={sm.staffManagerID}>
                {sm.staffManagerName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="salonBranches"
          label="Branch Name"
          rules={[{ required: true, message: 'Please enter branch name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: 'Please enter address' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone"
          rules={[
            { required: true, message: 'Please enter phone number' },
            { pattern: /^\d+$/, message: 'Please enter valid phone number' }
          ]}
        >
          <Input />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Add Branch
        </Button>
      </Form>
    );
  };

  const columns: ColumnsType<Branch> = [
    {
      title: "Branch Name",
      dataIndex: "branchName",
      key: "branchName",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Manager",
      dataIndex: "manager",
      key: "manager",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button
            type="link"
            onClick={() => handleDeleteBranch(record.branchID)}
          >
            Edit
          </Button>
          <Button
            type="link"
            danger
            onClick={() => handleDeleteBranch(record.branchID)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
<<<<<<< HEAD
    <div className="relative p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Branches</h2>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">
          {isEditing ? "Edit Branch" : "Add New Branch"}
        </h3>

        <input
          type="text"
          name="salonBranches"
          value={newBranch.salonBranches}
          onChange={handleInputChange}
          placeholder="Salon Branch Name"
          className="border rounded p-2 mb-2 w-full"
        />

        <input
          type="text"
          name="address"
          value={newBranch.address}
          onChange={handleInputChange}
          placeholder="Address"
          className="border rounded p-2 mb-2 w-full"
        />

        <input
          type="text"
          name="phone"
          value={newBranch.phone}
          onChange={handleInputChange}
          placeholder="Phone"
          className="border rounded p-2 mb-2 w-full"
        />

        <input
          type="text"
          name="staffManagerID"
          value={newBranch.staffManagerID || ""}
          onChange={handleInputChange}
          placeholder="Staff Manager ID"
          className="border rounded p-2 mb-2 w-full"
        />

        <button
          onClick={isEditing ? handleUpdateBranch : handleAddBranch}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isEditing ? "Update Branch" : "Add Branch"}
        </button>

        {isEditing && (
          <button
            onClick={() => {
              setIsEditing(false);
              setEditBranchID(null);
              setNewBranch({
                branchID: "",
                salonBranches: "",
                address: "",
                phone: "",
                staffManagerID: "",
              });
            }}
            className="ml-4 bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {branches.map((branch) => (
          <div
            key={branch.branchID}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 p-4"
          >
            <h3 className="text-xl font-bold mb-2 text-[#333]">
              {branch.salonBranches}
            </h3>
            <p className="text-gray-700 mb-1">Address: {branch.address}</p>
            <p className="text-gray-700">Phone: {branch.phone}</p>

            <div className="flex space-x-4 mt-4">
              <button
                onClick={() => handleEditClick(branch)}
                className="bg-yellow-500 text-white px-4 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteBranch(branch.branchID)}
                className="bg-red-500 text-white px-4 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
=======
    <div style={{ padding: "24px" }}>
      <h2>Branch Management</h2>
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search by branch name"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 200 }}
          allowClear
        />
        <Button 
          type="primary" 
          onClick={() => setIsAddModalVisible(true)}
        >
          Add Branch
        </Button>
      </Space>

      <Table
        columns={columns}
        dataSource={filteredBranches}
        rowKey="branchID"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title="Add New Branch"
        visible={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        footer={null}
      >
        <AddBranchForm
          staffManagers={staffManagers}
          onFinish={handleAddBranch}
        />
      </Modal>

      <Modal
        title="Edit Branch"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <EditBranchForm
          branch={editingBranch}
          staffManagers={staffManagers}
          onFinish={handleModalOk}
        />
      </Modal>
>>>>>>> TAT
    </div>
  );
};

export default ManagerBranch;
