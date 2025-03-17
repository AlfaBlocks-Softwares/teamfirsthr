import { IAttendance } from "@/types";

export interface IAttendanceSlice {
  individualAttendance: IAttendance;
  individualUserAllAttendances: IAttendance[];
  allUsersAttendances: IAttendance[];
}
export const AttendanceInitialState: IAttendanceSlice = {
  individualAttendance: {
    user: "",
    check_in: "",
    check_out: "",
  },
  individualUserAllAttendances: [],
  allUsersAttendances: [],
};
