import React from "react";
import { Modal, Descriptions, Avatar, Typography } from "antd";
import { IUser } from "@/types";
import dayjs from "dayjs";
const { Title, Text } = Typography;

interface Props {
  visible: boolean;
  setVisible: () => void;
  user: IUser | null;
}

const UsersDetailsModal: React.FC<Props> = ({ visible, setVisible, user }) => {
  return (
    <Modal
      centered
      title={<Title level={4}>User Details</Title>}
      open={visible}
      cancelText="Close"
      onCancel={setVisible}
      footer={null}
      width={800}
    >
      {user ? (
        <div className="mt-spacing-l max-h-[600px] overflow-y-scroll">
          <div
            style={{ display: "flex", alignItems: "center", marginBottom: 16 }}
          >
            <Avatar
              size={64}
              src={user?.profile_picture ? user?.profile_picture : undefined}
              style={{ fontSize: "24px" }}
            >
              {user?.first_name?.charAt(0).toUpperCase()}
            </Avatar>
            <div style={{ marginLeft: 16 }}>
              <Title level={5}>
                {user.first_name} {user.last_name}
              </Title>
              <Text type="secondary">{user.position}</Text>
            </div>
          </div>

          <Descriptions column={1} bordered>
            <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
            <Descriptions.Item label="Phone Number">
              {user.phone_number}
            </Descriptions.Item>
            <Descriptions.Item label="Department">
              {user.department}
            </Descriptions.Item>
            <Descriptions.Item label="Role">{user.role}</Descriptions.Item>
            <Descriptions.Item label="Salary">{user.salary}</Descriptions.Item>
            <Descriptions.Item label="Employment Status">
              {user.employment_status}
            </Descriptions.Item>
            <Descriptions.Item label="Date Joined">
              {dayjs(user.date_joined).format("YYYY-MM-DD")}
            </Descriptions.Item>
            {user.date_terminated && (
              <Descriptions.Item label="Date Terminated">
                {dayjs(user.date_terminated).format("YYYY-MM-DD")}
              </Descriptions.Item>
            )}
            <Descriptions.Item label="Gender">{user.gender}</Descriptions.Item>
            <Descriptions.Item label="Marital Status">
              {user.marital_status}
            </Descriptions.Item>
            <Descriptions.Item label="Address">
              {user.address}
            </Descriptions.Item>

            {user.emergency_contact && (
              <>
                <Descriptions.Item label="Emergency Contact Name">
                  {user.emergency_contact.name || "N/A"}
                </Descriptions.Item>
                <Descriptions.Item label="Emergency Contact Phone">
                  {user.emergency_contact.phone || "N/A"}
                </Descriptions.Item>
                <Descriptions.Item label="Relation">
                  {user.emergency_contact.relation || "N/A"}
                </Descriptions.Item>
              </>
            )}
          </Descriptions>
        </div>
      ) : (
        <Text type="secondary">No user data available</Text>
      )}
    </Modal>
  );
};

export default UsersDetailsModal;
