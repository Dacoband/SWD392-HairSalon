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

// Add a new branch
export const addBranch = async (branch: Branches): Promise<Branches> => {
  try {
    const response = await axios.post<Branches>(
      "https://api.vol-ka.studio/api/v1/branch/add",
      branch
    );
    return response.data;
  } catch (error) {
    console.error("Error adding branch:", error);
    throw error;
  }
};

// Update an existing branch by ID
export const updateBranch = async (
  id: string,
  branch: Partial<Branches>
): Promise<Branches> => {
  try {
    const response = await axios.put<Branches>(
      `https://api.vol-ka.studio/api/v1/branch/update/${id}`,
      branch
    );
    return response.data;
  } catch (error) {
    console.error("Error updating branch:", error);
    throw error;
  }
};

// Delete a branch by ID
export const deleteBranch = async (id: string): Promise<void> => {
  try {
    await axios.delete(`https://api.vol-ka.studio/api/v1/branch/delete/${id}`);
    console.log("Branch deleted successfully");
  } catch (error) {
    console.error("Error deleting branch:", error);
    throw error;
  }
};
