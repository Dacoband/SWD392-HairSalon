import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Input, notification, message, Select, Pagination } from "antd";
import { getAppointmentsByCustomer, cancelAppointment, getAllAppointments } from "../../services/appointmentSalon";
import { Appointment, Services, Stylish ,Member} from "../../models/type";
import { getStylishByBranchID } from "../../services/Stylish";
import { getAppointmentDetails,getMemberById } from "../../services/Member"; 
import "./AppointmentStaff.scss";

const { Option } = Select;

const ManagerAppointmentStaff = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [stylists, setStylists] = useState<Stylish[]>([]);
  const [members, setMembers] = useState<Record<string, { name: string, phoneNumber: string }>>({}); // State to hold member names and phone numbers
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredStatus, setFilteredStatus] = useState<number | null>(null);
  
  const appointmentsPerPage = 4;
  const statusMap: { [key: number]: string } = {
    1: "Đã đặt lịch thành công",
    2: "Đã thanh toán",
    3: "Đã hủy",
    4: "Đã hoàn thành",
  };

  const fetchStylists = async () => {
    setLoading(true);
    try {
      const branchId = localStorage.getItem("branchId");
      if (branchId) {
        const fetchedStylists = await getStylishByBranchID(branchId);
        setStylists(fetchedStylists);
        await fetchAppointments(fetchedStylists.map((s) => s.stylistId));
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

  const fetchAppointments = async (stylistIds: string[]) => {
    try {
      const allAppointments = await getAllAppointments();
      const filteredAppointments = allAppointments.filter(
        (appointment: Appointment) => stylistIds.includes(appointment.stylistId)
      );
      setAppointments(filteredAppointments);
      await fetchMemberDetails(filteredAppointments);
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
      message.error("Failed to fetch appointments");
    }
  };

  const fetchMemberDetails = async (appointments: Appointment[]) => {
    try {
      const membersMap: Record<string, { name: string, phoneNumber: string }> = {}; // To store member details
      const appointmentMap: Record<string, { customerId: string }> = {}; // To map customerId to appointmentId
  
      // Create a list of promises to fetch member details for each appointment
      const memberPromises = appointments.map(async (appointment) => {
        const customerId = appointment.customerId; // Use customerId to fetch member details
        // Assuming getMemberById fetches member data by customerId
        const member = await getMemberById(customerId);
  
        // Map the customerId to member details
        membersMap[customerId] = {
          name: member.memberName, // Corrected member name field
          phoneNumber: member.phoneNumber,
        };
  
        // You can also populate the appointmentMap if necessary (optional)
        appointmentMap[appointment.appointmentId] = {
          customerId: customerId,
        };
      });
  
      // Wait for all member data to be fetched
      await Promise.all(memberPromises);
  
      // Update state with all member details at once
      setMembers(membersMap);
    } catch (error) {
      console.error("Failed to fetch member details:", error);
      message.error("Failed to fetch member details");
    }
  };
  


  useEffect(() => {
    fetchStylists();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleStatusFilterChange = (value: number | null) => {
    setFilteredStatus(value);
    setCurrentPage(1);
  };

  const filteredAppointments = appointments.filter((appointment) =>
    filteredStatus !== null ? appointment.status === filteredStatus : true
  );

  const paginatedAppointments = filteredAppointments.slice(
    (currentPage - 1) * appointmentsPerPage,
    currentPage * appointmentsPerPage
  );

  const columns = [
    {
      title: "Member",
      dataIndex: "customerId",
      render: (text: string) => (
        <span>{members[text]?.name || "Unknown"}</span>  
      ),
    },
    {
      title: "Phone Number",
      dataIndex: "customerId",
      render: (text: string) => (
        <span>{members[text]?.phoneNumber || "Unknown"}</span>  // Sử dụng customerId để tra cứu phoneNumber
      ),
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      render: (text: number) => <span>{text} VND</span>,
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      render: (text: number) => <span>{statusMap[text] || "Unknown"}</span>,
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      render: (text: string) => <span>{new Date(text).toLocaleString()}</span>,
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      render: (text: string) => <span>{new Date(text).toLocaleString()}</span>,
    },

  ];

  return (
    <div className="container">
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '16px' }}>
        Manage Appointments
      </h1>

      <Select
        placeholder="Filter by status"
        onChange={handleStatusFilterChange}
        value={filteredStatus}
        style={{ marginBottom: 16, width: 200 }}
      >
        <Option value={null}>Tất cả các lịch hẹn</Option>
        {Object.entries(statusMap).map(([key, value]) => (
          <Option key={key} value={Number(key)}>
            {value}
          </Option>
        ))}
      </Select>

      <Table
        columns={columns}
        dataSource={paginatedAppointments}
        rowKey="appointmentId"
        loading={loading}
        pagination={false} // Disable table pagination, we'll use custom pagination
      />

      {/* Pagination */}
      <div className="pagination-container" style={{ marginTop: 16 }}>
        <Pagination
          current={currentPage}
          pageSize={appointmentsPerPage}
          total={filteredAppointments.length}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ManagerAppointmentStaff;
