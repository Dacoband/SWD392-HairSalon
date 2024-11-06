import axios from 'axios';

import { UserInfoData } from '../models/type'; 


export const fetchUserData = async (userId: string, email : string, role : string): Promise<UserInfoData> => {
  let response, name;

  switch (role) {
    case "MB":
      response = await axios.get('https://api.vol-ka.studio/api/v1/member/'+ userId);
      name = response.data.memberName;
      break;
    case "SL":
      response = await axios.get('https://api.vol-ka.studio/api/v1/staff-stylist/'+ userId);
      name = response.data.staffStylistName;
        break;  
    case "SM":
      response = await axios.get('https://api.vol-ka.studio/api/v1/staff-manager/'+ userId);
      name = response.data.staffManagerName;
      break;   
    case "SL":
      response = await axios.get('https://api.vol-ka.studio/api/v1/stylist/'+ userId);
      name = response.data.stylistName;
      break;
    default:
      throw new Error(`Unsupported role: ${role}`);
  }
  
  const data = response.data;
  return {
    Email: email, 
    Password: '',   
    MemberName: name, 
    DateOfBirth: data.dateOfBirth,
    PhoneNumber: data.phoneNumber, 
    Address: data.address, 
    BranchId: data.branchID,        
    avatarImage: data.avatarImage,        
  };
}; 

export const updateUserData = async (userId: string, updatedData: Partial<UserInfoData>,role : string): Promise<void> => {
  try {
    console.log(updatedData);
    const formData = new FormData();
    if (updatedData.Email) formData.append('Email', updatedData.Email);
    if (updatedData.MemberName) formData.append('MemberName', updatedData.MemberName);
    if (updatedData.DateOfBirth) formData.append('DateOfBirth', updatedData.DateOfBirth);
    if (updatedData.PhoneNumber) formData.append('PhoneNumber', updatedData.PhoneNumber);
    if (updatedData.Address) formData.append('Address', updatedData.Address);
    if (updatedData.BranchId && role !=="MB") formData.append('BranchId', updatedData.BranchId);

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
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    await axios.put(`https://api.vol-ka.studio/api/Member/${userId}`, formData,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    });

    console.log('User data updated successfully');
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error;
  }
};