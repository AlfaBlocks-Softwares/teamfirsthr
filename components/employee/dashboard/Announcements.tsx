"use client";
import { Typography } from "antd";
import React from "react";

const announcemnets = [
  {
    title: "Task # 01",
    key: "1",
    description: "Started the Job",
  },
  {
    title: "Job # 02",
    key: "2",
    description: "Started the Job",
  },
  {
    title: "Task # 01",
    key: "3",
    description: "Started the Job",
  },
  {
    title: "Task # 01",
    key: "4",
    description: "Started the Job",
  },
  {
    title: "Job # 02",
    key: "5",
    description: "Started the Job",
  },
  {
    title: "Task # 01",
    key: "6",
    description: "Started the Job",
  },
  {
    title: "Task # 01",
    key: "7",
    description: "Started the Job",
  },
];

const EmployeeAnnouncements = () => {
  return (
    <div className="flex flex-col gap-spacing-l shadow-2xl max-h-[400px] overflow-y-scroll px-spacing-m rounded-2xl py-spacing-m">
      {announcemnets?.map((itm) => (
        <div
          key={itm.key}
          className="flex flex-col px-spacing-s gap-spacing-xxs"
        >
          <Typography.Title level={3} className="!m-0 !p-0 !text-lg">
            {itm.title}
          </Typography.Title>
          <Typography.Title
            level={3}
            className="!m-0 !p-0 !text-sm !text-muted"
          >
            {itm.description}
          </Typography.Title>
        </div>
      ))}
    </div>
  );
};

export default EmployeeAnnouncements;
