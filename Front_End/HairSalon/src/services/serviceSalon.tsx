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
      "https://api.vol-ka.studio/api/v1/service/get-all"
    );
    console.log("ALL SERVICEs:", response.data);
    return response.data as Services[];
  } catch (error) {
    console.error(`Error fetching all services:`, error);
    return [];
  }
};

export const getServicesByServiceId = async (serviceId: string): Promise<Services | null> => {
  try {
    const serviceResponse = await axios.get(
      `https://api.vol-ka.studio/api/v1/service${serviceId}`
    );
    return serviceResponse.data; // Return the service data directly
  } catch (error) {
    console.error("Failed to fetch service details:", error);
    return null; // Return null in case of error
  }
};





