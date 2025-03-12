import { ILeave } from "@/types";

export interface ILeaveSlice {
  leaves: ILeave[];
}
export const LeaveInitialState: ILeaveSlice = {
  leaves: [],
};
