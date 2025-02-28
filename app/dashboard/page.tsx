import EmployeeDashboard from "@/components/employee/dashboard/EmployeeDashboard";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard - TeamFirstHR",
};

const Dashboard = () => {
  return <EmployeeDashboard />;
};

export default Dashboard;
