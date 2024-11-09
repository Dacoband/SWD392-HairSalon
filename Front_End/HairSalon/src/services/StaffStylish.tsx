import axios from 'axios';
import { StaffStylist } from '../models/type';
import { getAuthToken } from '../services/authSalon'; // Assuming you have a function for token retrieval

// Base URL for the API
const BASE_URL = 'https://api.vol-ka.studio/api/v1';

// Function to get staff stylist by ID
export const getStaffStylistById = async (staffStylistId: string): Promise<StaffStylist | null> => {
  try {
    const token = getAuthToken(); // Retrieve the auth token if necessary
    const response = await axios.get(`https://api.vol-ka.studio/api/v1/staff-stylist/${staffStylistId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching staff stylist:", error);
    return null; // Return null or handle the error accordingly
  }
};
export const getStaffAll = async () => {
  const token = getAuthToken();
  const response = await axios.get("https://api.vol-ka.studio/api/v1/staff-stylist/all", {
      headers: {
          'Authorization': `Bearer ${token}`
      }
  });
  return response.data;
}

export const updateStaffStylishById = async (id: string, data: any) => {
  const token = getAuthToken();
  try {
      const response = await axios.patch(
          `https://api.vol-ka.studio/api/v1/staff-stylist/update/${id}`, 
          data,
          {
              headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
              }
          }
      );
      return response.data;
  } catch (error: any) {
      console.error("API Error:", error.response?.data || error.message);
      throw error;
  }
}


// Function to add a new staff stylist
export const addStaffStylish = async (
  formData: FormData
): Promise<StaffStylist> => {
  try {
    // Get the authorization token
    const token = getAuthToken();

    // Prepare the request with authorization headers
    const response = await axios.post(
      `https://api.vol-ka.studio/api/v1/staff-stylist/add`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Return the added staff stylist data
    return response.data;
  } catch (error) {
    console.error("Error adding new staff stylist:", error);
    throw error;
  }
};

// Function to get staff stylists by branch ID
export const getStaffStylistByBranchID = async (
  branchId: string
): Promise<StaffStylist[]> => {
  try {
    // Get authorization token
    const token = getAuthToken();

    // Make the API request
    const response = await axios.get(
      `https://api.vol-ka.studio/api/v1/staff-stylist/branch/${branchId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Return the staff stylist data
    return response.data as StaffStylist[];
  } catch (error) {
    console.error("Error fetching staff stylists:", error);
    throw error;
  }
};

// export const deleteStaffStylishById =
