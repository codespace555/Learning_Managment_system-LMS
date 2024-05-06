import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import Cookie from "js-cookie";
const initialState = {
  status: false,
  userData: null,
  admin: false,
};
const cookie = Cookie.get("user_info");
console.log(cookie);

if (cookie) {
  const data = JSON.parse(cookie);
  initialState.status = data?.status;
  initialState.userData = data?.userData;
  console.log(data?.userData);
}
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload;
      Cookie.set(
        "user_info",
        JSON.stringify({ status: true, userData: action.payload }),
        {
          expires: 1,
        }
      );
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;

      Cookie.set(
        "user_info",
        JSON.stringify(null)
  
      );
      Cookie.c
    },
  },
});
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
