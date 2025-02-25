"use client";
import React from "react";
import { Modal, Input, Form } from "antd";
import Button from "../ui/Button";

interface TaskModalProps {
  visible: boolean;
  onCancel: () => void;
  onAdd: () => void;
  taskInput: { title: string; description: string };
  setTaskInput: React.Dispatch<
    React.SetStateAction<{ title: string; description: string }>
  >;
}

const TaskModal: React.FC<TaskModalProps> = ({
  visible,
  onCancel,
  onAdd,
  taskInput,
  setTaskInput,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onFinish = (values: { title: string; description: string }) => {
    if (values) onAdd();
  };

  return (
    <Modal
      title="Add New Task"
      open={visible}
      onCancel={onCancel}
      centered
      footer={null}
    >
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Title"
          required
          rules={[
            { required: true, message: "Please enter a title for the task" },
          ]}
        >
          <Input
            name="title"
            value={taskInput.title}
            onChange={handleChange}
            placeholder="Enter task title"
            autoFocus
          />
        </Form.Item>

        <div className="w-full self-end flex items-center justify-end gap-4 mt-6">
          <Button onClick={onCancel} variant="secondary" htmlType="button">
            Cancel
          </Button>
          <Button htmlType="submit">Add</Button>
        </div>
      </Form>
    </Modal>
  );
};

export default TaskModal;
