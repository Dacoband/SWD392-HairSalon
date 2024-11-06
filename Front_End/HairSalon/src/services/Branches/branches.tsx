import axios from "axios";
import { Branches } from "../../models/type";
import { getAuthToken } from "../authSalon";

export const getBranchesAll = async (): Promise<Branches[]> => {
  const token = getAuthToken();
  try {
    const response = await axios.get<Branches[]>(
      "https://api.vol-ka.studio/api/v1/branch/all",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    // Kiểm tra và xử lý dữ liệu trước khi trả về
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      console.error("Invalid response format:", response.data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching branches:", error);
    throw error;
  }
};

export const getBranchById = async (id: string): Promise<Branches[]> => {
  const token = getAuthToken();
  try {
    const response = await axios.get<Branches[]>(
      `https://api.vol-ka.studio/api/v1/branch/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching branch by ID:", error);
    throw error;
  }
};

export const addBranch = async (branchData: any) => {
  const token = getAuthToken();
  try {
    const response = await axios.post(
      "https://api.vol-ka.studio/api/v1/branch/add",
      branchData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding branch:", error);
    throw error;
  }
};
