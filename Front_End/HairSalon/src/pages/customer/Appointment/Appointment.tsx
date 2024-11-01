import React, { useEffect, useState } from "react";
import { Button, Modal, Input, notification } from "antd";
import { getAppointmentsByCustomer, cancelAppointment } from "../../../services/appointmentSalon";
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
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [cancelReason, setCancelReason] = useState("");
  const [api, contextHolder] = notification.useNotification();

  const statusMap: { [key: number]: string } = {
    1: "Book lịch thành công",
    2: "Đã thanh toán",
    3: "Bị hủy",
    4: "Đã hoàn thành",
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const customerId = "4042dcad-d98f-480e-9a50-0a1670338b17";
        const response = await getAppointmentsByCustomer(customerId);
        setAppointments(response);
      } catch (err) {
        setError("Failed to fetch appointments.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  useEffect(() => {
    const fetchAllServiceDetails = async () => {
      for (const appointment of appointments) {
        if (appointment.sevicesList) {
          for (const service of appointment.sevicesList) {
            if (service.serviceId && !services[service.serviceId]) {
              const serviceData = await getServicesByServiceId(service.serviceId);
              setServices((prevServices) => ({
                ...prevServices,
                [service.serviceId]: serviceData,
              }));
            }
          }
        }
      }
    };

    fetchAllServiceDetails();
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
        message: "Cancellation Success",
        description: "The appointment has been canceled successfully.",
      });

      
      const customerId = "409e0432-1795-4b1d-b206-e8e85eceacda"; 
      const response = await getAppointmentsByCustomer(customerId);
      setAppointments(response);
      
    } catch (error) {
      api.error({
        message: "Cancellation Error",
        description: "There was an error canceling the appointment.",
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
  if (error) return <p>{error}</p>;

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
                <Button type="primary" onClick={() => showServiceModal(appointment)}>
                  View Services
                </Button>
                {appointment.status === 1 && (
                  <Button type="default" danger onClick={() => showCancelModal(appointment)}>
                    Cancel Appointment
                  </Button>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No appointments found.</p>
      )}

      {/* Service Modal */}
      <Modal
        title="Services Details"
        open={isServiceModalOpen}
        onOk={handleServiceModalOk}
        onCancel={() => setIsServiceModalOpen(false)}
      >
        {selectedAppointment?.sevicesList.map((service) => (
          <div key={service.serviceId} className="service-info">
            {services[service.serviceId] ? (
              <>
                <p>
                  <strong>Dịch vụ:</strong> {services[service.serviceId]?.serviceName}
                </p>
                <p>
                  <strong>Giá dịch vụ:</strong> {services[service.serviceId]?.price} VND
                </p>
                <p>
                  <strong>Thời gian làm:</strong> {services[service.serviceId]?.duration} Phút
                </p>
              </>
            ) : (
              <p>Loading service information...</p>
            )}
          </div>
        ))}
      </Modal>

      {/* Cancel Modal */}
      <Modal
        title="Cancel Appointment"
        open={isCancelModalOpen}
        onOk={handleCancelModalOk}
        onCancel={handleCancelModalCancel}
      >
        <p>Please enter the reason for cancellation:</p>
        <Input
          value={cancelReason}
          onChange={(e) => setCancelReason(e.target.value)}
          placeholder="Enter reason here"
        />
      </Modal>
    </div>
  );
};

export default AppointmentPage;
