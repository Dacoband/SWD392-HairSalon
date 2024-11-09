import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Input,
  Space,
  Modal,
  message,
  Form,
  Select,
} from "antd";
import { Branches, StaffManager } from "../../models/type";
import type { ColumnsType } from "antd/es/table";
import {
  getStaffAll,
  getStaffWithoutBranch,
} from "../../services/Admin/StaffManager";
import {
  getBranchesAll,
  deleteBranch,
  addBranch,
  updateBranch,
} from "../../services/Branches/branches";
import { SearchOutlined } from "@ant-design/icons";
const { Option } = Select;
const ManagerBranch = () => {
  const [branches, setBranches] = useState<Branches[]>([]);
  const [staffManagers, setStaffManagers] = useState<StaffManager[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [branchToDelete, setBranchToDelete] = useState<string | null>(null);
  const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);
  const [availableStaffManagers, setAvailableStaffManagers] = useState<
    StaffManager[]
  >([]);
  const [form] = Form.useForm();
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [currentBranch, setCurrentBranch] = useState<Branches | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const branchesData = await getBranchesAll();
        const staffData = await getStaffAll();
        const availableStaffData = await getStaffWithoutBranch();
        setBranches(branchesData);
        setStaffManagers(staffData);
        setAvailableStaffManagers(availableStaffData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Chuyển đổi staffManagerID thành tên
  const getStaffManagerName = (staffManagerID: string) => {
    const staff = staffManagers.find(
      (s) => s.staffManagerID === staffManagerID
    );
    return staff ? staff.staffManagerName : "Chưa có Quản lí";
  };

  // Lọc dữ liệu theo địa chỉ
  const filteredBranches = branches.filter((branch) =>
    branch.address.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleDelete = async () => {
    if (branchToDelete) {
      try {
        await deleteBranch(branchToDelete);
        // Cập nhật lại danh sách chi nhánh sau khi xóa
        setBranches(
          branches.filter((branch) => branch.branchID !== branchToDelete)
        );
        message.success("Chi nhánh đã được xóa thành công");
      } catch (error) {
        message.error("Có lỗi xảy ra khi xóa chi nhánh");
      } finally {
        setIsModalVisible(false);
        setBranchToDelete(null);
      }
    }
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    setBranchToDelete(null);
  };
  const showDeleteConfirm = (id: string) => {
    setBranchToDelete(id);
    setIsModalVisible(true);
  };
  const handleAddBranch = async (values: any) => {
    try {
      await addBranch(values);
      // Update the branch list after adding
      const newBranch = { ...values, branchID: Date.now().toString() }; // Assuming branchID is unique
      setBranches([...branches, newBranch]);
      const availableStaffData = await getStaffWithoutBranch();
      setAvailableStaffManagers(availableStaffData);
      message.success("Chi nhánh đã được thêm thành công");
    } catch (error) {
      message.error("Có lỗi xảy ra khi thêm chi nhánh");
    } finally {
      setIsAddModalVisible(false);
      form.resetFields();
    }
  };
  const handleEditBranch = (branch: Branches) => {
    setCurrentBranch(branch); // Lưu chi nhánh hiện tại để chỉnh sửa
    form.setFieldsValue(branch); // Thiết lập giá trị cho form
    setIsEditModalVisible(true); // Hiển thị modal chỉnh sửa
  };
  // const handleUpdateBranch = async (values: any) => {
  //   if (currentBranch) {
  //     try {
  //       await updateBranch(currentBranch.branchID, values); // Gọi hàm updateBranch
  //       setBranches(
  //         branches.map((branch) =>
  //           branch.branchID === currentBranch.branchID
  //             ? { ...branch, ...values }
  //             : branch
  //         )
  //       );
  //       message.success("Chi nhánh đã được cập nhật thành công");
  //     } catch (error) {
  //       message.error("Có lỗi xảy ra khi cập nhật chi nhánh");
  //     } finally {
  //       setIsEditModalVisible(false);
  //       form.resetFields();
  //       setCurrentBranch(null);
  //     }
  //   }
  // };
  const handleUpdateBranch = async (values: any) => {
    if (currentBranch) {
      // console.log(values);
      // console.log(currentBranch.branchID);
      try {
        await updateBranch(currentBranch.branchID, values); // Gọi hàm updateBranch
        setBranches(
          branches.map((branch) =>
            branch.branchID === currentBranch.branchID
              ? { ...branch, ...values }
              : branch
          )
        );
        message.success("Chi nhánh đã được cập nhật thành công");
      } catch (error) {
        console.error("Error during branch update:", error); // In lỗi chi tiết
        message.error("Có lỗi xảy ra khi cập nhật chi nhánh");
      } finally {
        setIsEditModalVisible(false);
        form.resetFields();
        setCurrentBranch(null);
      }
    }
  };
  const columns: ColumnsType<Branches> = [
    {
      title: "Tên chi nhánh",
      dataIndex: "salonBranches",
    },
    {
      title: "Người quản lí",
      dataIndex: "staffManagerID",
      render: (text: string) => <span>{getStaffManagerName(text)}</span>,
    },
    {
      title: "Địa chỉ cụ thể",
      dataIndex: "address",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
    },

    {
      title: "Hành động",
      dataIndex: "action",
      render: (_, record) => (
        <div>
          <Button type="link" onClick={() => handleEditBranch(record)}>
            Chỉnh sửa
          </Button>
          <Button
            type="link"
            danger
            onClick={() => showDeleteConfirm(record.branchID)}
          >
            Xóa
          </Button>
        </div>
      ),
    },

    // {
    //   title: "Deleted",
    //   dataIndex: "delFlg",
    //   filters: [
    //     { text: "Đang hoạt động", value: true },
    //     { text: "Dừng hoạt động", value: false },
    //   ],
    //   onFilter: (value: boolean, record) => record.delFlg === value,
    //   render: (delFlg: boolean) => (
    //     <Tag color={delFlg ? "green" : "red"}>
    //       {delFlg ? "Đang hoạt động" : "Dừng hoạt động"}
    //     </Tag>
    //   ),
    // },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Tìm kiếm theo địa chỉ"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 200 }}
          allowClear
        />
        <Button type="primary" onClick={() => setIsAddModalVisible(true)}>
          Thêm chi nhánh
        </Button>
      </Space>
      <Table
        dataSource={filteredBranches}
        columns={columns}
        rowKey="branchID"
      />
      <Modal
        title="Xác nhận xóa"
        visible={isModalVisible}
        onOk={handleDelete}
        onCancel={handleCancel}
      >
        <p>Bạn có chắc chắn muốn xóa chi nhánh này?</p>
      </Modal>
      <Modal
        title="Thêm chi nhánh"
        visible={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleAddBranch}>
          <Form.Item
            name="staffManagerID"
            label="Người quản lí"
            rules={[
              { required: true, message: "Vui lòng chọn người quản lí!" },
            ]}
          >
            <Select placeholder="Chọn người quản lí">
              {availableStaffManagers.map((manager) => (
                <Option
                  key={manager.staffManagerID}
                  value={manager.staffManagerID}
                >
                  {manager.staffManagerName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="salonBranches"
            label="Tên chi nhánh"
            rules={[
              { required: true, message: "Vui lòng nhập tên chi nhánh!" },
            ]}
          >
            <Input placeholder="Nhập tên chi nhánh" />
          </Form.Item>
          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
          >
            <Input placeholder="Nhập địa chỉ" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
            ]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Chỉnh sửa chi nhánh"
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleUpdateBranch}>
          <Form.Item
            name="staffManagerID"
            label="Người quản lí"
            rules={[
              { required: true, message: "Vui lòng chọn người quản lí!" },
            ]}
          >
            <Select placeholder="Chọn người quản lí">
              {availableStaffManagers.map((manager) => (
                <Option
                  key={manager.staffManagerID}
                  value={manager.staffManagerID}
                >
                  {manager.staffManagerName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="salonBranches"
            label="Tên chi nhánh"
            rules={[
              { required: true, message: "Vui lòng nhập tên chi nhánh!" },
            ]}
          >
            <Input placeholder="Nhập tên chi nhánh" />
          </Form.Item>
          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
          >
            <Input placeholder="Nhập địa chỉ" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
            ]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManagerBranch;
