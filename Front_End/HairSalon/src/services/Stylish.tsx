import axios from "axios";
import { Stylish } from "../models/type";

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
