"use client";
import React, { useCallback, useState } from "react";
import { Table, Tag, Typography, Dropdown } from "antd";
import type { TableProps } from "antd";
import type { MenuProps } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { ILeaveDataType } from "@/types";
import LeaveDetailModal from "./LeaveDetailModal";

const LeaveManagementTable = () => {
  const [data, setData] = useState<ILeaveDataType[]>([
    {
      key: "1",
      name: "John Brown",
      designation: "Developer",
      from: "2025-02-01",
      to: "2025-02-10",
      status: "pending",
    },
    {
      key: "2",
      name: "Jim Green",
      designation: "Manager",
      from: "2025-02-05",
      to: "2025-02-12",
      status: "approved",
    },
    {
      key: "3",
      name: "Joe Black",
      designation: "Developer",
      from: "2025-02-15",
      to: "2025-02-20",
      status: "rejected",
    },
    {
      key: "4",
      name: "John Brown",
      designation: "Developer",
      from: "2025-03-01",
      to: "2025-03-10",
      status: "pending",
    },
    {
      key: "5",
      name: "Jim Green",
      designation: "Manager",
      from: "2025-03-05",
      to: "2025-03-12",
      status: "approved",
    },
    {
      key: "6",
      name: "Joe Black",
      designation: "Developer",
      from: "2025-03-10",
      to: "2025-03-20",
      status: "pending",
    },
    {
      key: "7",
      name: "Alice White",
      designation: "Designer",
      from: "2025-03-15",
      to: "2025-03-22",
      status: "pending",
    },
    {
      key: "8",
      name: "Bob Black",
      designation: "Developer",
      from: "2025-03-25",
      to: "2025-03-30",
      status: "rejected",
    },
    {
      key: "9",
      name: "Charlie Brown",
      designation: "Team Lead",
      from: "2025-02-10",
      to: "2025-02-15",
      status: "approved",
    },
    {
      key: "10",
      name: "Daisy Green",
      designation: "Developer",
      from: "2025-03-05",
      to: "2025-03-12",
      status: "pending",
    },
  ]);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<ILeaveDataType | null>(null);

  const updateLeaveStatus = (key: string, newStatus: string): void => {
    setData(
      data.map((item) =>
        item.key === key ? { ...item, status: newStatus } : item
      )
    );

    if (selectedRow && selectedRow.key === key) {
      setSelectedRow({ ...selectedRow, status: newStatus });
    }
  };

  const handleMenuClick = (
    e: { key: string },
    record: ILeaveDataType
  ): void => {
    updateLeaveStatus(record.key, e.key);
  };

  const getMenuProps = (
    record: ILeaveDataType
  ): {
    items: MenuProps["items"];
    onClick: (info: { key: string }) => void;
  } => {
    const items: MenuProps["items"] = [
      {
        label: "Approved",
        key: "approved",
      },
      {
        label: "Rejected",
        key: "rejected",
      },
    ];

    return {
      items,
      onClick: (info) => handleMenuClick(info, record),
    };
  };

  const handleRowClick = (record: ILeaveDataType): void => {
    setSelectedRow(record);
    setShowModal(true);
  };

  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case "approved":
        return "success";
      case "rejected":
        return "error";
      case "pending":
        return "warning";
      default:
        return "default";
    }
  };

  const columns: TableProps<ILeaveDataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "From",
      dataIndex: "from",
      key: "from",
    },
    {
      title: "To",
      dataIndex: "to",
      key: "to",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (_, { status }) => (
        <Tag color={getStatusColor(status)} key={status}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => {
        return record.status === "pending" ? (
          <div onClick={(e) => e.stopPropagation()}>
            <Dropdown menu={getMenuProps(record)} trigger={["click"]}>
              <MoreOutlined />
            </Dropdown>
          </div>
        ) : null;
      },
    },
  ];

  const handleModalStatusUpdate = (newStatus: string): void => {
    if (selectedRow) {
      updateLeaveStatus(selectedRow.key, newStatus);
    }
  };

  const hideModal = useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <section className="">
      <Typography.Title level={3}>Leave Management</Typography.Title>
      <Table<ILeaveDataType>
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 8 }}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
      />
      {showModal && (
        <LeaveDetailModal
          visible={showModal}
          onCancel={hideModal}
          leaveData={selectedRow}
          handleModalStatusUpdate={handleModalStatusUpdate}
        />
      )}
    </section>
  );
};

export default LeaveManagementTable;
