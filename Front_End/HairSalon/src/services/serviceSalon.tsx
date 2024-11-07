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


// Function to add a new service
export const addService = async (serviceData: Services): Promise<Services | null> => {
  try {
    const response = await axios.post(
      "https://api.vol-ka.studio/api/v1/service/add/",
      serviceData
    );
    return response.data; // Return the added service data
  } catch (error) {
    console.error("Error adding service:", error);
    return null; // Return null in case of error
  }
};

// Function to update a service by ID
export const updateServiceById = async (serviceId: string, serviceData: Services): Promise<Services | null> => {
  try {
    const response = await axios.put(
      `https://api.vol-ka.studio/api/v1/service/update/${serviceId}`,
      serviceData
    );
    return response.data; // Return the updated service data
  } catch (error) {
    console.error(`Error updating service with ID ${serviceId}:`, error);
    return null; // Return null in case of error
  }
};

// Function to delete a service by ID
export const deleteServiceById = async (serviceId: string): Promise<boolean> => {
  try {
    await axios.delete(`https://api.vol-ka.studio/api/v1/service/delete/${serviceId}`);
    return true; // Return true if the deletion was successful
  } catch (error) {
    console.error(`Error deleting service with ID ${serviceId}:`, error);
    return false; // Return false in case of error
  }
};







