import axios from "axios";
import { Branches } from "../../models/type";
export const getBranchesAll = async (): Promise<Branches[]> => {
  try {
    const response = await axios.get<Branches[]>(
      "https://api.vol-ka.studio/api/v1/branch/all"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching branches:", error);
    throw error;
  }
};

export const getBranchById = async (id: string): Promise<Branches[]> => {
  try {
    const response = await axios.get<Branches[]>(
      `https://api.vol-ka.studio/api/v1/branch/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching branch by ID:", error);
    throw error;
  }
};
