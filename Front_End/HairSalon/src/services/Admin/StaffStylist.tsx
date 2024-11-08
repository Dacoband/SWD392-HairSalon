// services/StaffStylist.ts
import axios from "axios";
import { getAuthToken } from "../authSalon";
import { StaffStylist } from "../../models/type";

const API_URL = "https://api.vol-ka.studio/api/v1/staff-stylist";

// Function to fetch all stylists
export const fetchAllStylists = async (): Promise<StaffStylist[]> => {
  const token = getAuthToken(); // Retrieve the token here
  try {
    const response = await axios.get(`${API_URL}/all`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
    return response.data; // Assuming the response data is an array of StaffStylist
  } catch (error) {
    console.error("Error fetching stylists:", error);
    throw error; // Rethrow the error for handling in the component
  }
};
// export const getStylistsWithBranch = async () => {
//   const token = getAuthToken();

//   // Fetch both stylists and branches
//   const [stylistsResponse, branchesResponse] = await Promise.all([
//     axios.get("https://api.vol-ka.studio/api/v1/staff-stylist/all", {
//       headers: { Authorization: `Bearer ${token}` },
//     }),
//     axios.get("https://api.vol-ka.studio/api/v1/branch/all", {
//       headers: { Authorization: `Bearer ${token}` },
//     }),
//   ]);

//   const stylists = stylistsResponse.data;
//   const branches = branchesResponse.data;

//   // Map branches by branchID for easier lookup
//   const branchMap = branches.reduce(
//     (map: Record<string, string>, branch: any) => {
//       map[branch.branchID] = branch.salonBranches;
//       return map;
//     },
//     {}
//   );

//   // Add salonBranches to each stylist
//   return stylists.map((stylist: any) => ({
//     ...stylist,
//     salonBranches: branchMap[stylist.branchId] || "Unknown Branch",
//   }));
// };

export const deleteStylist = async (staffStylistId: string): Promise<void> => {
  const token = getAuthToken(); // Retrieve the token here
  try {
    await axios.delete(
      `https://api.vol-ka.studio/api/v1/staff-stylist/delete/${staffStylistId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      }
    );
    console.log(`Stylist with ID ${staffStylistId} deleted successfully.`);
  } catch (error) {
    console.error(`Error deleting stylist with ID ${staffStylistId}:`, error);
    throw error; // Rethrow the error for handling in the component
  }
};
