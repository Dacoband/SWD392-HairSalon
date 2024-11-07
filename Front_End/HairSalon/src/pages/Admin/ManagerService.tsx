// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Table,
//   Button,
//   Modal,
//   Input,
//   Form,
//   message,
//   Space,
//   Select,
// } from "antd";
// import type { ColumnsType } from "antd/es/table";
// import { getAuthToken } from "../../services/authSalon";
// import { SearchOutlined } from "@ant-design/icons";

// interface Service {
//   serviceID: string;
//   serviceName: string;
//   type: number;
//   price: number;
//   description: string | null;
//   duration: number;
//   avatarImage: string;
//   delFlg: boolean;
// }

// const ManagerService: React.FC = () => {
//   const [services, setServices] = useState<Service[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [isAddModalVisible, setIsAddModalVisible] = useState(false);
//   const [editingService, setEditingService] = useState<Service | null>(null);
//   const [searchText, setSearchText] = useState<string>("");

//   useEffect(() => {
//     fetchServices();
//   }, []);

//   const fetchServices = async () => {
//     setLoading(true);
//     try {
//       const token = getAuthToken();
//       const response = await axios.get(
//         "https://api.vol-ka.studio/api/v1/service/get-all?DelFig=true",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setServices(response.data);
//     } catch (error) {
//       console.error("Error fetching services:", error);
//       message.error("Error fetching services");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // const handleEdit = (service: Service) => {
//   //   setEditingService(service);
//   //   setIsModalVisible(true);
//   // };

//   // const handleDelete = async (serviceID: string) => {
//   //   try {
//   //     const token = getAuthToken();
//   //     await axios.patch(
//   //       `https://api.vol-ka.studio/api/v1/service/delete/${serviceID}`,
//   //       {},
//   //       {
//   //         headers: {
//   //           Authorization: `Bearer ${token}`,
//   //         },
//   //       }
//   //     );
//   //     setServices(
//   //       services.filter((service) => service.serviceID !== serviceID)
//   //     );
//   //     message.success("Service deleted");
//   //   } catch (error) {
//   //     console.error("Error deleting service:", error);
//   //     message.error("Error deleting service");
//   //   }
//   // };
//   const handleDelete = async (serviceID: string) => {
//     try {
//       const token = getAuthToken();
//       await axios.patch(
//         `https://api.vol-ka.studio/api/v1/service/delete/${serviceID}`,
//         { delFlg: false },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       // Cập nhật trạng thái để loại bỏ dịch vụ khỏi danh sách hiển thị
//       setServices((prevServices) =>
//         prevServices.filter((service) => service.serviceID !== serviceID)
//       );
//       message.success(
//         "Dịch vụ đã được cập nhật trạng thái xóa và ẩn khỏi bảng"
//       );
//     } catch (error) {
//       console.error("Lỗi khi cập nhật trạng thái xóa dịch vụ:", error);
//       message.error("Lỗi khi cập nhật trạng thái xóa dịch vụ");
//     }
//   };

//   const handleModalOk = async (values: Partial<Service>) => {
//     if (editingService) {
//       try {
//         const token = getAuthToken();
//         const response = await axios.patch(
//           `https://api.vol-ka.studio/api/v1/service/update/${editingService.serviceID}`,
//           values,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         const updatedService = response.data;
//         setServices((prevServices) =>
//           prevServices.map((service) =>
//             service.serviceID === updatedService.serviceID
//               ? updatedService
//               : service
//           )
//         );
//         message.success("Service updated successfully");
//       } catch (error) {
//         console.error("Error updating service:", error);
//         message.error("Error updating service");
//       }
//     }
//     setIsModalVisible(false);
//     setEditingService(null);
//   };

