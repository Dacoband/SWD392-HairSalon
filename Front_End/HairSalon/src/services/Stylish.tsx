import axios from "axios";
import { Stylish, Branches  } from "../models/type";
// Base URL for the API
const BASE_URL = 'https://api.vol-ka.studio/api/v1';

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
  const url = `${BASE_URL}/stylist/add-or-update/${stylistId}`;

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
  const url = `${BASE_URL}/stylist/update/${stylistId}`;

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

// Function to delete a stylist by stylist ID
export const deleteStylistById = async (
  stylistId: string,
  token: string
): Promise<void> => {
  const url = `${BASE_URL}/stylist/delete/${stylistId}`;

  try {
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log("Stylist deleted successfully:", response.data);
  } catch (error) {
    console.error("Error deleting stylist:", error);
    throw error; // Re-throw error for higher-level handling
  }
};
export const getBranchId = async (): Promise<Branches[]> => { // Updated return type
  const url = `${BASE_URL}/branch/`;
  try {
    const response = await axios.get<Branches[]>(url); // Updated type
    return response.data;
  } catch (error) {
    console.error("Error fetching branch data:", error);
    throw error; // Handle errors as necessary
  }
};
