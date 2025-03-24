/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "./custombasequery";

export const kanbanAPI = createApi({
  reducerPath: "kanbanAPI",
  baseQuery: customBaseQuery,
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    getUserDataForKanban: builder.query<any, { id: string }>({
      query: ({ id }) => ({
        url: `v1/attendance/date?date=${id}`,
        method: "GET",
      }),
      transformResponse: (response: any) => response,
    }),
  }),
});

export const { useGetUserDataForKanbanQuery } = kanbanAPI;
