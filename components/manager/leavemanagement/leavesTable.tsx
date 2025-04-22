"use client";
import React, { useCallback, useState } from "react";
import { Table, Tag, Typography, Dropdown, Spin } from "antd";
import type { TableProps } from "antd";
// import type { MenuProps } from "antd";
import { LoadingOutlined, MoreOutlined } from "@ant-design/icons";
import { ILeaveDataType } from "@/types";
import LeaveDetailModal from "./LeaveDetailModal";
import { useGetAllUnapprovedLeavesQuery } from "@/redux/apis";
import dayjs from "dayjs";

const LeaveManagementTable = () => {
  const { data, isLoading } = useGetAllUnapprovedLeavesQuery();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<ILeaveDataType | null>(null);

  // const updateLeaveStatus = (key: string, newStatus: boolean): void => {
  //   // setData(
  //   //   data.map((item) =>
  //   //     item.key === key ? { ...item, status: newStatus } : item
  //   //   )
  //   // );

  //   if (selectedRow && selectedRow.key === key) {
  //     setSelectedRow({ ...selectedRow, status: newStatus });
  //   }
  // };

  // const handleMenuClick = (
  //   e: { key: string },
  //   record: ILeaveDataType
  // ): void => {
  //   // updateLeaveStatus(record.key, e.key);
  // };

  // const getMenuProps = (
  //   record: ILeaveDataType
  // ): {
  //   items: MenuProps["items"];
  //   onClick: (info: { key: string }) => void;
  // } => {
  //   const items: MenuProps["items"] = [
  //     {
  //       label: "Approved",
  //       key: "approved",
  //     },
  //     {
  //       label: "Rejected",
  //       key: "rejected",
  //     },
  //   ];

  //   return {
  //     items,
  //     onClick: (info) => return,
  //   };
  // };

  const handleRowClick = (record: ILeaveDataType): void => {
    setSelectedRow(record);
    setShowModal(true);
  };

  const getStatusColor = (status: boolean): string => {
    switch (status) {
      case true:
        return "success";
      case false:
        return "warning";
      default:
        return "default";
    }
  };

  const columns: TableProps<ILeaveDataType>["columns"] = [
    // {
    //   title: "Name",
    //   dataIndex: "name",
    //   key: "name",
    //   sorter: (a, b) => a?.name?.localeCompare(b?.name),
    //   // filterDropdown: () => (
    //   //   <Search
    //   //     placeholder="Search Department"
    //   //     onSearch={handleSearch}
    //   //     onChange={(e) => handleSearch(e.target.value)}
    //   //     style={{ padding: 8 }}
    //   //   />
    //   // ),
    //   // filterIcon: <SearchOutlined />,
    // },
    // {
    //   title: "Designation",
    //   dataIndex: "designation",
    //   key: "designation",
    //   sorter: (a, b) => a?.designation?.localeCompare(b?.designation),
    // },
    {
      title: "Start Date",
      dataIndex: "start_date",
      key: "start_date",
      render: (value) => dayjs(value).format("YYYY-MM-DD"),
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      key: "end_date",
      render: (value) => dayjs(value).format("YYYY-MM-DD"),
    },
    {
      title: "HR Approval",
      key: "hr_approval",
      dataIndex: "hr_approval",
      render: (_, { status }) => (
        <Tag color={getStatusColor(status)}>{status}</Tag>
      ),
    },
    {
      title: "Manager Approval",
      key: "manager_approval",
      dataIndex: "manager_approval",
      render: (_, { status }) => (
        <Tag color={getStatusColor(status)}>{status}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: () => {
        return (
          <div onClick={(e) => e.stopPropagation()}>
            <Dropdown trigger={["click"]}>
              <MoreOutlined />
            </Dropdown>
          </div>
        );
      },
    },
  ];

  // const handleModalStatusUpdate = (newStatus: boolean): void => {
  //   if (selectedRow) {
  //     updateLeaveStatus(selectedRow.key, newStatus);
  //   }
  // };

  const hideModal = useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <section className="">
      <Typography.Title level={3}>Leave Management</Typography.Title>
      {isLoading ? (
        <Spin
          indicator={<LoadingOutlined spin />}
          size="large"
          className="!w-full !h-full"
        />
      ) : (
        <Table<ILeaveDataType>
          columns={columns}
          dataSource={data?.data}
          pagination={{ pageSize: 8 }}
          rowKey="_id"
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
        />
      )}
      {showModal && (
        <LeaveDetailModal
          visible={showModal}
          onCancel={hideModal}
          leaveData={selectedRow}
          handleModalStatusUpdate={function (): void {
            throw new Error("Function not implemented.");
          }} // handleModalStatusUpdate={handleModalStatusUpdate}
        />
      )}
    </section>
  );
};

export default LeaveManagementTable;
