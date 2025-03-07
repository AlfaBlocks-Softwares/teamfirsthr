/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./custombasequery";
import toast from "react-hot-toast";
import { setUser } from "../slices/user/userSlice";

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    updateProfile: builder.mutation<any, any>({
      query: (credentials) => ({
        url: "v1/user/",
        method: "PUT",
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error: any) {
          toast.error(
            error?.error?.data?.message ?? "Failed to update profile"
          );
        }
      },
    }),
    addNewUser: builder.mutation<any, any>({
      query: (credentials) => ({
        url: "v1/user/signup",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.code === 200) {
            toast.error("Successfully added new user");
          } else {
            toast.error("Failed to add new user");
          }
        } catch (error: any) {
          toast.error(error?.error?.data?.message ?? "Failed to add new user");
        }
      },
    }),
    getUserDetails: builder.query<any, void>({
      query: () => ({
        url: "v1/user/",
        method: "GET",
      }),
      transformResponse: (response: any) => response,
    }),
  }),
});

export const {
  useUpdateProfileMutation,
  useGetUserDetailsQuery,
  useAddNewUserMutation,
} = userAPI;
