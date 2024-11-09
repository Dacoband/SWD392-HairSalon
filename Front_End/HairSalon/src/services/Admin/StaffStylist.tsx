// services/StaffStylist.ts
import axios from "axios";
import { getAuthToken } from "../authSalon";
import { StaffStylist } from "../../models/type";

const API_URL = "https://api.vol-ka.studio/api/v1/staff-stylist";

// Function to fetch all stylists
export const fetchAllStylists = async (): Promise<StaffStylist[]> => {
  const token = getAuthToken(); // Retrieve the token here
  try {
    const response = await axios.get(`${API_URL}/all`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
    return response.data; // Assuming the response data is an array of StaffStylist
  } catch (error) {
    console.error("Error fetching stylists:", error);
    throw error; // Rethrow the error for handling in the component
  }
};
export const AddStaffStylist = async (formData: FormData) => {
  const token = getAuthToken();
  for (const [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }
  try {
    const response = await axios.post(
      "https://api.vol-ka.studio/api/v1/staff-stylist/add",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteStylist = async (staffStylistId: string): Promise<void> => {
  const token = getAuthToken(); // Retrieve the token here
  try {
    await axios.delete(
      `https://api.vol-ka.studio/api/v1/staff-stylist/delete/${staffStylistId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      }
    );
    console.log(`Stylist with ID ${staffStylistId} deleted successfully.`);
  } catch (error) {
    console.error(`Error deleting stylist with ID ${staffStylistId}:`, error);
    throw error; // Rethrow the error for handling in the component
  }
};
