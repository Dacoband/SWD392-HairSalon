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
