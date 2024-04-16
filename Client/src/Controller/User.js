import { api } from "../axios/axios";

class user {
  constructor() {
    this.headersJson = {
      headers: {
        "content-type": "application/json",
      },
      withCredentials: true,
    };
    this.headersfromData = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };
  }

  createUser = async (data) => {
    try {
      const resp = await api({
        url: "users/register",
        method: "post",
        data,
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
        data
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
      return resp?.data;
    } catch (error) {
      throw error.response?.data.errors;
    }

  }
}

const authUser = new user();
export default authUser;