//   // const handleAddModalOk = async (values: Service) => {
//   //   try {
//   //     const token = getAuthToken();
//   //     const response = await axios.post(
//   //       "https://api.vol-ka.studio/api/v1/service/create",
//   //       values,
//   //       {
//   //         headers: {
//   //           Authorization: `Bearer ${token}`,
//   //         },
//   //       }
//   //     );
//   //     setServices([...services, response.data]);
//   //     message.success("Service added successfully");
//   //   } catch (error) {
//   //     console.error("Error adding service:", error);
//   //     message.error("Error adding service");
//   //   }
//   //   setIsAddModalVisible(false);
//   // };
//   const handleAddModalOk = async (values: Partial<Service>) => {
//     try {
//       const token = getAuthToken();
//       const response = await axios.post(
//         "https://api.vol-ka.studio/api/v1/service/create",
//         {
//           ...values,
//           delFlg: true, // Chắc chắn là dịch vụ này được thêm và chưa bị xóa
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setServices([...services, response.data]);
//       message.success("Dịch vụ đã được thêm thành công");
//     } catch (error) {
//       console.error("Lỗi khi thêm dịch vụ:", error);
//       console.log(error.response?.data); // Log chi tiết lỗi từ server
//       message.error("Lỗi khi thêm dịch vụ");
//     }
//     setIsAddModalVisible(false);
//   };

//   const handleModalCancel = () => {
//     setIsModalVisible(false);
//     setEditingService(null);
//   };

//   const handleAddModalCancel = () => {
//     setIsAddModalVisible(false);
//   };

//   const filteredServices = services
//     .filter((service) => service.delFlg)
//     .filter((service) =>
//       service.serviceName.toLowerCase().includes(searchText.toLowerCase())
//     );

//   const columns: ColumnsType<Service> = [
//     {
//       title: "Avatar",
//       dataIndex: "avatarImage",
//       key: "avatarImage",
//       render: (text: string) => (
//         <img
//           src={text}
//           alt="avatar"
//           style={{ width: 80, height: 80, borderRadius: "50%" }}
//         />
//       ),
//     },
//     {
//       title: "Tên dịch vụ",
//       dataIndex: "serviceName",
//       key: "serviceName",
//     },
//     {
//       title: "Loại",
//       dataIndex: "type",
//       key: "type",
//     },
//     {
//       title: "Price",
//       dataIndex: "price",
//       key: "price",
//       render: (price: number) => `${price.toLocaleString()} VND`,
//     },
//     {
//       title: "Mô tả",
//       dataIndex: "description",
//       key: "description",
//       render: (text: string | null) => text || "No description",
//       width: 200,
//     },
//     {
//       title: "Thời gian",
//       dataIndex: "duration",
//       key: "duration",
//     },
//     {
//       title: "Hoạt động",
//       key: "actions",
//       render: (_, record) => (
//         <>
//           {/* <Button type="link" onClick={() => handleEdit(record)}>
//             Chỉnh sửa
//           </Button> */}
//           <Button
//             type="link"
//             danger
//             onClick={() => handleDelete(record.serviceID)}
//           >
//             Xóa
//           </Button>
//         </>
//       ),
//     },
//   ];

//   return (
//     <>
//       <Space style={{ marginBottom: 16 }}>
//         <Input
//           placeholder="Search by service name"
//           prefix={<SearchOutlined />}
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//           style={{ width: 200 }}
//           allowClear
//         />
//         <Button type="primary" onClick={() => setIsAddModalVisible(true)}>
//           Thêm dịch vụ
//         </Button>
//       </Space>

//       <Table
//         columns={columns}
//         dataSource={filteredServices}
//         rowKey="serviceID"
//         loading={loading}
//         pagination={{ pageSize: 5 }}
//       />
//       <Modal
//         title="Edit Service"
//         visible={isModalVisible}
//         onCancel={handleModalCancel}
//         footer={null}
//       >
//         <Form
//           initialValues={editingService || {}}
//           onFinish={handleModalOk}
//           layout="vertical"
//         >
//           <Form.Item name="serviceName" label="Service Name">
//             <Input />
//           </Form.Item>
//           <Form.Item name="avatarImage" label="Service Image">
//             <Input type="url" />
//           </Form.Item>
//           <Form.Item name="description" label="Description">
//             <Input.TextArea rows={3} />
//           </Form.Item>
//           <Form.Item name="price" label="Price">
//             <Input type="number" />
//           </Form.Item>
//           <Form.Item name="duration" label="Duration">
//             <Input type="number" />
//           </Form.Item>
//           <Button type="primary" htmlType="submit">
//             Save
//           </Button>
//         </Form>
//       </Modal>
//       {/* <Modal
//         title="Add Service"
//         visible={isAddModalVisible}
//         onCancel={handleAddModalCancel}
//         footer={null}
//       >
//         <Form onFinish={handleAddModalOk} layout="vertical">
//           <Form.Item
//             name="serviceName"
//             label="Service Name"
//             rules={[{ required: true, message: "Please enter service name!" }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="avatarImage"
//             label="Service Image"
//             rules={[{ required: true, message: "Please enter service Image!" }]}
//           >
//             <Input type="url" />
//           </Form.Item>
//           <Form.Item name="price" label="Price">
//             <Input type="number" />
//           </Form.Item>
//           <Form.Item name="description" label="Description">
//             <Input.TextArea rows={3} />
//           </Form.Item>
//           <Form.Item name="duration" label="Duration">
//             <Input type="number" />
//           </Form.Item>
//           <Button type="primary" htmlType="submit">
//             Thêm
//           </Button>
//         </Form>
//       </Modal> */}
//       <Modal
//         title="Thêm Dịch Vụ"
//         visible={isAddModalVisible}
//         onCancel={handleAddModalCancel}
//         footer={null}
//       >

