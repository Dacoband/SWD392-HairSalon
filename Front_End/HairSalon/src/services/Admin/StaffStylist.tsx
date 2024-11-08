// services/StaffStylist.ts
import axios from "axios";
import { getAuthToken } from "../authSalon";

export const getStylistsWithBranch = async () => {
  const token = getAuthToken();

  // Fetch both stylists and branches
  const [stylistsResponse, branchesResponse] = await Promise.all([
    axios.get("https://api.vol-ka.studio/api/v1/staff-stylist/all", {
      headers: { Authorization: `Bearer ${token}` },
    }),
    axios.get("https://api.vol-ka.studio/api/v1/branch/all", {
      headers: { Authorization: `Bearer ${token}` },
    }),
  ]);

  const stylists = stylistsResponse.data;
  const branches = branchesResponse.data;

  // Map branches by branchID for easier lookup
  const branchMap = branches.reduce((map: Record<string, string>, branch: any) => {
    map[branch.branchID] = branch.salonBranches;
    return map;
  }, {});

  // Add salonBranches to each stylist
  return stylists.map((stylist: any) => ({
    ...stylist,
    salonBranches: branchMap[stylist.branchId] || "Unknown Branch",
  }));
};

export const deleteStylist = async (staffStylistId: string) => {
  const token = getAuthToken();
  await axios.delete(`https://api.vol-ka.studio/api/v1/staff-stylist/${staffStylistId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
