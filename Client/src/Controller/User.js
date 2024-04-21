import { api } from "../axios/axios";


class user {
 

  createUser = async (data) => {
    try {
      const resp = await api({
        url: "users/register",
        method: "post",
        data,
        headers: {
          "content-type": "multipart/form-data",
        }
      });
      if (resp) {
       console.log(data.get("email"))
        return this.loginUser({email:data.get("email"), password:data.get("password")});
      } else {
        return resp?.data;
      }
    } catch (error) {
      throw error.response?.data.errors;
    }
  };

  loginUser = async (data) => {
    try {
      const resp = await api({
        url: "users/login",
        method: "post",
        data,
        headers: {
          "content-type": "application/json",
        },
        withCredentials:true
      });
      const accessToken = resp?.data?.data.accessToken;
      const refreshToken = resp?.data?.data.refreshToken;

     
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
   
      return resp?.data;
    } catch (error) {
      throw error.response?.data.errors;
    }
  };

  getUser = async() => {
    try {
      const resp = await api({
        url: "users/profile",
        method: "get",
        headers: {
          "content-type": "application/json",
        },
        withCredentials:true
      });
      console.log(resp?.data);
      return resp?.data;
    } catch (error) {
      throw error.response?.data.errors;
    }

  }

  
  loginWithToken = async (token) => {
    try {
    
      const resp = await api({
        url: "users/refresh-token", 
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        withCredentials:true
      });
      console.log(resp?.data)

      return resp?.data;
    } catch (error) {
      throw error.response?.data.errors;
    }
  }

  logout = async () => {
    try {
      const resp = await api({
        url: "users/logout",
        method: "get",
        headers: {
          "content-type": "application/json",
        },
        withCredentials:true
      });
      console.log("logout")
      return resp?.data;
      
    } catch (error) {
      throw error.response?.data.errors;
    }
  }


forgotpassword = async(data) =>{
  try {
    const resp = await api({
      url: "users/reset",
      method: "post",
      data,
      headers: {
        "content-type": "application/json",
      },
    });
    return resp?.data;
  } catch (error) {
    throw error.response?.data.errors;
  }
}

resetpassword = async(data) =>{
  try {
    const resp = await api({
      url: "users/reset-password",
      method: "post",
      data,
      headers: {
        "content-type": "application/json",
      },
    });
    return resp?.data;
  } catch (error) {
    throw error.response?.data.errors;
  }
}




}

const authUser = new user();
export default authUser;
