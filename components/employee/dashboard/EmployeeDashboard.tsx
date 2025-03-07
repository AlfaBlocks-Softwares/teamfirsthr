"use client";
import React from "react";
import EmployeePersonalInformation from "./PersonalInformation";
import EmployeeAnnouncements from "./Announcements";
import EmployeeTaskSummary from "./TaskSummary";
import EmployeeQuickActions from "./QuickActions";

const EmployeeDashboard = () => {
  return (
    <main className="w-full h-full">
      <section className="w-full grid grid-cols-1 sm:grid-cols-2 justify-start items-start gap-spacing-xl">
        <div className="w-full flex flex-col justify-start items-start gap-spacing-m">
          <EmployeePersonalInformation />
          <EmployeeQuickActions />
        </div>
        <EmployeeAnnouncements />
      </section>
      <EmployeeTaskSummary />
    </main>
  );
};

export default EmployeeDashboard;
