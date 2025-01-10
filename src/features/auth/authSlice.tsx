import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import customerApi from "../../api/customer";

type AuthState = {
  loginStatus: boolean;
  userData: Object;
};

const initialState: AuthState = {
  loginStatus: JSON.parse(localStorage.getItem("user") || "{}").id
    ? true
    : false,
  userData: JSON.parse(localStorage.getItem("user") || "{}"),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginStatus: (state, action: PayloadAction<boolean>) => {
      state.loginStatus = action.payload;
    },
    login: (state, action: any) => {
      customerApi
        .login(action.payload)
        .then((res) => {
          console.log(res, "res");
          return true;
          // localStorage.setItem("user", JSON.stringify(res));
          // state.loginStatus = true;
        })
        .catch((err) => {
          console.log(err, "err");
          return false;
        });
    },
    logout: (state) => {
      localStorage.removeItem("user");
      state.loginStatus = false;
    },
  },
});

export const { setLoginStatus, login } = authSlice.actions;

export default authSlice.reducer;
