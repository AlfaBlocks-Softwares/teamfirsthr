import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthInitialState } from "./authSliceInitialData";

const authSlice = createSlice({
  name: "auth",
  initialState: AuthInitialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.user.name = action.payload;
    },
    logout: (state) => {
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
