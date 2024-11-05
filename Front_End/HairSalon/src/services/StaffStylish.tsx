import axios from "axios";
import { StaffStylish, Stylish } from "../models/type";

// Function to fetch staff stylist by branch ID
export const getStaffStylishByBranchID = async (
  branchId: string
): Promise<StaffStylish[]> => {
  const url = `https://api.vol-ka.studio/api/v1/staff-stylist/branch/${branchId}`;
  try {
    const response = await axios.get<StaffStylish[]>(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching staff stylist data:", error);
    throw error;
  }
};




export const addStylish = async (stylistData: Stylish, token: string): Promise<void> => {
    const url = "https://api.vol-ka.studio/api/v1/stylist/add";
    
    try {
      const response = await axios.post(url, stylistData, {
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token if required
          'Content-Type': 'application/json',
        },
      });
      
      console.log("Stylist added successfully:", response.data);
    } catch (error) {
      console.error("Error adding stylist:", error);
      throw error; // Re-throw error for higher-level handling
    }
  };