/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./custombasequery";
import toast from "react-hot-toast";
import { setLoggedInUserAttendance } from "../slices/attendance/attendanceSlice";

export const attendanceAPI = createApi({
  reducerPath: "attendanceAPI",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    markCheckIn: builder.mutation<any, any>({
      query: (credentials) => {
        const { id } = credentials;
        return {
          url: `v1/attendance/check-in/?${id}`,
          method: "POST",
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setLoggedInUserAttendance(data?.data));
        } catch (error: any) {
          console.log(error);
          toast.error("Failed to Check In");
        }
      },
    }),
    markCheckOut: builder.mutation<any, any>({
      query: (credentials) => ({
        url: "v1/attendance/check-out",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setLoggedInUserAttendance(data?.data));
        } catch (error: any) {
          console.log(error);
          toast.error("Failed to Check Out");
        }
      },
    }),
    getAllAttendacne: builder.query<any, any>({
      query: () => ({
        url: `v1/leaves/`,
        method: "GET",
      }),
      transformResponse: (response: any) => response,
    }),
  }),
});

export const {
  useGetAllAttendacneQuery,
  useMarkCheckInMutation,
  useMarkCheckOutMutation,
} = attendanceAPI;
