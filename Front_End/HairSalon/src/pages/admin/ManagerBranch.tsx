import React, { useEffect, useState } from "react";
<<<<<<< HEAD
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

interface Branch {
  branchID: string;
  staffManagerID: string;
  salonBranches: string;
  address: string;
  phone: string;
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

  useEffect(() => {
    fetchBranches();
    fetchStaffManagers();
  }, []);

  const fetchBranches = async () => {
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

  return (
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
=======
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Branch {
  branchID: string;
  salonBranches: string;
  address: string;
  phone: string;
}

// URL API
const API_URL = "https://api.vol-ka.studio/api/v1/branch/all";

const ManagerBranch: React.FC = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await axios.get(API_URL);
        setBranches(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load branches");
        setLoading(false);
      }
    };

    fetchBranches();
  }, []);

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {branches.map((branch) => (
          <div
            key={branch.branchID}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
          >
            <img
              src="src/assets/branch-placeholder.jpg" // Placeholder image
              alt={branch.salonBranches}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2 text-[#333]">
                {branch.salonBranches}
              </h3>
              <p className="text-gray-700 mb-1">Address: {branch.address}</p>
              <p className="text-gray-700">Phone: {branch.phone}</p>
            </div>
          </div>
        ))}
      </div>
>>>>>>> origin/Thaiyud
    </div>
  );
};

export default ManagerBranch;

// import React from "react";
// import { useNavigate } from "react-router-dom";
// const Branch: React.FC = () => {
//   const navigate = useNavigate();
//   return (
//     <div className="relative">
//       <div className="relative">
//         <img
//           src="src/assets/hero-img.jpg"
//           className="w-full h-30 object-cover"
//           alt="Hero"
//         />
//         {/* Button positioned on top of the image */}
//         <button
//           className="absolute bottom-10 left-10 px-6 py-3 bg-[#8e7424] text-white rounded-full hover:bg-[#74601d]"
//           onClick={() => navigate("/service")}
//         >
//           Booking Now!!!
//         </button>
//       </div>

//       <div className="flex flex-col md:flex-row justify-between items-start">
//         {/* Left Column: Contact Info */}
//         <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-lg mb-6 md:mb-0">
//           <h2 className="text-xl font-semibold mb-4">CONTACT INFO</h2>
//           <p className="mb-2">Hair Salon</p>
//           <p className="mb-2">FPT University</p>
//           <p className="mb-2">Thủ Đức, Việt Nam</p>
//           <p className="mb-2">P: (+84) 123456789</p>
//           <p className="mb-4">Email: HairSalon@gmail.com</p>
//           {/* Social Media Links */}
//           <div className="flex space-x-3">
//             <a className="text-gray-600 hover:text-yellow-500"></a>
//             <a className="text-gray-600 hover:text-yellow-500"></a>
//             <a className="text-gray-600 hover:text-yellow-500"></a>
//             <a className="text-gray-600 hover:text-yellow-500"></a>
//           </div>
//         </div>

//         {/* Right Column: Contact Form */}
//         <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-lg">
//           <h2 className="text-xl font-semibold mb-4">CONTACT FORM</h2>
//           <p className="mb-4">
//             Please complete the form below. We'll do everything we can to
//             respond to you as quickly as possible.
//           </p>
//           <form>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//               <input
//                 type="text"
//                 placeholder="Name"
//                 className="p-3 border border-gray-300 rounded-md"
//                 required
//               />
//               <input
//                 type="tel"
//                 placeholder="Phone"
//                 className="p-3 border border-gray-300 rounded-md"
//                 required
//               />
//               <input
//                 type="email"
//                 placeholder="Email"
//                 className="p-3 border border-gray-300 rounded-md"
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Subject"
//                 className="p-3 border border-gray-300 rounded-md"
//                 required
//               />
//             </div>
//             <textarea
//               placeholder="Message"
//               className="p-3 border border-gray-300 rounded-md w-full mb-4"
//               rows={4}
//               required
//             ></textarea>
//             <button
//               className="bg-[#c89c47] text-white px-6 py-2 rounded-md hover:bg-[#b08e3a]"
//               onClick={() => {
//                 // Get the user data from localStorage
//                 const userData = JSON.parse(
//                   localStorage.getItem("userData") || "{}"
//                 );

//                 // Check if the user is logged in and has the role "MB"
//                 if (userData && userData.role === "MB") {
//                   navigate("/homePage");
//                 } else {
//                   // If not logged in or not an "MB" role, navigate to /login
//                   navigate("/login");
//                 }
//               }}
//             >
//               SEND MESSAGE
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Branch;
