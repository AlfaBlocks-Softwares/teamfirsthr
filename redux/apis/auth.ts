/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import { login } from "../slices/auth/authSlice";
import customBaseQuery from "./custombasequery";
import toast from "react-hot-toast";

export const authAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<any, any>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);

          dispatch(login(data));
        } catch (error: any) {
          toast.error(error?.error?.data?.message ?? "Login Failed");
        }
      },
    }),
  }),
});

export const { useLoginMutation } = authAPI;
