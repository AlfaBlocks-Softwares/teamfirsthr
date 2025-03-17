"use client";
import { Table, Spin, DatePicker, Typography } from "antd";
import type { TableProps } from "antd";
import { IAttendance } from "@/types";
import { useGetAllUsersAttendanceQuery } from "@/redux/apis";
import { LoadingOutlined } from "@ant-design/icons";
import moment from "moment";
import dayjs from "dayjs";
import { useState } from "react";

const HRDashboardAttendanceTable = () => {
  const [selectedDate, setSelectedDate] = useState<Date | string>(
    dayjs()?.format("YYYY-MM-DD")
  );

  const { data, isLoading } = useGetAllUsersAttendanceQuery({
    date: selectedDate,
  });

  const columns: TableProps<IAttendance>["columns"] = [
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
  ];

  // const handleRowClick = (user: IUser): void => {
  //   setSelectedUser(user);
  //   setShowUserDetailsModal(true);
  // };

  const handleDateChange = (value: Date) => {
    const date = dayjs(value)?.format("YYYY-MM-DD");
    setSelectedDate(date);
  };

  return (
    <section className="mt-spacing-s">
      <div className="flex justify-start items-center gap-spacing-s mb-spacing-s">
        <Typography.Title level={5} className="!p-0 !m-0">
          Select Date
        </Typography.Title>
        <DatePicker
          format={"DD-MM-YYYY"}
          onChange={handleDateChange}
          defaultValue={dayjs() as unknown as Date}
        />
      </div>
      {isLoading ? (
        <Spin
          indicator={<LoadingOutlined spin />}
          size="large"
          className="!w-full !h-full"
        />
      ) : (
        <Table<IAttendance>
          columns={columns}
          dataSource={data?.data || []}
          pagination={{ pageSize: 5 }}
          // onRow={(record) => ({
          //   onClick: () => handleRowClick(record),
          // })}
        />
      )}
    </section>
  );
};

export default HRDashboardAttendanceTable;
