"use client";
import React, { useState } from "react";
import { Modal, Typography } from "antd";

const Options = [
  { key: "add", name: "Add a task" },
  { key: "delete", name: "Delete" },
];

interface TaskModalProps {
  visible: boolean;
  onCancel: () => void;
  position: { top: number; left: number };
  onAddTask: () => void;
  onDeleteColumn: () => void;
}

const ColumnsActionsModal: React.FC<TaskModalProps> = ({
  visible,
  onCancel,
  position,
  onAddTask,
  onDeleteColumn,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleActionClick = (key: string) => {
    if (key === "add") {
      onAddTask();
      onCancel();
    } else if (key === "delete") {
      setShowConfirm(true);
    }
  };

  return (
    <>
      <Modal
        title="List actions"
        open={visible}
        onCancel={onCancel}
        footer={null}
        mask={false}
        style={{
          position: "absolute",
          top: position.top,
          left: position.left,
          margin: 0,
          padding: 0,
        }}
        className="absolute !w-[200px] !p-0 !m-0"
      >
        <div className="flex flex-col gap-spacing-xxs mt-spacing-m">
          {Options.map((itm) => (
            <Typography.Title
              level={5}
              key={itm.key}
              className="!w-full !p-0 !m-0 !text-black hover:!text-primary !font-medium !text-md !cursor-pointer hover:!font-bold"
              onClick={() => handleActionClick(itm.key)}
            >
              {itm.name}
            </Typography.Title>
          ))}
        </div>
      </Modal>

      <Modal
        title="Confirm Deletion"
        open={showConfirm}
        centered
        onCancel={() => setShowConfirm(false)}
        onOk={() => {
          onDeleteColumn();
          setShowConfirm(false);
          onCancel();
        }}
      >
        Are you sure you want to delete this column?
      </Modal>
    </>
  );
};

export default ColumnsActionsModal;
