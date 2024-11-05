import axios from "axios";
import { StaffStylish, Stylish } from "../models/type";

// Base URL for the API
const BASE_URL = 'https://api.vol-ka.studio/api/v1';

// Function to fetch staff stylist by branch ID
export const getStaffStylishByBranchID = async (
  branchId: string
): Promise<StaffStylish[]> => {
  const url = `${BASE_URL}/staff-stylist/branch/${branchId}`;
  try {
    const response = await axios.get<StaffStylish[]>(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching staff stylist data:", error);
    throw error; // Consider handling specific error cases here
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
