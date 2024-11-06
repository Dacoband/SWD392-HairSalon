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
