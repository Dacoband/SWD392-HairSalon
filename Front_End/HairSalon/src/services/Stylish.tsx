import axios from "axios";
import { Stylish } from "../models/type";

// Base URL for the API
const BASE_URL = "https://api.vol-ka.studio/api/v1";

// Function to get a stylist by ID
export const getStylishById = async (stylistId: string): Promise<Stylish> => {
  try {
    const response = await axios.get(`${BASE_URL}/stylist/${stylistId}`);
    return response.data as Stylish;
  } catch (error) {
    console.error("Error fetching stylist by ID:", error);
    throw new Error("Failed to fetch stylist by ID");
  }
};

// Function to get all stylists
export const getAllStylish = async (): Promise<Stylish[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/stylist/all`);
    return response.data as Stylish[];
  } catch (error) {
    console.error("Error fetching all stylists:", error);
    throw new Error("Failed to fetch all stylists");
  }
};


export const getStylishByBranchID = async (
  branchId: string
): Promise<Stylish[]> => {
  const url = `https://api.vol-ka.studio/api/v1/stylist/branch/${branchId}`;
  try {
    const response = await axios.get<Stylish[]>(url);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
    throw error;
  }
};
export const getStylistByID = async (stylistId: string) : Promise<Stylish> => {
  try {
    const response = await axios.get<Stylish>(`https://api.vol-ka.studio/api/v1/stylist/${stylistId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching stylist details:", error);
    throw error;
  }
};

export const getStylishRandom = async (
  branchId: string
): Promise<Stylish[]> => {
  const url = `https://api.vol-ka.studio/api/v1/stylist/random-branch/${branchId}`;
  try {
    const response = await axios.get<Stylish[]>(url);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
    throw error;
  }
};


// Function to add a stylist or update if exists by stylist ID
export const addStylishById = async (
  stylistId: string,
  stylistData: Stylish,
  token: string
): Promise<void> => {
  const url = `https://api.vol-ka.studio/api/v1/stylist/add`;

  try {
    const response = await axios.put(url, stylistData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log("Stylist added or updated successfully:", response.data);
  } catch (error) {
    console.error("Error adding or updating stylist:", error);
    throw error; // Re-throw error for higher-level handling
  }
};

// Function to update stylist information by stylist ID
export const updateStylistById = async (
  stylistId: string,
  stylistData: Stylish,
  token: string
): Promise<void> => {
  const url = `https://api.vol-ka.studio/api/v1/stylist/update/${stylistId}`;

  try {
    const response = await axios.put(url, stylistData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log("Stylist updated successfully:", response.data);
  } catch (error) {
    console.error("Error updating stylist:", error);
    throw error; // Re-throw error for higher-level handling
  }
};

export const deleteStylistById = async (
  stylistId: string,
  token: string
): Promise<string> => {  // Returning a message or status as a string
  const url = `https://api.vol-ka.studio/api/v1/stylist/delete/${stylistId}`;

  try {
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      console.log("Stylist deleted successfully:", response.data);
      return "Stylist deleted successfully";  // Return success message
    } else {
      console.warn("Unexpected response status:", response.status);
      return `Error: Unexpected status ${response.status}`;
    }
  } catch (error: any) {
    // Check if it's an Axios error with a response
    if (error.response) {
      console.error("Error deleting stylist:", error.response.data);
      return `Error deleting stylist: ${error.response.data.message || error.response.data}`;
    } else if (error.request) {
      console.error("No response received:", error.request);
      return "Error deleting stylist: No response from the server.";
    } else {
      console.error("Error:", error.message);
      return `Error: ${error.message}`;
    }
  }
};
