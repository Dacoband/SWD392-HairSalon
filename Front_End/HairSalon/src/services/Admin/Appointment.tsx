import axios from "axios";
import { getAuthToken } from "../authSalon";

export const getAppointments = async () => {
  const token = getAuthToken();
  const response = await axios.get(
    "https://api.vol-ka.studio/api/v1/appointment/get-all",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getMembers = async () => {
  const token = getAuthToken();
  const response = await axios.get(
    "https://api.vol-ka.studio/api/v1/member/all",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getStylists = async () => {
  const token = getAuthToken();
  const response = await axios.get(
    "https://api.vol-ka.studio/api/v1/stylist/all",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Hàm kết hợp dữ liệu
export const getAppointmentsWithDetails = async () => {
  try {
    const [appointments, members, stylists] = await Promise.all([
      getAppointments(),
      getMembers(),
      getStylists(),
    ]);

    // Tạo map để ánh xạ ID với tên
    const memberMap = new Map(
      members.map((member: any) => [member.memberId, member.memberName])
    );
    const stylistMap = new Map(
      stylists.map((stylist: any) => [stylist.stylistId, stylist.stylistName])
    );

    // Kết hợp dữ liệu với appointments
    const appointmentsWithDetails = appointments.map((appointment: any) => ({
      ...appointment,
      memberName: memberMap.get(appointment.customerId) || "Unknown",
      stylistName: stylistMap.get(appointment.stylistId) || "Unknown",
    }));

    return appointmentsWithDetails;
  } catch (error) {
    console.error("Error fetching appointments, members, or stylists:", error);
    throw error;
  }
};
