import { api } from "../axios/axios";

class user {
 

  createUser = async (data) => {
    try {
      const resp = await api({
        url: "users/register",
        method: "post",
        data,
        headers: {
          "content-type": "application/json",
        },
        withCredentials:true
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
          "Authorization":"Bearer "+localStorage.getItem("accessToken")
        },
        withCredentials:true
      });
      console.log(resp?.data);
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
      });
      console.log(resp?.data);
      return resp?.data;
    } catch (error) {
      throw error.response?.data.errors;
    }

  }
}

const authUser = new user();
export default authUser;
