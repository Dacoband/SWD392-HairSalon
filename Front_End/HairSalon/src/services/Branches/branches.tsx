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

// Update an existing branch by ID
export const updateBranch = async (
  id: string,
  branchData: Branches // Chỉ định là một đối tượng, không phải mảng
): Promise<Branches> => {
  const token = getAuthToken(); // Lấy token xác thực
  const formData = new FormData();

  // Thêm các trường cần thiết vào formData
  formData.append("StaffManagerID", branchData.staffManagerID || "");
  formData.append("SalonBranches", branchData.salonBranches || "");
  formData.append("Address", branchData.address || "");
  formData.append("Phone", branchData.phone || "");

  formData.forEach((value, key) => {
    console.log(`${key}: ${value}`);
  });
  try {
    const response = await axios.put<Branches>(
      `https://api.vol-ka.studio/api/v1/branch/update/${id}`,
      formData, // Gửi dữ liệu như một đối tượng
      {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào headers
          //"Content-Type": "application/json", // Đảm bảo gửi dữ liệu ở định dạng JSON
        },
      }
    );
    return response.data; // Trả về dữ liệu phản hồi
  } catch (error) {
    console.error("Error updating branch:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi
  }
};
// Delete a branch by ID
export const deleteBranch = async (id: string): Promise<void> => {
  const token = getAuthToken();
  try {
    await axios.delete(`https://api.vol-ka.studio/api/v1/branch/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Branch deleted successfully");
  } catch (error) {
    console.error("Error deleting branch:", error);
    throw error;
  }
};
