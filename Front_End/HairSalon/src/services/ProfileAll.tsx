import axios from 'axios';

import { UserInfoData } from '../models/type'; 


export const fetchUserData = async (userId: string): Promise<UserInfoData> => {
  const response = await axios.get('https://api.vol-ka.studio/api/v1/member/'+ userId);
  const data = response.data;
  return {
    Email: data.email, 
    Password: '',      
    MemberName: data.memberName, 
    DateOfBirth: data.dateOfBirth,
    PhoneNumber: data.phoneNumber, 
    Address: data.address,         
    avatarImage: undefined,        
  };
};