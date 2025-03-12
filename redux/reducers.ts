import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import authReducer from "./slices/auth/authSlice";
import userReducer from "./slices/user/userSlice";
import leaveReducer from "./slices/leaves/leaveSlice";
import { authAPI } from "./apis/auth";
import { userAPI } from "./apis/user";
import { leaveAPI } from "./apis/leave";

const apiReducers = {
  [authAPI.reducerPath]: authAPI.reducer,
  [userAPI.reducerPath]: userAPI.reducer,
  [leaveAPI.reducerPath]: leaveAPI.reducer,
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
  ...apiReducers,
});

export default rootReducer;
