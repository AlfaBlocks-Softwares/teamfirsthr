import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import authReducer from "./slices/auth/authSlice";
import { authAPI } from "./apis/auth";

const apiReducers = {
  [authAPI.reducerPath]: authAPI.reducer,
};

const rootReducer = combineReducers({
  auth: persistReducer(
    {
      key: "root",
      storage,
    },
    authReducer
  ),
  ...apiReducers,
});

export default rootReducer;
