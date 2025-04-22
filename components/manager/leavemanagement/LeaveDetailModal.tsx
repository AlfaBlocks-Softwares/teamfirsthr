"use client";
import React from "react";
import { Modal } from "antd";
import Button from "../../ui/Button";
import { ILeaveDataType } from "@/types";

interface Props {
  visible: boolean;
  onCancel: () => void;
  leaveData: ILeaveDataType | null;
  handleModalStatusUpdate: (status: string) => void;
}

const LeaveDetailModal: React.FC<Props> = ({
  visible,
  onCancel,
  leaveData,
  handleModalStatusUpdate,
}) => {
  return (
    <Modal
      title="Leave Details"
      open={visible}
      onCancel={onCancel}
      centered
      footer={
        <div className="flex justify-end items-center gap-spacing-xs">
          {!leaveData?.status && (
            <>
              <Button
                key="approve"
                onClick={() => handleModalStatusUpdate("approved")}
              >
                Approve
              </Button>
              <Button
                key="reject"
                variant="secondary"
                onClick={() => handleModalStatusUpdate("rejected")}
              >
                Reject
              </Button>
            </>
          )}
        </div>
      }
    >
      Leave Details
    </Modal>
  );
};

export default LeaveDetailModal;
