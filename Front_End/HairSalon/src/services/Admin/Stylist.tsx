import axios from "axios";
import { getAuthToken } from "../authSalon";
export const getStylist = async () => {
    const token = getAuthToken();
    const response = await axios.get(`https://api.vol-ka.studio/api/v1/stylist/all`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const addStylist = async (data: any) => {
    const token = getAuthToken();
    if (data.dateOfBirth) {
        data.dateOfBirth = data.dateOfBirth.format('YYYY-MM-DD');
    }
    
    const response = await axios.post(
        `https://api.vol-ka.studio/api/v1/staff-stylist/add`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        }
    );
    return response.data;
};

export const deleteStylist = async (id: any) => {
    const token = getAuthToken();
    const response = await axios.delete(
        `https://api.vol-ka.studio/api/v1/stylist/delete/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
    );
    return response.data;
}
