import React, { useEffect, useState } from 'react';
import { getAppointmentsByCustomer } from '../../services/appointmentSalon';
import { Appointment } from '../../models/type'; 

const AppointmentPage = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Appointments</h1>
      {appointments.length > 0 ? (
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment.appointmentId}>
              {/* Display appointment details */}
              Appointment ID: {appointment.appointmentId} - Total Price: {appointment.totalPrice}
            </li>
          ))}
        </ul>
      ) : (
        <p>No appointments found.</p>
      )}
    </div>
  );
};

export default AppointmentPage;
