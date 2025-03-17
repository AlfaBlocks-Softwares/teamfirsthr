import { RootState } from "../store";

export const selectLoggedInUserAttendance = (state: RootState) =>
  state.attendance.individualAttendance;

export const selectIndividualUserAllAttendance = (state: RootState) =>
  state.attendance.individualUserAllAttendances;
