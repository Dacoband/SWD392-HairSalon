import axios from "axios";
import { Services } from "../models/type";
export const getServiceByType = async (type: number): Promise<Services[]> => {
  try {
    const response = await axios.get(
      `https://api.hairsalon.vol-ka.studio/api/v1/service/get-all?Type=${type}`
    );
    return response.data as Services[];
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
};



