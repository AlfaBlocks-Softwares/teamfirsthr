import { createSlice } from "@reduxjs/toolkit";
import { LeaveInitialState } from "./leaveSliceInitialData";
import { leaveAPI } from "@/redux/apis";

const leaveSlice = createSlice({
  name: "leave",
  initialState: LeaveInitialState,
  reducers: {
    resetLeaveState: () => {
      return LeaveInitialState;
    },
    updateLeaveStatus: (state, action) => {
      // const { email, is_active } = action.payload;
      // state.leaves = state.leaves.map((user) =>
      //   user.email === email ? { ...user, is_active } : user
      // );
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      leaveAPI.endpoints.getAllLeaves.matchFulfilled,
      (state, { payload }) => {
        state.leaves = payload.data;
      }
    );
  },
});

export const { updateLeaveStatus } = leaveSlice.actions;
export default leaveSlice.reducer;
