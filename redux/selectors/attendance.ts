import { RootState } from "../store";

export const selectLoggedInUserAttendance = (state: RootState) =>
  state.attendance.individualAttendance;
