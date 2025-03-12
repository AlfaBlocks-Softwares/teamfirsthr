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
          console.log(error);
          toast.error("Failed to update profile");
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
          console.log(error);
          toast.error("Failed to add new user");
        }
      },
    }),
    changeProfilePicture: builder.mutation<any, any>({
      query: (credentials) => ({
        url: "v1/user/profile",
        method: "PUT",
        body: credentials,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.code !== 200) {
            toast.error("Failed to update profile picture");
          }
        } catch (error: any) {
          console.log(error);
          toast.error("Failed to update profile picture");
        }
      },
    }),
    deleteProfilePicture: builder.mutation<any, any>({
      query: (credentials) => ({
        url: "v1/user/profile",
        method: "DELETE",
        body: credentials,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.code !== 200) {
            toast.error("Failed to delete profile picture");
          }
        } catch (error: any) {
          console.log(error);
          toast.error("Failed to delete profile picture");
        }
      },
    }),
    activateDeactivateUser: builder.mutation<any, any>({
      query: (credentials) => ({
        url: "v1/user/activate",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.code !== 200) {
            toast.error("Failed to update status");
          }
        } catch (error: any) {
          console.log(error);
          toast.error("Failed to update status");
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
    getAllUsers: builder.query<any, void>({
      query: () => ({
        url: "v1/user/?role=all",
        method: "GET",
      }),
      transformResponse: (response: any) => response?.data,
    }),
    getAllManagers: builder.query<any, { id: string }>({
      query: ({ id }) => ({
        url: `v1/user/?managerId=${id}`,
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
  useChangeProfilePictureMutation,
  useDeleteProfilePictureMutation,
  useActivateDeactivateUserMutation,
  useGetAllManagersQuery,
  useGetAllUsersQuery,
} = userAPI;
