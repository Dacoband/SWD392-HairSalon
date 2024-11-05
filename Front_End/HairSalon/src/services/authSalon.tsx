import axios from "axios";
import Branch from "../pages/Branch";

export const login = async (email: string, password: string) => {
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
       const response = await axios.post('https://api.vol-ka.studio/api/v1/auth/login',formData , {

        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    
     if (response.data && response.data.token && response.data.email && response.data.roleName) {
      const { token, email: userEmail, roleName ,branchId, actorId} = response.data;
      

      localStorage.setItem('token', token);
      const userDatas = { email: userEmail, roleName ,branchId, actorId};
      localStorage.setItem('userData', JSON.stringify(userDatas));
  
      return { token, userDatas };
    } else {
      throw new Error('Invalid login response');
    }
  } catch (error) {
    console.error("Error during login:", error);
    throw new Error("Login failed");
  }
  };

  export const signUpUser = async (submissionData: FormData) => {

      const response = await axios.post('https://api.vol-ka.studio/api/v1/member/add', submissionData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
  

  };