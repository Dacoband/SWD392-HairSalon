import axios from 'axios';

import { UserInfoData } from '../models/type'; 


export const fetchUserData = async (userId: string, email : string,): Promise<UserInfoData> => {
  const response = await axios.get('https://api.vol-ka.studio/api/v1/member/'+ userId);
  const data = response.data;
  return {
    Email: email, 
    Password: '',      
    MemberName: data.memberName, 
    DateOfBirth: data.dateOfBirth,
    PhoneNumber: data.phoneNumber, 
    Address: data.address,         
    avatarImage: data.avatarImage,        
  };
};

export const updateUserData = async (userId: string, updatedData: Partial<UserInfoData>): Promise<void> => {
  try {
    console.log(updatedData);
    const formData = new FormData();
    if (updatedData.Email) formData.append('Email', updatedData.Email);
    if (updatedData.MemberName) formData.append('MemberName', updatedData.MemberName);
    if (updatedData.DateOfBirth) formData.append('DateOfBirth', updatedData.DateOfBirth);
    if (updatedData.PhoneNumber) formData.append('PhoneNumber', updatedData.PhoneNumber);
    if (updatedData.Address) formData.append('Address', updatedData.Address);

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
         'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
       
      }
    });

    console.log('User data updated successfully');
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error;
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
