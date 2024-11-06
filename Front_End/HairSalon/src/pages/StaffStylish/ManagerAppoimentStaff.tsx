import React, { useEffect, useState } from "react";
import { Button, Modal, Input, notification } from "antd";
import {
  getAppointmentsByCustomer,
  cancelAppointment,
  getAllAppointments,
  getServicesByServiceId,
  
} from "../../services/appointmentSalon";
import { Appointment, Services } from "../../models/type";

const ManagerAppointmentStaff = () => {
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

  // Fetch appointments on component mount
  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const response = await getAllAppointments();
        if (Array.isArray(response)) {
          setAppointments(response);
        } else {
          setError("Invalid response format for appointments.");
        }
      } catch (err) {
        setError("Failed to fetch appointments.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Fetch services for each appointment
  useEffect(() => {
    const fetchAllServiceDetails = async () => {
      const newServices: Record<string, Services | null> = {};

      const servicePromises = appointments.flatMap(
        (appointment) =>
          appointment.sevicesList?.map(async (service) => {
            if (service.serviceId && !services[service.serviceId]) {
              try {
                const serviceData = await getServicesByServiceId(
                  service.serviceId
                );
                newServices[service.serviceId] = serviceData;
              } catch {
                console.error(
                  `Failed to fetch service details for ID: ${service.serviceId}`
                );
              }
            }
          }) ?? []
      );

      await Promise.all(servicePromises);
      setServices((prevServices) => ({ ...prevServices, ...newServices }));
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

      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment.appointmentId === selectedAppointment.appointmentId
            ? { ...appointment, status: 3 }
            : appointment
        )
      );
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

  return (
    <div className="container">
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
      <Modal
        title="Xem dịch vụ"
        open={isServiceModalOpen}
        onOk={handleServiceModalOk}
        onCancel={() => setIsServiceModalOpen(false)}
      >
        {selectedAppointment?.sevicesList?.map((service) => (
          <div key={service.serviceId}>
            <strong>{services[service.serviceId]?.serviceName}</strong>
            <p>{services[service.serviceId]?.description}</p>
          </div>
        ))}
      </Modal>
      <Modal
        title="Lý do hủy lịch"
        open={isCancelModalOpen}
        onOk={handleCancelModalOk}
        onCancel={handleCancelModalCancel}
      >
        <Input.TextArea
          placeholder="Nhập lý do hủy"
          value={cancelReason}
          onChange={(e) => setCancelReason(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default ManagerAppointmentStaff;
