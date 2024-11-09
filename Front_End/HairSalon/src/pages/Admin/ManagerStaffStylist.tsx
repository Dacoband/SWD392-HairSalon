// // components/Admin/ManagerStylist.tsx
// import React, { useEffect, useState } from "react";
// import { Table, message, Space, Input, Button, Popconfirm } from "antd";
// import type { ColumnsType } from "antd/es/table";
// import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
// import {
//   getStylistsWithBranch,
//   deleteStylist,
// } from "../../services/Admin/StaffStylist";
// import { StaffStylist } from "../../models/type";
// // interface Stylist {
// //   staffStylistId: string;
// //   staffStylistName: string;
// //   dateOfBirth: string;
// //   phoneNumber: string;
// //   address: string;
// //   salonBranches: string;
// // }

// const ManagerStaffStylist: React.FC = () => {
//   const [saffStylist, setStylists] = useState<StaffStylist[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [searchText, setSearchText] = useState<string>("");

//   const columns: ColumnsType<StaffStylist> = [
//     {
//       title: "Họ và tên",
//       dataIndex: "staffStylistName",
//       key: "staffStylistName",
//     },
//     {
//       title: "Ngày Sinh",
//       dataIndex: "dateOfBirth",
//       key: "dateOfBirth",
//       render: (date: string) => new Date(date).toLocaleDateString(),
//     },
//     {
//       title: "Số Điện Thoại",
//       dataIndex: "phoneNumber",
//       key: "phoneNumber",
//     },
//     {
//       title: "Địa chỉ",
//       dataIndex: "address",
//       key: "address",
//     },
//     {
//       title: "Tên chi nhánh",
//       dataIndex: "salonBranches",
//       key: "salonBranches",
//     },
//     {
//       title: "Actions",
//       key: "actions",
//       render: (_, record) => (

//           <Button danger icon={<DeleteOutlined />} size="small">

//           </Button>

//       ),
//     },
//   ];

//   const filteredStylists = stylists.filter((stylist) =>
//     stylist.staffStylistName.toLowerCase().includes(searchText.toLowerCase())
//   );

//   return (
//     <div style={{ padding: "24px" }}>
//       <h2>Stylist Management</h2>

//       <Space style={{ marginBottom: 16 }}>
//         <Input
//           placeholder="Search by Stylist Name"
//           prefix={<SearchOutlined />}
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//           style={{ width: 300 }}
//           allowClear
//         />
//       </Space>

//       <Table
//         columns={columns}
//         dataSource={filteredStylists}
//         rowKey="staffStylistId"
//         loading={loading}
//         pagination={{ pageSize: 10 }}
//         scroll={{ x: 1000 }}
//       />
//     </div>
//   );
// };

// export default ManagerStaffStylist;
// components/Admin/ManagerStaffStylist.tsx
import React, { useEffect, useState } from "react";
import { Table, Space, Input, Button, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import { StaffStylist, Branches } from "../../models/type";
import {
  fetchAllStylists,
  deleteStylist,
} from "../../services/Admin/StaffStylist";
import { getBranchesAll } from "../../services/Branches/branches";

const ManagerStaffStylist: React.FC = () => {
  const [stylists, setStylists] = useState<StaffStylist[]>([]);
  const [branches, setBranches] = useState<Branches[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");

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
      </Space>

      <Table
        columns={columns}
        dataSource={filteredStylists}
        rowKey="staffStylistId"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default ManagerStaffStylist;
