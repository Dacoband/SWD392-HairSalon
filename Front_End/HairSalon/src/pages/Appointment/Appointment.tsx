import React, { useEffect, useState } from 'react';
import { getAppointmentsByCustomer } from '../../services/appointmentSalon';
import { Appointment, Services } from '../../models/type'; 
import axios from "axios";
import './Appointment.scss';

const AppointmentPage = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [services, setServices] = useState<Record<string, Services | null>>({});

  const statusMap: { [key: number]: string } = {
    1: 'Đang chờ xử lý',
    2: 'Chấp nhận',
    3: 'Bị hủy',
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const customerId = '30ea5b87-6e4a-43c9-bec4-54dfd821d8ba';      
        const response = await getAppointmentsByCustomer(customerId);
        setAppointments(response);
      } catch (err) {
        setError('Failed to fetch appointments.');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  useEffect(() => {
    
    const fetchServiceDetails = async (serviceId: string) => {
      try {
        const serviceResponse = await axios.get(
          `https://api.vol-ka.studio/api/v1/service${serviceId}`
        );
        const serviceData = serviceResponse.data;
        setServices((prevServices) => ({
          ...prevServices,
          [serviceId]: serviceData,
        }));
      } catch (error) {
        console.error('Failed to fetch service details:', error);
        setServices((prevServices) => ({
          ...prevServices,
          [serviceId]: null,
        }));
      }
    };

  
    appointments.forEach((appointment) => {
      appointment.appointmentService.forEach((service) => {
        if (service.serviceId && !services[service.serviceId]) {
          fetchServiceDetails(service.serviceId);
        }
      });
    });
  }, [appointments, services]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <h1 className="heading">Lịch hẹn của bạn</h1>
      {appointments.length > 0 ? (
        <ul className="appointment-list">
          {appointments.map((appointment) => (
            <li key={appointment.appointmentId} className="appointment-item">
              {/* <div className="appointment-info">
                <strong>Appointment ID:</strong> {appointment.appointmentId}
              </div> */}
              <div className="appointment-info">
                <strong>Tổng thiệt hại:</strong> {appointment.totalPrice}
              </div>
              <div className="appointment-info">
                <strong>Trạng Thái:</strong> {statusMap[appointment.status] || 'Unknown'}
              </div>
              <div className="service-info">
              {appointment.appointmentService.map((service) => (
                <div key={service.serviceId} className="service-info">
                  {services[service.serviceId] ? (
                    <>
                      <p><strong>Dịch vụ:</strong> {services[service.serviceId]?.serviceName}</p>
                      <p><strong>Giá dịch vụ:</strong> {services[service.serviceId]?.price} VND</p>
                      <p><strong>Thời gian làm:</strong> {services[service.serviceId]?.duration} Phút</p>
                    </>
                  ) : (
                    <p>Loading service information...</p>
                  )}
                </div>
              ))}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No appointments found.</p>
      )}
    </div>
  );
};


const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '20px',
    textAlign: 'center',
  },
  appointmentList: {
    listStyleType: 'none',
    padding: 0,
  },
  appointmentItem: {
    backgroundColor: '#f9f9f9',
    padding: '15px',
    marginBottom: '15px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  appointmentInfo: {
    marginBottom: '10px',
  },
  serviceInfo: {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#e0f7fa',
    borderRadius: '6px',
  },
};

export default AppointmentPage;
