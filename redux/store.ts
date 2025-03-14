import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import { authAPI } from "./apis/auth";
import { persistStore } from "redux-persist";
import { userAPI } from "./apis/user";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { leaveAPI } from "./apis/leave";
import { attendanceAPI } from "./apis";

const apiMiddlewares = [
  authAPI.middleware,
  userAPI.middleware,
  leaveAPI.middleware,
  attendanceAPI.middleware,
];

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiMiddlewares),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
