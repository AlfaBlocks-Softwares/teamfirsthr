"use client";
import Button from "@/components/ui/Button";
import {
  useGetLatestAttendanceofLoggedInUserQuery,
  useMarkCheckInMutation,
  useMarkCheckOutMutation,
} from "@/redux/apis";
import { selectLoggedInUserAttendance } from "@/redux/selectors";
import { Typography } from "antd";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";

const EmployeeQuickActions = () => {
  const [markCheckIn] = useMarkCheckInMutation();
  const [markCheckOut] = useMarkCheckOutMutation();

  const loggedInUserAttendance = useSelector(selectLoggedInUserAttendance);

  useGetLatestAttendanceofLoggedInUserQuery();

  const handleSignIn = async () => {
    await markCheckIn({});
  };

  const handleSignOut = async () => {
    await markCheckOut({});
  };

  const isSignInDisabled = !!loggedInUserAttendance?.check_in;
  const isSignOutDisabled =
    !loggedInUserAttendance?.check_in || !!loggedInUserAttendance?.check_out;

  return (
    <section className="w-full grid grid-cols-1 lg:grid-cols-2 gap-spacing-l">
      <div className="h-[150px] bg-yellow-400 rounded-lg flex flex-col justify-start items-start gap-spacing-xxs p-spacing-s">
        <Button onClick={handleSignIn} disabled={isSignInDisabled}>
          Sign In
        </Button>
        {loggedInUserAttendance?.check_in && (
          <Typography.Title
            level={5}
            className="!p-0 !m-0 !text-muted break-all"
          >
            <span className="text-primary">Signed In at:</span>{" "}
            {moment(loggedInUserAttendance?.check_in).format(
              "dddd, MMMM D, YYYY hh:mm A"
            )}
          </Typography.Title>
        )}
      </div>
      <div className="h-[150px] bg-yellow-400 rounded-lg flex flex-col justify-start items-start gap-spacing-xxs p-spacing-s">
        <Button onClick={handleSignOut} disabled={isSignOutDisabled}>
          Sign Out
        </Button>
        {loggedInUserAttendance?.check_out && (
          <Typography.Title
            level={5}
            className="!p-0 !m-0 !text-muted break-all"
          >
            <span className="text-primary">Signed Out at:</span>
            {moment(loggedInUserAttendance?.check_out).format(
              "dddd, MMMM D, YYYY hh:mm A"
            )}
          </Typography.Title>
        )}
      </div>

      <div className="lg:col-span-2 h-[150px] bg-yellow-400 rounded-lg flex flex-col justify-start items-start gap-spacing-xxs p-spacing-s">
        <Link href={"/dashboard/leave"}>
          <Button>Apply for a leave</Button>
        </Link>
      </div>
    </section>
  );
};

export default EmployeeQuickActions;
