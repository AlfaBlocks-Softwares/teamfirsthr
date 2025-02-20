import EmployeeProfile from "@/components/employee/profile";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Profile - TeamFirstHR",
};

const Profile = () => {
  return <EmployeeProfile />;
};

export default Profile;
