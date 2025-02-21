"use client";
import { Typography } from "antd";
import React from "react";

const EmployeePersonalInformation = () => {
  return (
    <div className="h-max w-full flex justify-between items-start">
      <div className="flex flex-col gap-spacing-xs">
        <Typography.Title level={3} className="!p-0 !m-0">
          Name
        </Typography.Title>
        <Typography.Title level={5} className="!p-0 !text-muted !text-sm !m-0">
          Role
        </Typography.Title>
      </div>
      <div className="flex flex-col gap-spacing-xxs">
        <Typography.Title level={3} className="!p-0 !m-0">
          Department
        </Typography.Title>
        <Typography.Title level={5} className="!p-0 !text-muted !text-sm !m-0">
          Manager
        </Typography.Title>
      </div>
    </div>
  );
};

export default EmployeePersonalInformation;
