import axios from "axios";
import { Appointment} from "../models/type";
export const getAppointmentsByCustomer = async (customerId: string): Promise<Appointment[] | string> => {
  try {
    const response = await axios.get(`https://api.vol-ka.studio/api/v1/appointment/get-all?CustomerId=${customerId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data as Appointment[]; // Return the fetched appointments

  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 403) {
        console.warn("Access forbidden. Response body:", error.response.data);

        // Return the response body when a 403 error occurs
        return error.response.data as string; // Return the response body as a string
      } else {
        console.error("Error fetching appointments:", error);
      }
    } else {
      console.error("Unexpected error:", error);
    }

    throw new Error("Failed to fetch appointments");
  }
};
  export const cancelAppointment = async (appointmentId: string, reason: string) => {
    try {
      const response = await axios.post(
        `https://api.vol-ka.studio/api/v1/cancel-appointment/create`,
        {
          appointmentId,
          reason,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error canceling appointment:", error);
      throw new Error("Failed to cancel appointment");
    }
  };