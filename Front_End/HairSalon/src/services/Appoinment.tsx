// service/appointmentApi.ts

import axios from "axios";
import { Appointment } from "../models/type";

const API_URL = "https://api.vol-ka.studio/api/v1/appointment/create";

export const createAppointment = async (
  appointment: Appointment
): Promise<Appointment> => {
  try {
    const response = await axios.post<Appointment>(API_URL, appointment, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating appointment:", error);
    throw error;
  }
};
