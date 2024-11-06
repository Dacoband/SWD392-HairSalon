import axios from "axios";
import { getAuthToken } from "../authSalon";

export const getStaffAll = async () => {
    const token = getAuthToken();
    const response = await axios.get("https://api.vol-ka.studio/api/v1/staff-manager/all", {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
}

export const createStaffManager = async (formData: FormData) => {
    const token = getAuthToken();
    try {
        const response = await axios.post(
            "https://api.vol-ka.studio/api/v1/staff-manager/add",
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        return response.data;
    } catch (error: any) {
        console.error("API Error:", error.response?.data || error.message);
        throw error;
    }
}

export const updateStaffManager = async (id: string, data: any) => {
    const token = getAuthToken();
    try {
        const response = await axios.patch(
            `https://api.vol-ka.studio/api/v1/staff-manager/update/${id}`, 
            data,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data;
    } catch (error: any) {
        console.error("API Error:", error.response?.data || error.message);
        throw error;
    }
}

export const deleteStaffManager = async (id: string) => {
    const token = getAuthToken();
    const response = await axios.delete(`https://api.vol-ka.studio/api/v1/staff-manager/delete/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
}