"use client";
import React, { useState } from "react";
import { Table, Tag, Typography, Dropdown, Modal, Spin } from "antd";
import type { TableProps } from "antd";
import type { MenuProps } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { IUser } from "@/types";
import { useGetAllUsersQuery } from "@/redux/apis";
import { LoadingOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { updateUserStatus } from "@/redux/slices/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUsersList } from "@/redux/selectors";

const UsersTable = () => {
  const { isLoading } = useGetAllUsersQuery();
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [confirmModalVisible, setConfirmModalVisible] =
    useState<boolean>(false);
  const [actionType, setActionType] = useState<"activate" | "deactivate">(
    "activate"
  );

  const usersList = useSelector(selectUsersList);

  const handleStatusChange = (record: IUser, newStatus: boolean): void => {
    setSelectedUser(record);
    setActionType(newStatus ? "activate" : "deactivate");
    setConfirmModalVisible(true);
  };

  const confirmStatusChange = (): void => {
    if (selectedUser) {
      dispatch(
        updateUserStatus({
          email: selectedUser.email,
          is_active: actionType === "activate",
        })
      );
      setConfirmModalVisible(false);
    }
  };

  const cancelStatusChange = (): void => {
    setConfirmModalVisible(false);
  };

  const getMenuProps = (record: IUser): MenuProps => {
    const items: MenuProps["items"] = [
      {
        label: "Set Active",
        key: "active",
        disabled: record.is_active,
        onClick: () => handleStatusChange(record, true),
      },
      {
        label: "Set Inactive",
        key: "inactive",
        danger: true,
        disabled: !record.is_active,
        onClick: () => handleStatusChange(record, false),
      },
    ];

    return { items };
  };

  const getFullName = (firstName: string, lastName: string): string => {
    return `${firstName} ${lastName}`;
  };

  const columns: TableProps<IUser>["columns"] = [
    {
      title: "Name",
      key: "name",
      render: (_, record) => getFullName(record.first_name, record.last_name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "is_active",
      render: (isActive) => (
        <Tag color={isActive ? "green" : "red"}>
          {isActive ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Date Joined",
      dataIndex: "date_joined",
      key: "date_joined",
      render: (value) => dayjs(value).format("YYYY-MM-DD"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div onClick={(e) => e.stopPropagation()}>
          <Dropdown menu={getMenuProps(record)} trigger={["click"]}>
            <MoreOutlined style={{ cursor: "pointer" }} />
          </Dropdown>
        </div>
      ),
    },
  ];

  return (
    <section>
      <Typography.Title level={3}>Users</Typography.Title>

      {isLoading ? (
        <Spin
          indicator={<LoadingOutlined spin />}
          size="large"
          className="!w-full !h-full"
        />
      ) : (
        <Table<IUser>
          columns={columns}
          dataSource={usersList || []}
          pagination={{ pageSize: 10 }}
          rowKey="email"
        />
      )}

      <Modal
        centered
        title={`${actionType === "activate" ? "Activate" : "Deactivate"} User`}
        open={confirmModalVisible}
        onOk={confirmStatusChange}
        onCancel={cancelStatusChange}
        okText={actionType === "activate" ? "Activate" : "Deactivate"}
        okButtonProps={{ danger: actionType === "deactivate" }}
        cancelText="Cancel"
      >
        <p>
          Are you sure you want to{" "}
          {actionType === "activate" ? "activate" : "deactivate"}{" "}
          {selectedUser &&
            getFullName(selectedUser.first_name, selectedUser.last_name)}
          ?
        </p>
      </Modal>
    </section>
  );
};

export default UsersTable;
