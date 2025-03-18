"use client";
import { Table, Spin, DatePicker, Typography, Input } from "antd";
import type { TableProps } from "antd";
import { IAttendanceTable } from "@/types";
import { useGetAllUsersAttendanceQuery } from "@/redux/apis";
import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import dayjs from "dayjs";
import { useState } from "react";

const { Search } = Input;

const dummyData: IAttendanceTable[] = [
  {
    name: "John Doe",
    department: "Engineering",
    check_in: "2025-03-18T08:15:00Z",
    check_out: "2025-03-18T17:30:00Z",
    late: "No",
  },
  {
    name: "Jane Smith",
    department: "Marketing",
    check_in: "2025-03-18T09:05:00Z",
    check_out: "2025-03-18T18:00:00Z",
    late: "Yes",
  },
  {
    name: "Alice Johnson",
    department: "HR",
    check_in: "2025-03-18T08:45:00Z",
    check_out: "2025-03-18T17:15:00Z",
    late: "No",
  },
  {
    name: "Bob Williams",
    department: "Finance",
    check_in: "2025-03-18T09:30:00Z",
    check_out: "2025-03-18T18:20:00Z",
    late: "Yes",
  },
  {
    name: "Emily Brown",
    department: "Sales",
    check_in: "2025-03-18T08:20:00Z",
    check_out: "2025-03-18T17:40:00Z",
    late: "No",
  },
  {
    name: "Michael Scott",
    department: "Management",
    check_in: "2025-03-18T09:00:00Z",
    check_out: "2025-03-18T18:30:00Z",
    late: "Yes",
  },
  {
    name: "Dwight Schrute",
    department: "Sales",
    check_in: "2025-03-18T08:10:00Z",
    check_out: "2025-03-18T17:20:00Z",
    late: "No",
  },
  {
    name: "Pam Beesly",
    department: "Reception",
    check_in: "2025-03-18T08:55:00Z",
    check_out: "2025-03-18T17:50:00Z",
    late: "Yes",
  },
  {
    name: "Jim Halpert",
    department: "Sales",
    check_in: "2025-03-18T08:30:00Z",
    check_out: "2025-03-18T17:35:00Z",
    late: "No",
  },
  {
    name: "Stanley Hudson",
    department: "Accounting",
    check_in: "2025-03-18T09:15:00Z",
    check_out: "2025-03-18T18:10:00Z",
    late: "Yes",
  },
];

const HRDashboardAttendanceTable = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    dayjs()?.format("YYYY-MM-DD")
  );
  const [searchText, setSearchText] = useState<string>("");
  const { data, isLoading } = useGetAllUsersAttendanceQuery({
    date: selectedDate,
  });

  const handleDateChange = (value: dayjs.Dayjs | null) => {
    if (value) {
      setSelectedDate(value.format("YYYY-MM-DD"));
    }
  };

  const handleSearch = (value: string) => {
    setSearchText(value.toLowerCase());
  };

  const filteredData = dummyData?.filter(
    (item) =>
      item?.name?.toLowerCase().includes(searchText) ||
      item?.department?.toLowerCase().includes(searchText)
  );

  const columns: TableProps<IAttendanceTable>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a?.name?.localeCompare(b?.name),
      filterDropdown: () => (
        <Search
          placeholder="Search Name"
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ padding: 8 }}
        />
      ),
      filterIcon: <SearchOutlined />,
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      sorter: (a, b) => a?.department?.localeCompare(b?.department),
      filterDropdown: () => (
        <Search
          placeholder="Search Department"
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ padding: 8 }}
        />
      ),
      filterIcon: <SearchOutlined />,
    },
    {
      title: "Check In",
      dataIndex: "check_in",
      key: "check_in",
      render: (value) => moment(value).format("dddd, MMMM D, YYYY hh:mm A"),
    },
    {
      title: "Check Out",
      dataIndex: "check_out",
      key: "check_out",
      render: (value) => moment(value).format("dddd, MMMM D, YYYY hh:mm A"),
    },
    {
      title: "Late",
      dataIndex: "late",
      key: "late",
      sorter: (a, b) => a?.late?.localeCompare(b?.late ?? ""),
      filters: [
        { text: "Yes", value: "Yes" },
        { text: "No", value: "No" },
      ],
      onFilter: (value, record) => record.late === value,
    },
  ];

  return (
    <section className="mt-4">
      <div className="flex justify-start items-center gap-spacing-xs mb-spacing-s">
        <Typography.Title level={5} className="!p-0 !m-0">
          Select Date
        </Typography.Title>
        <DatePicker
          format={"DD-MM-YYYY"}
          onChange={handleDateChange}
          defaultValue={dayjs()}
        />
      </div>
      {isLoading ? (
        <Spin
          indicator={<LoadingOutlined spin />}
          size="large"
          className="!w-full !h-full"
        />
      ) : (
        <Table<IAttendanceTable>
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 5 }}
        />
      )}
    </section>
  );
};

export default HRDashboardAttendanceTable;
