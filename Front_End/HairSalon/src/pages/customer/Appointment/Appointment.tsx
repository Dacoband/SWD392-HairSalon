import React, { useEffect, useState } from "react";
import { Button, Modal, Input, notification } from "antd";
import {
  getAppointmentsByCustomer,
  cancelAppointment,
} from "../../../services/appointmentSalon";
import { Appointment, Services } from "../../../models/type";
import { getServicesByServiceId } from "../../../services/serviceSalon";

import "./Appointment.scss";

const AppointmentPage = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [services, setServices] = useState<Record<string, Services | null>>({});
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
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

  // Fetch services details for appointments
  useEffect(() => {
    const fetchAllServiceDetails = async () => {
      const newServices: Record<string, Services | null> = {};
      for (const appointment of appointments) {
        if (appointment.sevicesList) {
          for (const service of appointment.sevicesList) {
            if (service.serviceId && !newServices[service.serviceId]) {
              const serviceData = await getServicesByServiceId(
                service.serviceId
              );
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
      {appointments.length > 0 ? (
        <ul className="appointment-list">
          {appointments.map((appointment) => (
            <li key={appointment.appointmentId} className="appointment-item">
              <div className="appointment-info">
                <strong>Tổng thiệt hại:</strong> {appointment.totalPrice} VND
              </div>
              <div className="appointment-info">
                <strong>Trạng Thái:</strong>{" "}
                {statusMap[appointment.status] || "Unknown"}
              </div>
              <div className="appointment-info">
                <strong>Start Time:</strong>{" "}
                {new Date(appointment.startTime).toLocaleString()}
              </div>
              <div className="appointment-info">
                <strong>End Time:</strong>{" "}
                {new Date(appointment.endTime).toLocaleString()}
              </div>
              <div className="appointment-actions">
                <Button
                  type="primary"
                  onClick={() => showServiceModal(appointment)}
                >
                  Xem dịch vụ
                </Button>
                {appointment.status === 1 && (
                  <Button
                    type="default"
                    danger
                    onClick={() => showCancelModal(appointment)}
                  >
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

      {/* Service Modal */}
      <Modal
        title="Chi tiết dịch vụ"
        open={isServiceModalOpen}
        onOk={handleServiceModalOk}
        onCancel={() => setIsServiceModalOpen(false)}
      >
        {selectedAppointment?.sevicesList.map((service) => (
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
              <p>Đang tải thông tin dịch vụ...</p>
            )}
          </div>
        ))}
      </Modal>

      {/* Cancel Modal */}
      <Modal
        title="Hủy lịch hẹn"
        open={isCancelModalOpen}
        onOk={handleCancelModalOk}
        onCancel={handleCancelModalCancel}
      >
        <p>Vui lòng nhập lý do hủy:</p>
        <Input
          value={cancelReason}
          onChange={(e) => setCancelReason(e.target.value)}
          placeholder="Nhập lý do tại đây"
        />
      </Modal>
    </div>
  );
};

export default AppointmentPage;
