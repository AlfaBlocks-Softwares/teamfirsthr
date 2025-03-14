import { createSlice } from "@reduxjs/toolkit";
import { AttendanceInitialState } from "./attendanceInitialData";

const attendanceSlice = createSlice({
  name: "attendance",
  initialState: AttendanceInitialState,
  reducers: {
    resetAttendanceState: () => {
      return AttendanceInitialState;
    },
    setLoggedInUserAttendance: (state, action) => {
      state.individualAttendance = action.payload;
    },
  },
});

export const { setLoggedInUserAttendance } = attendanceSlice.actions;
export default attendanceSlice.reducer;
