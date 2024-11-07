import React, { useEffect, useState } from "react";
import {
  Table,
  Input,
  Space,
  Button,
  message,
  Select,
  Form,
  Modal,
  Switch,
} from "antd";
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
        getStaffAll(),
      ]);

      // Combine branch data with staff manager data
      const branchesWithStaffInfo = branchesData.map((branch) => ({
        ...branch,
        staffManager: staffManagersData.find(
          (sm: StaffManager) => sm.staffManagerID === branch.staffManagerID
        ),
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
  const handleStatusChange = async (branchID: string, delFlg: boolean) => {
    try {
      await updateBranchStatus(branchID, { delFlg }); // Call your API to update the status
      setBranches((prevBranches) =>
        prevBranches.map((branch) =>
          branch.branchID === branchID ? { ...branch, delFlg } : branch
        )
      );
      message.success("Branch status updated successfully");
    } catch (error) {
      console.error("Error updating branch status:", error);
      message.error("Failed to update branch status");
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
      render: (delFlg: boolean, record: Branch) => (
        <Switch
          checked={delFlg}
          // onChange={(checked) => handleStatusChange(record.branchID, checked)}
          checkedChildren="Hoạt Động"
          unCheckedChildren="Ngừng hoạt động"
        />
      ),
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <Button type="primary" onClick={() => handleEdit(record)}>
    //         Edit
    //       </Button>
    //     </Space>
    //   ),
    // },
  ];

  // const handleEdit = (branch: Branch) => {
  //   setEditingBranch(branch);
  //   setIsModalVisible(true);
  // };

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
      <Form initialValues={branch} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="staffManagerID"
          label="Staff Manager"
          rules={[{ required: true, message: "Please select a staff manager" }]}
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
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item
          name="staffManagerID"
          label="Staff Manager"
          rules={[{ required: true, message: "Please select a staff manager" }]}
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
          rules={[{ required: true, message: "Please enter branch name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: "Please enter address" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone"
          rules={[
            { required: true, message: "Please enter phone number" },
            { pattern: /^\d+$/, message: "Please enter valid phone number" },
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
    <div style={{ padding: "24px" }}>
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search by branch name"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 200 }}
          allowClear
        />
        <Button type="primary" onClick={() => setIsAddModalVisible(true)}>
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
    </div>
  );
};

export default ManagerBranch;
