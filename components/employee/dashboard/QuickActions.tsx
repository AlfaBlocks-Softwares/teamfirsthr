"use client";
import Button from "@/components/ui/Button";
import { useMarkCheckInMutation, useMarkCheckOutMutation } from "@/redux/apis";
import { selectLoggedInUserAttendance, selectUser } from "@/redux/selectors";
import { Typography } from "antd";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const EmployeeQuickActions = () => {
  const [markCheckIn] = useMarkCheckInMutation();
  const [markCheckOut] = useMarkCheckOutMutation();
  const loggedInUserAttendance = useSelector(selectLoggedInUserAttendance);
  const user = useSelector(selectUser);

  const handleSignIn = async () => {
    await markCheckIn({ id: user?._id });
  };

  const handleSignOut = async () => {
    await markCheckOut({ id: user?._id });
  };

  const isSignInDisabled = loggedInUserAttendance?.check_in ? true : false;
  const isSignOutDisabled = loggedInUserAttendance?.check_in ? true : false;
  return (
    <section className="w-full grid grid-cols-1 lg:grid-cols-2 gap-spacing-l">
      <div className="h-[150px] bg-yellow-400 rounded-lg flex flex-col justify-start items-start gap-spacing-xxs p-spacing-s">
        <Button onClick={handleSignIn} disabled={isSignInDisabled}>
          Sign In
        </Button>
        {loggedInUserAttendance?.check_in && (
          <Typography.Title level={4} className="!p-0 !m-0 !text-muted">
            Signed In at: {loggedInUserAttendance?.check_in}
          </Typography.Title>
        )}
      </div>
      <div className="h-[150px] bg-yellow-400 rounded-lg flex flex-col justify-start items-start gap-spacing-xxs p-spacing-s">
        <Button onClick={handleSignOut} disabled={!isSignOutDisabled}>
          Sign Out
        </Button>
        {loggedInUserAttendance?.check_out && (
          <Typography.Title level={4} className="!p-0 !m-0 !text-muted">
            Signed In at: {loggedInUserAttendance?.check_out}
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
