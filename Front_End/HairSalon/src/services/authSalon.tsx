import axios from "axios";

export const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('https://api.vol-ka.studio/api/v1/auth/login', {
        email,
        password
      });
     // Check if response contains token, email, and roleName
     if (response.data && response.data.token && response.data.email && response.data.roleName) {
      const { token, email: userEmail, roleName } = response.data;
      
      // Store token and userData in localStorage
      localStorage.setItem('token', token);
      const userData = { email: userEmail, roleName };
      localStorage.setItem('userData', JSON.stringify(userData));
  
      return { token, userData };
    } else {
      throw new Error('Invalid login response');
    }
  } catch (error) {
    console.error("Error during login:", error);
    throw new Error("Login failed");
  }
  };