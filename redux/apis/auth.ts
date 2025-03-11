/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import { login, resetAuthState } from "../slices/auth/authSlice";
import customBaseQuery from "./custombasequery";
import toast from "react-hot-toast";
import { resetUserState, setUser } from "../slices/user/userSlice";

export const authAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<any, any>({
      query: (credentials) => {
        const { router, ...authCredentials } = credentials;
        return {
          url: "v1/user/login",
          method: "POST",
          body: authCredentials,
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { router } = arg;
        try {
          const { data } = await queryFulfilled;
          if (data?.code === 200) {
            dispatch(login(data));
            dispatch(setUser(data?.data));
            router && router.push("/dashboard");
          } else {
            toast.error(data?.message);
          }
        } catch (error: any) {
          toast.error(error?.error?.data?.message ?? "Login Failed");
        }
      },
    }),
    setupPassword: builder.mutation<any, any>({
      query: (credentials) => {
        const { router, ...authCredentials } = credentials;
        return {
          url: "v1/user/set-password",
          method: "POST",
          body: authCredentials,
        };
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        const { router } = arg;
        try {
          const { data } = await queryFulfilled;
          if (data?.code === 200) {
            router && router.push("/");
          } else {
            toast.error(data?.message);
          }
        } catch (error: any) {
          toast.error(error?.error?.data?.message ?? "Login Failed");
        }
      },
    }),
  }),
});

export const { useLoginMutation, useSetupPasswordMutation } = authAPI;
