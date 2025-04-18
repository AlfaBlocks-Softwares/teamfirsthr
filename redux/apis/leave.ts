/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "./custombasequery";
import toast from "react-hot-toast";
import { updateLeaveStatus } from "../slices/leaves/leaveSlice";

export const leaveAPI = createApi({
  reducerPath: "leaveAPI",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    updateLeaveStatus: builder.mutation<any, any>({
      query: (credentials) => ({
        url: "v1/leave/update",
        method: "PUT",
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateLeaveStatus(data));
        } catch (error: any) {
          console.log(error);
          toast.error("Failed to update leave");
        }
      },
    }),
    applyForLeave: builder.mutation<any, any>({
      query: (credentials) => ({
        url: "v1/leave/check-in",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          // const { data } = await queryFulfilled;
          await queryFulfilled;
          toast.success("Successfully appliead for leave");
        } catch (error: any) {
          console.log(error);
          toast.error("Failed to appley for the leave");
        }
      },
    }),
    getAllLeaves: builder.query<any, any>({
      query: () => ({
        url: `v1/leaves/`,
        method: "GET",
      }),
      transformResponse: (response: any) => response,
    }),
  }),
});

export const {
  useGetAllLeavesQuery,
  useUpdateLeaveStatusMutation,
  useApplyForLeaveMutation,
} = leaveAPI;
