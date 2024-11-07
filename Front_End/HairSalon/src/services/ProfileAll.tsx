import axios from 'axios';
import { UserInfoData } from '../models/type';

export const fetchUserData = async (userId: string, email: string, role: string): Promise<UserInfoData> => {
  let response;
  let name;

  switch (role) {
    case "MB":
      response = await axios.get(`https://api.vol-ka.studio/api/v1/member/${userId}`);
      name = response.data.memberName;
      break;
    case "ST":
      response = await axios.get(`https://api.vol-ka.studio/api/v1/staff-stylist/${userId}`);
      name = response.data.staffStylistName;
      break;
    case "SM":
      response = await axios.get(`https://api.vol-ka.studio/api/v1/staff-manager/${userId}`);
      name = response.data.staffManagerName;
      break;
    case "SL":
      response = await axios.get(`https://api.vol-ka.studio/api/v1/stylist/${userId}`);
      name = response.data.stylistName;
      break;
    default:
      throw new Error(`Unsupported role: ${role}`);
  }

  const data = response.data;
  return {
    email: email,
    password: '',  
    memberName: name,
    dateOfBirth: data.dateOfBirth,
    phoneNumber: data.phoneNumber,
    address: data.address,
    branchId: data.branchID,
    avatarImage: data.avatarImage,
  };
};

export const updateMemberData = async (userId: string, updatedData: Partial<UserInfoData>, role: string): Promise<boolean> => {
  console.log(updatedData); 
  try {
    let responseData;
    const formData = new FormData();

    // Add relevant fields to the formData object
    if (updatedData.dateOfBirth) formData.append('dateOfBirth', updatedData.dateOfBirth);
    if (updatedData.phoneNumber) formData.append('phoneNumber', updatedData.phoneNumber);
    if (updatedData.address) formData.append('address', updatedData.address);
    if (updatedData.branchId && role !== "MB") formData.append('branchId', updatedData.branchId);

    // Handle avatarImage field (if updated)
    if (updatedData.avatarImage) {
      if (updatedData.avatarImage instanceof File) {
        formData.append('avatarImage', updatedData.avatarImage);
      } else {
        const response = await fetch(updatedData.avatarImage, { mode: 'no-cors' });
        const blob = await response.blob();
        const file = new File([blob], 'avatarImage.jpg', { type: blob.type });
        formData.append('avatarImage', file);
      }
    }

    if (updatedData.memberName) {
   
      switch (role) {
        case "MB":
          console.log(updatedData.memberName);
          formData.append('MemberName', updatedData.memberName);
          break;
        case "ST":
          console.log(updatedData.memberName);
          formData.append('StaffStylistName', updatedData.memberName);
          break;
        case "SM":
          formData.append('StaffManagerName', updatedData.memberName);
          break;
        case "SL":
          formData.append('StylistName', updatedData.memberName);
          break;
        default:
          throw new Error(`Unsupported role for member name update: ${role}`);
      }
    }

    switch (role) {
      case "MB":
        responseData = await axios.put(`https://api.vol-ka.studio/api/Member/${userId}`, formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
break;
     
      case "ST":
        formData.forEach((value, key) => {
          if (key === 'staffStylistName') {
            console.log('staffStylistName:', value);
          }else  console.log('bad');
        });
        responseData = await axios.put(`https://api.vol-ka.studio/api/v1/staff-stylist/update/${userId}`, formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
break;
      case "SM":
        responseData = await axios.patch(`https://api.vol-ka.studio/api/v1/staff-manager/update/${userId}`, formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        break;
      case "SL":
        responseData = await axios.put(`https://api.vol-ka.studio/api/v1/stylist/update/${userId}`, formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        break;
      default:
        throw new Error(`Unsupported role: ${role}`);
    }

    return responseData.status >= 200 && responseData.status < 300;
    
  } catch (error) {
    console.error('Error updating user data:', error);
    return false;  
  }
};


// In ProfileAll.tsx (or wherever getMemberById is defined)
export const getMemberById = async (customerId: string) => {
  try {
    const response = await axios.get(`https://api.vol-ka.studio/api/v1/member/${customerId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching member by ID:", error);
    throw error;
  }
};
