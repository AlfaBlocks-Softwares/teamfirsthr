import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInitialState } from "./userSliceInitialData";
import { IUser } from "@/types";

const userSlice = createSlice({
  name: "user",
  initialState: UserInitialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    resetUserState: () => {
      return UserInitialState;
    },
  },
});

export const { setUser, resetUserState } = userSlice.actions;
export default userSlice.reducer;
