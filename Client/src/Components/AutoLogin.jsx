import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authUser from "../Controller/User";

function AutoLogin() {
  const navigate = useNavigate();
  useEffect(() => {
    const autoLogin = async () => {
      const token = localStorage.getItem("accessToken");
      console.log(token);
      if (token) {
        try {
          await authUser.loginWithToken(token);
          console.log("Auto login successful");
          navigate("/");
        } catch (error) {
          console.error("Auto login failed:", error);
        }
      }
    };

    autoLogin();
  }, []);

  return null;
}

export default AutoLogin;
