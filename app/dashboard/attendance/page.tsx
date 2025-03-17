import { Metadata } from "next";
import dynamic from "next/dynamic";
import React from "react";

const UserAttendanceTable = dynamic(
  () => import("@/components/hr/attendance/attendance")
);

export const metadata: Metadata = {
  title: "Attendance - TeamFirstHR",
};

export default function SignUp() {
  return <UserAttendanceTable />;
}
