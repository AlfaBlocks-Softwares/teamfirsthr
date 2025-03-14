import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import authReducer from "./slices/auth/authSlice";
import userReducer from "./slices/user/userSlice";
import leaveReducer from "./slices/leaves/leaveSlice";
import attendanceReducer from "./slices/attendance/attendanceSlice";
import { authAPI } from "./apis/auth";
import { userAPI } from "./apis/user";
import { leaveAPI } from "./apis/leave";
import { attendanceAPI } from "./apis";

const apiReducers = {
  [authAPI.reducerPath]: authAPI.reducer,
  [userAPI.reducerPath]: userAPI.reducer,
  [leaveAPI.reducerPath]: leaveAPI.reducer,
  [attendanceAPI.reducerPath]: attendanceAPI.reducer,
};

const rootReducer = combineReducers({
  auth: persistReducer(
    {
      key: "auth",
      storage,
    },
    authReducer
  ),
  user: persistReducer(
    {
      key: "user",
      storage,
    },
    userReducer
  ),
  leave: leaveReducer,
  attendance: attendanceReducer,
  ...apiReducers,
});

export default rootReducer;
