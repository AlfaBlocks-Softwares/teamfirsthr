import { RootState } from "../store";

export const selectLeavesList = (state: RootState) => state.leave.leaves;
