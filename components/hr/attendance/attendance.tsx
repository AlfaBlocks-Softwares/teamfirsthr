/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import { Table, Typography, Spin } from "antd";
import type { TableProps } from "antd";
import { IAttendance } from "@/types";
import { useGetAllAttendanceofLoggedInUserQuery } from "@/redux/apis";
import { LoadingOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import {
  selectIndividualUserAllAttendance,
  selectUser,
} from "@/redux/selectors";
import moment from "moment";

const UserAttendanceTable = () => {
  const { isLoading } = useGetAllAttendanceofLoggedInUserQuery();
  const attendanceList = useSelector(selectIndividualUserAllAttendance);
  const user = useSelector(selectUser);

  const columns: TableProps<IAttendance>["columns"] = [
    {
      title: "Name",
      key: "name",
      render: () => `${user?.first_name} ${user?.last_name}`,
      //@ts-ignore
      sorter: (a, b) => a?.first_name?.localeCompare(b?.first_name),
    },
    {
      title: "Check In",
      dataIndex: "check_in",
      key: "check_in",
      render: (value) => moment(value).format("dddd, MMMM D, YYYY hh:mm A"),
      sorter: (a, b) => a?.check_in?.localeCompare(b?.check_in),
    },
    {
      title: "Check Out",
      dataIndex: "check_out",
      key: "check_out",
      render: (value) => moment(value).format("dddd, MMMM D, YYYY hh:mm A"),
      sorter: (a, b) => a?.check_out?.localeCompare(b?.check_out),
    },
  ];

  // const handleRowClick = (user: IUser): void => {
  //   setSelectedUser(user);
  //   setShowUserDetailsModal(true);
  // };

  return (
    <section>
      <Typography.Title level={3}>Attendance</Typography.Title>

      {isLoading ? (
        <Spin
          indicator={<LoadingOutlined spin />}
          size="large"
          className="!w-full !h-full"
        />
      ) : (
        <Table<IAttendance>
          columns={columns}
          dataSource={attendanceList || []}
          pagination={{ pageSize: 10 }}
          // onRow={(record) => ({
          //   onClick: () => handleRowClick(record),
          // })}
        />
      )}
    </section>
  );
};

export default UserAttendanceTable;
