import React from "react";

const ManagerAppoimentStylish = () => {
  return (
    <div>
      <p>No user data available</p>
    </div>
  );
};

export default ManagerAppoimentStylish;


// import React, { useEffect, useState } from "react";
// import { Table, notification, Spin } from "antd";
// import { getAppointmentsByStylistId } from "../../services/appointmentSalon"; // Correct path to service
// import { Appointment } from "../../models/type";
// import "../StaffStylish/AppointmentStaff.scss";

// const ManagerAppoimentStylish = ({ stylistId }: { stylistId: string }) => {
//   const [appointments, setAppointments] = useState<Appointment[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       setLoading(true);
//       try {
//         const data = await getAppointmentsByStylistId(stylistId);
//         setAppointments(data);
//       } catch (error) {
//         notification.error({
//           message: "Error",
//           description: "Failed to fetch appointments for the selected stylist.",
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (stylistId) {
//       fetchAppointments();
//     }
//   }, [stylistId]);

//   const columns = [
//     {
//       title: "Appointment ID",
//       dataIndex: "appointmentId",
//     },
//     {
//       title: "Customer ID",
//       dataIndex: "customerId",
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       render: (status: number) => (status === 1 ? "Confirmed" : "Pending"),
//     },
//     {
//       title: "Total Price",
//       dataIndex: "totalPrice",
//     },
//     {
//       title: "Start Time",
//       dataIndex: "startTime",
//     },
//     {
//       title: "End Time",
//       dataIndex: "endTime",
//     },
//   ];

//   return (
//     <div>
//       {loading ? (
//         <Spin size="large" />
//       ) : (
//         <Table dataSource={appointments} columns={columns} rowKey="appointmentId" />
//       )}
//     </div>
//   );
// };

// export default ManagerAppoimentStylish;
