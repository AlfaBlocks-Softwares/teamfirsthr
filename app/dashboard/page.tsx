import { Metadata } from "next";
import dynamic from "next/dynamic";
import React from "react";

const EmployeeDashboard = dynamic(
  () => import("@/components/employee/dashboard/EmployeeDashboard")
);

export const metadata: Metadata = {
  title: "Dashboard - TeamFirstHR",
};

const Dashboard = () => {
  return <EmployeeDashboard />;
};

export default Dashboard;
