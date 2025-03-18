import { createSlice } from "@reduxjs/toolkit";
import { AttendanceInitialState } from "./attendanceInitialData";
import { attendanceAPI } from "@/redux/apis";

const attendanceSlice = createSlice({
  name: "attendance",
  initialState: AttendanceInitialState,
  reducers: {
    resetAttendanceState: () => {
      return AttendanceInitialState;
    },
    resetLoggedInUserAttendanceState: (state) => {
      state.individualAttendance = {
        ...state.individualAttendance,
        check_in: "",
        check_out: "",
      };
    },
    setLoggedInUserAttendance: (state, action) => {
      state.individualAttendance = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      attendanceAPI.endpoints.getLatestAttendanceofLoggedInUser.matchFulfilled,
      (state, { payload }) => {
        state.individualAttendance = payload?.data;
      }
    );
    builder.addMatcher(
      attendanceAPI.endpoints.getAllAttendanceofLoggedInUser.matchFulfilled,
      (state, { payload }) => {
        state.individualUserAllAttendances = payload?.data;
      }
    );
  },
});

export const {
  setLoggedInUserAttendance,
  resetAttendanceState,
  resetLoggedInUserAttendanceState,
} = attendanceSlice.actions;
export default attendanceSlice.reducer;
