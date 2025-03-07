import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInitialState } from "./userSliceInitialData";
import { IEmployeeProfile } from "@/types";

const userSlice = createSlice({
  name: "user",
  initialState: UserInitialState,
  reducers: {
    setUser: (state, action: PayloadAction<IEmployeeProfile>) => {
      state.user = action.payload;
    },
    resetUserState: () => {
      return UserInitialState;
    },
  },
});

export const { setUser, resetUserState } = userSlice.actions;
export default userSlice.reducer;
