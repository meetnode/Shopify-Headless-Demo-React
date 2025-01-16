import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import customerApi from "../../api/customer";

type AuthState = {
  loginStatus: boolean;
  userData: Object;
};

const initialState: AuthState = {
  loginStatus:
    JSON.parse(localStorage.getItem("user") || "{}") !== null ? true : false,
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
          if (res.customerAccessTokenCreate.customerUserErrors.length) {
            return false;
          }
          localStorage.setItem(
            "user",
            JSON.stringify(res.customerAccessTokenCreate.customerAccessToken)
          );
          state.loginStatus = true;
          return true;
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

export const { setLoginStatus, login, logout } = authSlice.actions;

export default authSlice.reducer;
