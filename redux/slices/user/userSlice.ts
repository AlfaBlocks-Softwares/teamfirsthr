import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInitialState } from "./userSliceInitialData";
import { IUser } from "@/types";
import { userAPI } from "@/redux/apis";

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
    updateUserStatus: (state, action) => {
      const { email, is_active } = action.payload;
      state.users = state.users.map((user) =>
        user.email === email ? { ...user, is_active } : user
      );
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userAPI.endpoints.getAllUsers.matchFulfilled,
      (state, { payload }) => {
        state.users = payload.data;
      }
    );
  },
});

export const { setUser, resetUserState, updateUserStatus } = userSlice.actions;
export default userSlice.reducer;
