/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "./custombasequery";
import toast from "react-hot-toast";
import { setLoggedInUserAttendance } from "../slices/attendance/attendanceSlice";

export const attendanceAPI = createApi({
  reducerPath: "attendanceAPI",
  baseQuery: customBaseQuery,
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    markCheckIn: builder.mutation<any, any>({
      query: () => {
        return {
          url: `v1/attendance/check-in`,
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
      query: () => ({
        url: "v1/attendance/check-out",
        method: "POST",
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
    getLatestAttendanceofLoggedInUser: builder.query<any, void>({
      query: () => ({
        url: `v1/attendance/latest`,
        method: "GET",
      }),
      transformResponse: (response: any) => response,
    }),
    getAllAttendanceofLoggedInUser: builder.query<any, void>({
      query: () => ({
        url: `v1/attendance/`,
        method: "GET",
      }),
      transformResponse: (response: any) => response,
    }),
    getAllUsersAttendance: builder.query<any, { date: Date | string }>({
      query: ({ date }) => ({
        url: `v1/attendance/date?date=${date}`,
        method: "GET",
      }),
      transformResponse: (response: any) => response,
    }),
  }),
});

export const {
  useGetAllAttendanceofLoggedInUserQuery,
  useGetLatestAttendanceofLoggedInUserQuery,
  useMarkCheckInMutation,
  useMarkCheckOutMutation,
  useGetAllUsersAttendanceQuery,
} = attendanceAPI;
