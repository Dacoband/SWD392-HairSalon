import axios from "axios";
import { Appointment, Cancellation } from "../models/type";
import { getAuthToken } from "../services/authSalon"; // assuming this function exists to retrieve auth token

const BASE_URL = "https://api.vol-ka.studio/api/v1"; // replace with the correct base URL if different

export const getAppointmentsByStylistId = async (stylistId: string): Promise<Appointment[]> => {
  try {
    const response = await axios.get(
      `https://api.vol-ka.studio/api/v1/appointment/get-all`, // Replace with correct endpoint if needed
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          stylistId, // Send stylistId as query parameter
        },
      }
    );

    return response.data as Appointment[];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 403) {
        console.warn("Access forbidden. Response body:", error.response.data);
        throw new Error("Access forbidden.");
      } else {
        console.error("Error fetching appointments for stylist:", error.message);
      }
    } else {
      console.error("Unexpected error:", error);
    }
    throw new Error("Failed to fetch appointments");
  }
};



export const getAllAppointments = async (): Promise<Appointment[]> => {
  try {
    const response = await axios.get(
      `https://api.vol-ka.studio/api/v1/appointment/get-all`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return response.data as Appointment[];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 403) {
        console.warn("Access forbidden. Response body:", error.response.data);
        throw new Error("Access forbidden.");
      } else {
        console.error("Error fetching all appointments:", error.message);
      }
    } else {
      console.error("Unexpected error:", error);
    }
    throw new Error("Failed to fetch all appointments");
  }
};




export const getCancelAppointmentById = async (cancellationId: string): Promise<Cancellation | null> => {
  try {
    const token = getAuthToken(); // Retrieve the authentication token if necessary
    const response = await axios.get(`https://api.vol-ka.studio/api/v1/cancel-appointment/get-by-appointment/${cancellationId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data as Cancellation;
  } catch (error) {
    console.error("Error fetching cancellation data:", error);
    return null; // Return null or handle the error as needed
  }
};


export const getAppointmentById = async (appointmentId: string): Promise<Appointment | null> => {
  try {
    const response = await axios.get<Appointment>(`https://api.vol-ka.studio/api/v1/appointment${appointmentId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching appointment by ID:", error);
    return null;
  }
};


export const getAppointmentsByCustomer = async (customerId: string): Promise<Appointment[] | string> => {
  try {
    const response = await axios.get(`https://api.vol-ka.studio/api/v1/appointment/get-all?CustomerId=${customerId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data as Appointment[]; 

  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 403) {
        console.warn("Access forbidden. Response body:", error.response.data);

        return error.response.data as string; 
      } else if (error.response && error.response.status === 404) {
        return error.response.data as string;
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

