"use client";
import React from "react";
import { Table } from "antd";
import type { TableProps } from "antd";

interface DataType {
  key: string;
  name: string;
  department: string;
  checkin: string;
  checkout: string;
  status: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Department",
    dataIndex: "department",
    key: "department",
  },
  {
    title: "Check In",
    dataIndex: "checkin",
    key: "checkin",
  },
  {
    title: "Check Out",
    dataIndex: "checkout",
    key: "checkout",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "John Doe",
    department: "Engineering",
    checkin: "09:00 AM",
    checkout: "05:30 PM",
    status: "Present",
  },
  {
    key: "2",
    name: "Jane Smith",
    department: "Marketing",
    checkin: "08:45 AM",
    checkout: "06:00 PM",
    status: "Present",
  },
  {
    key: "3",
    name: "Michael Johnson",
    department: "HR",
    checkin: "08:30 AM",
    checkout: "04:45 PM",
    status: "Present",
  },
  {
    key: "4",
    name: "Emily Brown",
    department: "Finance",
    checkin: "09:15 AM",
    checkout: "05:45 PM",
    status: "Present",
  },
  {
    key: "5",
    name: "Robert Williams",
    department: "Engineering",
    checkin: "10:00 AM",
    checkout: "06:30 PM",
    status: "Late",
  },
  {
    key: "6",
    name: "Sarah Miller",
    department: "Customer Support",
    checkin: "08:55 AM",
    checkout: "05:15 PM",
    status: "Present",
  },
  {
    key: "7",
    name: "David Garcia",
    department: "Sales",
    checkin: "09:30 AM",
    checkout: "05:30 PM",
    status: "Present",
  },
  {
    key: "8",
    name: "Lisa Rodriguez",
    department: "Engineering",
    checkin: "08:30 AM",
    checkout: "04:30 PM",
    status: "Present",
  },
  {
    key: "9",
    name: "Thomas Wilson",
    department: "Product",
    checkin: "--:--",
    checkout: "--:--",
    status: "Absent",
  },
  {
    key: "10",
    name: "Jennifer Martinez",
    department: "Design",
    checkin: "09:05 AM",
    checkout: "05:45 PM",
    status: "Present",
  },
  {
    key: "11",
    name: "Daniel Anderson",
    department: "Engineering",
    checkin: "08:45 AM",
    checkout: "03:30 PM",
    status: "Early Leave",
  },
  {
    key: "12",
    name: "Patricia Taylor",
    department: "Marketing",
    checkin: "09:20 AM",
    checkout: "06:00 PM",
    status: "Present",
  },
  {
    key: "13",
    name: "Andrew Thomas",
    department: "Finance",
    checkin: "10:15 AM",
    checkout: "06:30 PM",
    status: "Late",
  },
  {
    key: "14",
    name: "Elizabeth Jackson",
    department: "HR",
    checkin: "09:00 AM",
    checkout: "05:00 PM",
    status: "Present",
  },
  {
    key: "15",
    name: "James White",
    department: "Engineering",
    checkin: "08:30 AM",
    checkout: "05:30 PM",
    status: "Present",
  },
  {
    key: "16",
    name: "Nancy Harris",
    department: "Customer Support",
    checkin: "--:--",
    checkout: "--:--",
    status: "Leave",
  },
  {
    key: "17",
    name: "Christopher Lewis",
    department: "Sales",
    checkin: "09:10 AM",
    checkout: "04:45 PM",
    status: "Early Leave",
  },
  {
    key: "18",
    name: "Karen Robinson",
    department: "Engineering",
    checkin: "08:50 AM",
    checkout: "05:15 PM",
    status: "Present",
  },
  {
    key: "19",
    name: "Steven Walker",
    department: "Design",
    checkin: "09:45 AM",
    checkout: "06:15 PM",
    status: "Late",
  },
  {
    key: "20",
    name: "Margaret Young",
    department: "Product",
    checkin: "09:00 AM",
    checkout: "05:30 PM",
    status: "Present",
  },
];

const EmployeeAttendanceSummary = () => {
  return (
    <section className="mt-spacing-l">
      <Table<DataType>
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5 }}
      />
    </section>
  );
};

export default EmployeeAttendanceSummary;
