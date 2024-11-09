import axios from 'axios';
import { StaffStylist } from '../models/type';
import { getAuthToken } from '../services/authSalon'; // Assuming you have a function for token retrieval

// Base URL for the API
const BASE_URL = 'https://api.vol-ka.studio/api/v1';

// Function to delete StaffStylist by ID
export const deleteStaffStylistById = async (staffStylistId: string) => {
  try {
    // Get the authentication token (assuming it's needed for authorization)
    const token = await getAuthToken();

    // Send a DELETE request to the API with the staffStylistId
    const response = await axios.delete(`${BASE_URL}/staff-stylist/delete/${staffStylistId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      }
    });

    // Check if the response is successful
    if (response.status === 200) {
      console.log('Staff Stylist deleted successfully');
      return response.data; // Return the response data (if any)
    } else {
      console.log('Failed to delete Staff Stylist');
      return null;
    }
  } catch (error) {
    // Handle errors
    console.error('Error deleting Staff Stylist:', error);
    return null;
  }
};


// Function to add a new staff stylist
export const addStaffStylish = async (
  formData: FormData
): Promise<StaffStylist> => {
  try {
    // Get the authorization token
    const token = getAuthToken();

    // Prepare the request with authorization headers
    const response = await axios.post(
      `https://api.vol-ka.studio/api/v1/staff-stylist/add`, // Ensure to use the correct URL
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // Make sure it's multipart for file upload
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


export const getStaffStylistIdsByBranchID = async (
  branchId: string
): Promise<string[]> => {
  try {
    const token = getAuthToken();

    const response = await axios.get(
      `https://api.vol-ka.studio/api/v1/staff-stylist/branch/${branchId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Map the response data to retrieve only staffStylistId
    return response.data.map((stylist: StaffStylist) => stylist.staffStylistId);
  } catch (error) {
    console.error("Error fetching staff stylist IDs:", error);
    throw error;
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


