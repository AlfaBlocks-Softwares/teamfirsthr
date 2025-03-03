import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import { authAPI } from "./apis/auth";
import { persistStore } from "redux-persist";

const apiMiddlewares = [authAPI.middleware];

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiMiddlewares),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
