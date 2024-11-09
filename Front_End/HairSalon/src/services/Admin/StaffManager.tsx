import axios from "axios";
import { getAuthToken } from "../authSalon";
import { StaffManager } from "../../models/type";
export const getStaffAll = async () => {
  const token = getAuthToken();
  const response = await axios.get(
    "https://api.vol-ka.studio/api/v1/staff-manager/all",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const createStaffManager = async (formData: FormData) => {
  const token = getAuthToken();
  for (const [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }
  try {
    const response = await axios.post(
      "https://api.vol-ka.studio/api/v1/staff-manager/add",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};

export const updateStaffManager = async (id: string, formData: FormData) => {
  const token = getAuthToken();
  for (const [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }
  try {
    const response = await axios.patch(
      `https://api.vol-ka.studio/api/v1/staff-manager/update/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data; // Trả về dữ liệu phản hồi
  } catch (error) {
    console.error("Error updating staff manager api:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi
  }
};

export const deleteStaffManager = async (id: string) => {
  const token = getAuthToken();
  const response = await axios.delete(
    `https://api.vol-ka.studio/api/v1/staff-manager/delete/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
export const getStaffWithoutBranch = async (): Promise<StaffManager[]> => {
  try {
    const response = await axios.get<StaffManager[]>(
      "https://api.vol-ka.studio/api/v1/staff-manager/allnotbranch"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching staff managers without branches:", error);
    throw error;
  }
};
