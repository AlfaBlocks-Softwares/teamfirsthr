"use client";
import { selectUser } from "@/redux/selectors";
import { Typography } from "antd";
import React from "react";
import { useSelector } from "react-redux";

const EmployeePersonalInformation = () => {
  const user = useSelector(selectUser);

  return (
    <div className="h-max w-full flex justify-between items-start">
      <div className="flex flex-col gap-spacing-xs">
        <Typography.Title level={3} className="!p-0 !m-0">
          {user?.first_name ?? ""}
        </Typography.Title>
        <Typography.Title level={5} className="!p-0 !text-muted !text-sm !m-0">
          {user?.role}
        </Typography.Title>
      </div>
      <div className="flex flex-col gap-spacing-xxs">
        <Typography.Title level={3} className="!p-0 !m-0">
          {user?.department ?? ""}
        </Typography.Title>
        <Typography.Title level={5} className="!p-0 !text-muted !text-sm !m-0">
          {user?.manager ?? ""}
        </Typography.Title>
      </div>
    </div>
  );
};

export default EmployeePersonalInformation;
