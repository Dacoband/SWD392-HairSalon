import React, { useEffect, useState } from "react";
import { Button, Modal, Input, notification, Collapse  } from "antd";
import { getAppointmentsByCustomer, cancelAppointment } from "../../../services/appointmentSalon";
import { Appointment, Services } from "../../../models/type";
import { getServicesByServiceId } from "../../../services/serviceSalon";
import { getBranchById } from "../../../services/Branches/branches"; 
import { getStylistByID } from "../../../services/Stylish"; 

import "./Appointment.scss";

const { Panel } = Collapse;

const AppointmentPage = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [services, setServices] = useState<Record<string, Services | null>>({});
  const [stylistDetails, setStylistDetails] = useState<any>(null);  // To store stylist details
  const [branchDetails, setBranchDetails] = useState<any>(null);  // To store branch details
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [cancelReason, setCancelReason] = useState("");
  const [api, contextHolder] = notification.useNotification();

  const statusMap: { [key: number]: string } = {
    1: "Đã đặt lịch thành công",
    2: "Đã thanh toán",
    3: "Đã hủy",
    4: "Đã hoàn thành",
  };

  // Fetch appointments when component mounts
  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const userDataString = localStorage.getItem("userData");
        const userData = userDataString ? JSON.parse(userDataString) : null;

        if (userData && userData.actorId) {
          const customerId = userData.actorId;
          const response = await getAppointmentsByCustomer(customerId);

          if (Array.isArray(response)) {
            setAppointments(response);
          } else {
            setError(response);
            console.log(error);
          }
        } else {
          setError("User ID not found in localStorage.");
        }
      } catch (err) {
        setError("Không tìm thấy cuộc hẹn nào!");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Fetch stylist and branch details for appointments
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Fetch Stylist Details
        const stylistResponse = await getStylistByID("d1a63381-1b20-435d-8253-8490ebf65785");
        setStylistDetails(stylistResponse);

        // Fetch Branch Details
        const branchResponse = await getBranchById("af638270-05e0-48b6-b47b-9fde0b937151");
        setBranchDetails(branchResponse);
      } catch (error) {
        console.error("Error fetching stylist or branch details:", error);
      }
    };

    fetchDetails();
  }, []);

  // Fetch services details for appointments
  useEffect(() => {
    const fetchAllServiceDetails = async () => {
      const newServices: Record<string, Services | null> = {};
      for (const appointment of appointments) {
        if (appointment.sevicesList) {
          for (const service of appointment.sevicesList) {
            if (service.serviceId && !newServices[service.serviceId]) {
              const serviceData = await getServicesByServiceId(service.serviceId);
              newServices[service.serviceId] = serviceData;
            }
          }
        }
      }
      setServices(newServices);
    };

    if (appointments.length > 0) {
      fetchAllServiceDetails();
    }
  }, [appointments]);

  const showServiceModal = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsServiceModalOpen(true);
  };

  const showCancelModal = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsCancelModalOpen(true);
  };

  const handleServiceModalOk = () => {
    setIsServiceModalOpen(false);
    setSelectedAppointment(null);
  };

  const handleCancelModalOk = async () => {
    if (!selectedAppointment) return;

    try {
      await cancelAppointment(selectedAppointment.appointmentId, cancelReason);
      api.success({
        message: "Hủy thành công",
        description: "Lịch hẹn đã được hủy thành công.",
      });

      const userDataString = localStorage.getItem("userData");
      const userData = userDataString ? JSON.parse(userDataString) : null;

      if (userData && userData.actorId) {
        const customerId = userData.actorId;
        const response = await getAppointmentsByCustomer(customerId);
        if (Array.isArray(response)) {
          setAppointments(response);
        } else {
          setError("Invalid response format for appointments.");
        }
      }
    } catch (error) {
      api.error({
        message: "Lỗi hủy",
        description: "Đã có lỗi xảy ra khi hủy lịch hẹn.",
      });
    } finally {
      setIsCancelModalOpen(false);
      setSelectedAppointment(null);
      setCancelReason("");
    }
  };

  const handleCancelModalCancel = () => {
    setIsCancelModalOpen(false);
    setSelectedAppointment(null);
    setCancelReason("");
  };

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    const formattedDate = date.toLocaleDateString("vi-VN"); // Vietnamese date format
    const formattedTime = `${date.getHours()}:${date.getMinutes() < 10 ? "0" : ""}${date.getMinutes()}`;
    return { formattedDate, formattedTime };
  };

  if (loading) return <p>Loading...</p>;
  if (error) return (
    <div className="error-messageinAppointment">
      <p>{error}</p>
    </div>
  );
  return (
    <div className="container">
      <h1 className="heading">Lịch hẹn của bạn</h1>
      {contextHolder}

      {/* If there are appointments, show them using Collapse */}
      {appointments.length > 0 ? (
        <Collapse accordion>
          {appointments.map((appointment) => {
            const { formattedDate, formattedTime } = formatDateTime(appointment.startTime);
            const branchName = branchDetails ? branchDetails.salonBranches : "N/A";
            const address = branchDetails ? branchDetails.address : "N/A";
            const stylistName = stylistDetails ? stylistDetails.stylistName : "N/A";
            const totalAmount = appointment.totalPrice || 0;
            const status = statusMap[appointment.status] || "Chưa xác định";

            return (
              <Panel
              className=""
                key={appointment.appointmentId}
                header={
                  <div className="table-header" style={{ fontWeight: 300, padding: "20px 0", lineHeight: "1.6", fontFamily: 'Arial, sans-serif' }}>
                  <div className="header-text" style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px", fontSize: "16px", color: "#333" }}>
                    <p style={{ fontWeight: "bold" }}><span style={{ color: "#444" }}>Bạn đã book lịch tại:</span> <span style={{ color: "#0056b3" }}>{branchName}</span></p>
                    <p style={{ fontWeight: "bold" }}><span style={{ color: "#444" }}>Tên Stylist:</span> <span style={{ color: "#0056b3" }}>{stylistName}</span></p>
                  </div>
                
                  <div className="header-text" style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px", fontSize: "16px", color: "#333" }}>
                    <p style={{ fontWeight: "bold" }}><span style={{ color: "#444" }}>Tổng thiệt hại:</span> <span style={{ color: "#f39c12" }}>{totalAmount} VND</span></p>
                    <p style={{ fontWeight: "bold" }}><span style={{ color: "#444" }}>Trạng thái cuộc hẹn:</span> <span style={{ color: status === 'Completed' ? "#2ecc71" : "#e74c3c" }}>{status}</span></p>
                  </div>
                
                  <div className="header-text" style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px", fontSize: "16px", color: "#333" }}>
                    <p style={{ fontWeight: "bold" }}><span style={{ color: "#444" }}>Ngày:</span> <span style={{ color: "#9b59b6" }}>{formattedDate}</span></p>
                    <p style={{ fontWeight: "bold" }}><span style={{ color: "#444" }}>Thời gian:</span> <span style={{ color: "#9b59b6" }}>{formattedTime} - {formattedTime}</span></p>
                  </div>
                
                  <div className="header-text" style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px", fontSize: "16px", color: "#333" }}>
                    <p style={{ fontWeight: "bold" }}><span style={{ color: "#444" }}>Địa chỉ tại:</span> <span style={{ color: "#2980b9" }}>{address}</span></p>
                  </div>
                </div>
                }
       
                extra={null}  
              >
                {/* Services list inside panel */}
                {appointment.sevicesList ? (
                  <div>
                    {appointment.sevicesList.map((service) => (
                      <div key={service.serviceId} className="service-info">
                        {services[service.serviceId] ? (
                          <>
                            <p>
                              <strong>Dịch vụ:</strong>{" "}
                              {services[service.serviceId]?.serviceName}
                            </p>
                            <p>
                              <strong>Giá dịch vụ:</strong>{" "}
                              {services[service.serviceId]?.price} VND
                            </p>
                            <p>
                              <strong>Thời gian làm:</strong>{" "}
                              {services[service.serviceId]?.duration} Phút
                            </p>
                          </>
                        ) : (
                          <p>Loading service details...</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No services available</p>
                )}

                {/* Buttons on the bottom-right */}
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
                  <Button onClick={() => showCancelModal(appointment)} style={{ marginRight: "10px" }} danger>
                    Hủy lịch
                  </Button>
                  <Button onClick={() => showServiceModal(appointment)}>Xem dịch vụ</Button>
                </div>
              </Panel>
            );
          })}
        </Collapse>
      ) : (
        <p>No appointments found</p>
      )}

      {/* Cancel Modal */}
      <Modal
        title="Hủy lịch hẹn"
        open={isCancelModalOpen}
        onOk={handleCancelModalOk}
        onCancel={handleCancelModalCancel}
      >
        <p>Nhập lý do hủy lịch hẹn:</p>
        <Input.TextArea
          rows={4}
          value={cancelReason}
          onChange={(e) => setCancelReason(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default AppointmentPage;
