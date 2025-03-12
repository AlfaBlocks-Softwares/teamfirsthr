import { RootState } from "../store";

export const selectUser = (state: RootState) => state.user.user;
export const selectUsersList = (state: RootState) => state.user.users;
