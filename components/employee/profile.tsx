"use client";
import { TabItemsForEmployeeProfile } from "@/constants/tabItems";
import { Tabs, Typography } from "antd";
import Button from "../ui/Button";

export default function EmployeeProfile() {
  return (
    <section className="!w-full !h-full">
      <div className="w-full flex flex-col justify-start items-start gap-spacing-xs">
        <div className="w-full flex justify-between items-start">
          <Typography.Title level={2} className="!font-bold">
            Settings
          </Typography.Title>
          <div className="flex gap-spacing-xs">
            <Button variant="primary" size="md">
              Save change
            </Button>
            <Button variant="secondary" size="md">
              Cancel
            </Button>
          </div>
        </div>
        <Typography.Title level={5} className="!font-semibold">
          Manage your account profile
        </Typography.Title>
      </div>
      <Tabs
        animated={true}
        items={TabItemsForEmployeeProfile}
        tabPosition="left"
        className="!h-full"
      />
    </section>
  );
}
