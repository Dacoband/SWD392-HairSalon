import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Input,
  notification,
  message,
  Select,
  Pagination,
} from "antd";
import { getAppointmentsByCustomer, cancelAppointment, getAllAppointments } from "../../services/appointmentSalon";
import { Appointment, Services, Stylish, UserInfoData } from "../../models/type";
import { getStylishByBranchID } from "../../services/Stylish";
import { getMemberById } from "../../services/ProfileAll"; // Import the getMemberById function
import "./AppointmentStaff.scss";

const { Option } = Select;

const ManagerAppointmentStaff = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [services, setServices] = useState<Record<string, Services | null>>({});
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [cancelReason, setCancelReason] = useState("");
  const [api, contextHolder] = notification.useNotification();
  const [stylists, setStylists] = useState<Stylish[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredStatus, setFilteredStatus] = useState<number | null>(null);
  const [members, setMembers] = useState<Record<string, string>>({}); // State to hold member names

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
  
      // Fetch member names separately
      await fetchMemberNames(filteredAppointments);
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
      message.error("Failed to fetch appointments");
    }
  };

  const fetchMemberNames = async (appointments: Appointment[]) => {
    try {
      for (const appointment of appointments) {
        const memberId = appointment.customerId;
        console.log(`Fetching member data for customerId: ${memberId}`);
        const member = await getMemberById(memberId);
        setMembers((prev) => ({
          ...prev,
          [appointment.customerId]: member.MemberName, 
        }));
      }
    } catch (error) {
      console.error("Failed to fetch member names:", error);
      message.error("Failed to fetch member names");
    }
  };
  
  useEffect(() => {
    fetchStylists();
  }, []);

  useEffect(() => {
    if (appointments.length > 0) {
      fetchMemberNames(appointments);
    }
  }, [appointments]); // Ensure member names are fetched when appointments change

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

  return (
    <div className="container position: relative;">
      {contextHolder}

      {/* Status Filter */}
      <Select
        placeholder="Filter by status"
        onChange={handleStatusFilterChange}
        value={filteredStatus} // Set the current selection in the dropdown
        style={{ marginBottom: 16, width: 200 }}
      >
        <Option value={null}>Tất cả các lịch hẹn</Option>
        {Object.entries(statusMap).map(([key, value]) => (
          <Option key={key} value={Number(key)}>
            {value}
          </Option>
        ))}
      </Select>

      {/* Appointment List */}
      {paginatedAppointments.length > 0 ? (
        <ul className="appointment-list">
          {paginatedAppointments.map((appointment) => (
            <li key={appointment.appointmentId} className="appointment-item">
              <div className="appointment-info">
                <strong>Tổng tiền:</strong> {appointment.totalPrice} VND
              </div>
              <div className="appointment-info">
                <strong>Trạng Thái:</strong>
                {statusMap[appointment.status] || "Unknown"}
              </div>
              <div className="appointment-info">
                <strong>Start Time:</strong> {new Date(appointment.startTime).toLocaleString()}
              </div>
              <div className="appointment-info">
                <strong>End Time:</strong> {new Date(appointment.endTime).toLocaleString()}
              </div>

              {/* Display member name */}
              {members[appointment.customerId] && (
                <div className="appointment-info">
                  <strong>Member Name:</strong> {members[appointment.customerId]}
                </div>
              )}

              <div className="appointment-actions">
                {(appointment.status === 1 || appointment.status === 2) && (
                  <Button type="default" danger>
                    Hủy lịch
                  </Button>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Không có lịch hẹn nào.</p>
      )}

      {/* Pagination */}
      <div className="pagination-container" style={{ position: "absolute" }}>
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
