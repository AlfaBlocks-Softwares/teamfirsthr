/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { AuthInitialState } from "./authSliceInitialData";

const authSlice = createSlice({
  name: "auth",
  initialState: AuthInitialState,
  reducers: {
    login: (state, action: any) => {
      state.isAuthenticated = true;
      state.token = action?.payload?.data?.token?.access?.token;
      state.refreshToken = action?.payload?.data?.token?.refresh?.token;
    },
    resetAuthState: () => {
      return AuthInitialState;
    },
  },
});

export const { login, resetAuthState } = authSlice.actions;
export default authSlice.reducer;
