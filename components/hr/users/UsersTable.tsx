"use client";
import React, { useState } from "react";
import { Table, Tag, Typography, Dropdown, Modal } from "antd";
import type { TableProps } from "antd";
import type { MenuProps } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { IUser } from "@/types";
// import { useGetAllUsersQuery } from "@/redux/apis";

const UsersTable = () => {
  // const { users, isLoading } = useGetAllUsersQuery();
  const [data, setData] = useState<IUser[]>([
    {
      first_name: "John",
      last_name: "Brown",
      email: "john.brown@example.com",
      position: "Developer",
      department: "Engineering",
      role: "Member",
      company: "TechCorp",
      hashed_password: "xxxx",
      gender: "Male",
      marital_status: "Single",
      date_of_birth: "1990-05-15",
      phone_number: "123-456-7890",
      salary: 75000,
      address: "123 Main St",
      profile_picture: "/profiles/john.jpg",
      employment_status: "Full-time",
      date_joined: "2023-01-15",
      manager: "Alice Director",
      is_active: true,
      emergency_contact: {
        name: "Jane Brown",
        phone: "987-654-3210",
        relation: "Spouse",
      },
    },
    {
      first_name: "Jim",
      last_name: "Green",
      email: "jim.green@example.com",
      position: "Manager",
      department: "Product",
      role: "Manager",
      company: "TechCorp",
      hashed_password: "xxxx",
      gender: "Male",
      marital_status: "Married",
      date_of_birth: "1985-08-22",
      phone_number: "123-456-7891",
      salary: 95000,
      address: "456 Oak St",
      profile_picture: "/profiles/jim.jpg",
      employment_status: "Full-time",
      date_joined: "2022-03-10",
      is_active: true,
      emergency_contact: {
        name: "Mary Green",
        phone: "987-654-3211",
        relation: "Spouse",
      },
    },
    {
      first_name: "Joe",
      last_name: "Black",
      email: "joe.black@example.com",
      position: "Designer",
      department: "Design",
      role: "Member",
      company: "TechCorp",
      hashed_password: "xxxx",
      gender: "Male",
      marital_status: "Single",
      date_of_birth: "1992-11-30",
      phone_number: "123-456-7892",
      salary: 70000,
      address: "789 Pine St",
      profile_picture: "/profiles/joe.jpg",
      employment_status: "Full-time",
      date_joined: "2023-05-20",
      manager: "Jim Green",
      is_active: false,
      date_terminated: "2024-01-15",
      emergency_contact: {
        name: "Robert Black",
        phone: "987-654-3212",
        relation: "Father",
      },
    },
    {
      first_name: "Alice",
      last_name: "Director",
      email: "alice.director@example.com",
      position: "Director",
      department: "Executive",
      role: "Admin",
      company: "TechCorp",
      hashed_password: "xxxx",
      gender: "Female",
      marital_status: "Married",
      date_of_birth: "1980-03-25",
      phone_number: "123-456-7893",
      salary: 120000,
      address: "101 Executive Blvd",
      profile_picture: "/profiles/alice.jpg",
      employment_status: "Full-time",
      date_joined: "2020-09-01",
      is_active: true,
      emergency_contact: {
        name: "David Director",
        phone: "987-654-3213",
        relation: "Spouse",
      },
    },
    {
      first_name: "Sarah",
      last_name: "Smith",
      email: "sarah.smith@example.com",
      position: "Developer",
      department: "Engineering",
      role: "Member",
      company: "TechCorp",
      hashed_password: "xxxx",
      gender: "Female",
      marital_status: "Single",
      date_of_birth: "1993-07-12",
      phone_number: "123-456-7894",
      salary: 78000,
      address: "222 Tech Ave",
      profile_picture: "/profiles/sarah.jpg",
      employment_status: "Full-time",
      date_joined: "2023-02-15",
      manager: "Alice Director",
      is_active: true,
      emergency_contact: {
        name: "Michael Smith",
        phone: "987-654-3214",
        relation: "Brother",
      },
    },
  ]);

  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [confirmModalVisible, setConfirmModalVisible] =
    useState<boolean>(false);
  const [actionType, setActionType] = useState<"activate" | "deactivate">(
    "activate"
  );

  const handleStatusChange = (record: IUser, newStatus: boolean): void => {
    setSelectedUser(record);
    setActionType(newStatus ? "activate" : "deactivate");
    setConfirmModalVisible(true);
  };

  const confirmStatusChange = (): void => {
    if (selectedUser) {
      setData(
        data.map((user) =>
          user.email === selectedUser.email
            ? {
                ...user,
                is_active: actionType === "activate",
              }
            : user
        )
      );
      // dispatch(updateUserStatus({ email: selectedUser.email, is_active: actionType === "activate" }));
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
      title: "Manager",
      dataIndex: "manager",
      key: "manager",
      render: (manager) => manager || "—",
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
      <Table<IUser>
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
        rowKey="email"
      />

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
