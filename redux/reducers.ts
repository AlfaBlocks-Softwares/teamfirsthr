import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import authReducer from "./slices/auth/authSlice";
import userReducer from "./slices/user/userSlice";
import { authAPI } from "./apis/auth";
import { userAPI } from "./apis/user";

const apiReducers = {
  [authAPI.reducerPath]: authAPI.reducer,
  [userAPI.reducerPath]: userAPI.reducer,
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
  ...apiReducers,
});

export default rootReducer;
