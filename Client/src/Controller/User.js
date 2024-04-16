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
      console.log(resp);
      return resp?.data;
    } catch (error) {
     
  throw error.response?.data.errors;
    }
  };
}

const authUser = new user();
export default authUser;