//         <Form onFinish={handleAddModalOk} layout="vertical">
//   <Form.Item
//     name="serviceName"
//     label="Tên Dịch Vụ"
//     rules={[{ required: true, message: "Vui lòng nhập tên dịch vụ!" },
//       { type: 'string', message: "Vui lòng nhập service Name hợp lệ!" }
//     ]}
//   >
//     <Input />
//   </Form.Item>

//   <Form.Item
//     name="avatarImage"
//     label="Hình Ảnh Dịch Vụ"
//     rules={[
//       { required: true, message: "Vui lòng nhập URL hình ảnh!" },
//       { type: 'string', message: "Vui lòng nhập URL hợp lệ!" },
//     ]}
//   >
//     <Input type="url" />
//   </Form.Item>

//   <Form.Item
//     name="price"
//     label="Giá"
//     rules={[
//       { required: true, message: "Vui lòng nhập giá!" },
//       { type: 'number', message: "Giá phải là một số!" },
//     ]}
//   >
//     <Input type="number" />
//   </Form.Item>

//   <Form.Item name="description" label="Mô Tả"
//    rules={[

//     { type: 'string', message: "mô tả " },
//   ]}>
//     <Input.TextArea rows={3} />
//   </Form.Item>

//   <Form.Item
//     name="duration"
//     label="Thời Gian"
//     rules={[
//       { required: true, message: "Vui lòng nhập thời gian!" },
//       { type: 'number', message: "Thời gian phải là một số hợp lệ!" },
//     ]}
//   >
//     <Input type="number" />
//   </Form.Item>

//   <Form.Item
//     name="type"
//     label="Loại"
//     rules={[{ required: true, message: "Vui lòng chọn loại dịch vụ!" },
//       { type: 'number', message: "Kiếu phải là một số hợp lệ!" }
//     ]}
//   >
//     <Select
//       placeholder="Chọn loại"
//       options={[
//         { label: "Loại 1", value: 1 },
//         { label: "Loại 2", value: 2 },
//         { label: "Loại 3", value: 3 },
//       ]}
//     />
//   </Form.Item>

//   <Button type="primary" htmlType="submit">
//     Thêm
//   </Button>
// </Form>

//       </Modal>
//     </>
//   );
// };

// export default ManagerService;

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
import { SearchOutlined } from "@ant-design/icons";
import { AnyObject } from "antd/es/_util/type";

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
  const handleDelete = async (serviceID: string) => {
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
      // Cập nhật trạng thái để loại bỏ dịch vụ khỏi danh sách hiển thị
      setServices((prevServices) =>
        prevServices.filter((service) => service.serviceID !== serviceID)
      );
      message.success("Dịch vụ đã được cập nhật trạng thái xóa ");
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái xóa dịch vụ:", error);
      message.error("Lỗi khi cập nhật trạng thái xóa dịch vụ");
    }
  };
  const handleAddService = async (values: AnyObject) => {
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
          {/* <Button type="link" onClick={() => handleEdit(record)}>
            Chỉnh sửa
          </Button> */}
          <Button
            type="link"
            danger
            onClick={() => handleDelete(record.serviceID)}
          >
            Xóa
          </Button>
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
              <Select.Option value={1}>Loại 1</Select.Option>
              <Select.Option value={2}>Loại 2</Select.Option>
              <Select.Option value={3}>Loại 3</Select.Option>
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
    </>
  );
};

export default ManagerService;
