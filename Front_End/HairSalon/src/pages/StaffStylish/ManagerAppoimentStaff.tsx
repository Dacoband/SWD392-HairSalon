import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Input,
  notification,
  message,
  Select,
  Pagination,
} from "antd";
import {
  getAppointmentsByCustomer,
  cancelAppointment,
  getAllAppointments,
  getAppointmentById,
} from "../../services/appointmentSalon";
import {
  Appointment,
  Services,
  Stylish,
  Member,
  Cancellation,
} from "../../models/type";
import { getStylishByBranchID } from "../../services/Stylish";
import { getAppointmentDetails, getMemberById, getAllMember} from "../../services/Member";
import { getCancelAppointmentById } from "../../services/appointmentSalon"; // Update to correct path if needed
import "../StaffStylish/AppointmentStaff.scss";

const { Option } = Select;

const ManagerAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [stylists, setStylists] = useState<Stylish[]>([]);
  const [members, setMembers] = useState<
    Record<string, { name: string; phoneNumber: string }>
  >({});
  const [cancellations, setCancellations] = useState<Record<string, string>>(
    {}
  ); // Map of appointmentId to reason
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
  
      // Call functions without arguments if they don't expect any
      await fetchMemberDetails();
      await fetchCancellations;
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
      message.error("Failed to fetch appointments");
    }
  };
  

  const fetchMemberDetails = async () => {
    try {
      const membersData = await getAllMember();
      const memberDetailsMap = membersData.reduce((acc, member) => {
        acc[member.customerId || member.memberId] = {
          name: member.memberName,
          phoneNumber: member.phoneNumber,
        };
        return acc;
      }, {} as Record<string, { name: string; phoneNumber: string }>);
      setMembers(memberDetailsMap);
    } catch (error) {
      console.error("Failed to fetch member details:", error);
      message.error("Failed to fetch member details");
    }
  };
  


  // Fetch cancellations for each appointment
  const fetchCancellations = async (appointments: Appointment[]) => {
    try {
      const cancellationsMap: Record<string, string> = {};
      const cancellationPromises = appointments.map(async (appointment) => {
        if (appointment.status === 3) {
          // Only fetch if appointment is canceled
          const cancellation = await getCancelAppointmentById(
            appointment.appointmentId
          );
          if (cancellation) {
            cancellationsMap[appointment.appointmentId] = cancellation.reason;
          }
        }
      });
      await Promise.all(cancellationPromises);
      setCancellations(cancellationsMap);
    } catch (error) {
      console.error("Failed to fetch cancellations:", error);
      message.error("Failed to fetch cancellation data");
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

  const filteredList = appointments.filter((appointment: Appointment) =>
    filteredStatus !== null ? appointment.status === filteredStatus : true
  );
  

  const paginatedAppointments = filteredList.slice(
    (currentPage - 1) * appointmentsPerPage,
    currentPage * appointmentsPerPage
  );

  const columns = [
    {
      title: "Member",
      dataIndex: "customerId",
      render: (text: string) => <span>{members[text]?.name || "vô danh"}</span>,
    },
    {
      title: "Số điện thoại",
      dataIndex: "customerId",
      render: (text: number) => (
        <span>{members[text]?.phoneNumber || "Không có"}</span>
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
    {
      title: "Reason for Cancellation",
      dataIndex: "appointmentId",
      render: (appointmentId: string) => (
        <span>{cancellations[appointmentId] || "N/A"}</span>
      ),
    },
  ];

  return (
    <div className="container">
      <h1
        style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "16px" }}
      >
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
        pagination={false}
      />

      <div className="pagination-container" style={{ marginTop: 16 }}>
        <Pagination
          current={currentPage}
          pageSize={appointmentsPerPage}
          total={filteredList.length}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ManagerAppointments;
