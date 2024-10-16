import axios from "axios";
import { Services } from "../models/type";
export const getServicesByType = async (type: number): Promise<Services[]> => {
  try {
    const response = await axios.get(
      `https://api.vol-ka.studio/api/v1/service/get-all?Type=${type}`
    );
    return response.data; // Giả sử API trả về danh sách dịch vụ
  } catch (error) {
    console.error(`Error fetching services of type ${type}:`, error);
    return [];
  }
};
export const getAllServices = async (): Promise<Services[]> => {
  try {
    const response = await axios.get(
      "https://api.hairsalon.vol-ka.studio/api/v1/service/get-all"
    );
    return response.data as Services[];
  } catch (error) {
    console.error("Error fetching all services:", error);
    return [];
  }
};
