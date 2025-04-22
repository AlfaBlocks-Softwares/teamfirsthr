/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useMemo } from "react";
import { Modal, Input, Form, Select } from "antd";
import Button from "../ui/Button";
import { useGetAllUsersQuery } from "@/redux/apis";
import { ITask, IUser } from "@/types";
import { useSelector } from "react-redux";
import { selectUsersList } from "@/redux/selectors";

interface TaskModalProps {
  visible: boolean;
  onCancel: () => void;
  onAdd: () => void;
  taskInput: ITask;
  setTaskInput: React.Dispatch<React.SetStateAction<ITask>>;
  selectedTask: ITask | null;
}

const TaskModal: React.FC<TaskModalProps> = ({
  visible,
  onCancel,
  onAdd,
  taskInput,
  setTaskInput,
  selectedTask,
}) => {
  useGetAllUsersQuery();
  const usersList = useSelector(selectUsersList);
  const [form] = Form.useForm<ITask>();

  const usersoptions = useMemo(() => {
    return usersList?.map((user: IUser) => ({
      value: user._id,
      label: `${user.first_name} ${user?.last_name}`,
    }));
  }, [usersList]);

  useEffect(() => {
    if (selectedTask) {
      setTaskInput(selectedTask);
      form.setFieldValue("title", selectedTask?.title);
      form.setFieldValue("description", selectedTask?.description);
      form.setFieldValue("assignedTo", selectedTask?.assignedTo);
    }
    return () => {
      setTaskInput({
        id: "",
        columnID: "",
        title: "",
        description: "",
        assignedTo: "",
      });
    };
  }, [selectedTask]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTaskInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUserSelect = (value: string) => {
    setTaskInput((prev: ITask) => ({
      ...prev,
      assignedTo: value,
    }));
  };

  const onFinish = (values: ITask) => {
    if (values) onAdd();
    form.resetFields();
    setTaskInput({
      id: "",
      columnID: "",
      title: "",
      description: "",
      assignedTo: "",
    });
  };

  return (
    <Modal
      title={selectedTask ? "Edit Task" : "Add New Task"}
      open={visible}
      onCancel={onCancel}
      centered
      footer={null}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label="Title"
          name="title"
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

        <Form.Item label="Description" name="description">
          <Input.TextArea
            name="description"
            value={taskInput.description}
            onChange={handleChange}
            placeholder="Enter task description"
            rows={4}
          />
        </Form.Item>

        <Form.Item label="Assigned To" name="assignedTo">
          <Select
            placeholder="Select a user"
            style={{ width: "100%" }}
            onChange={handleUserSelect}
            value={taskInput?.assignedTo}
            options={usersoptions}
          />
        </Form.Item>

        <div className="w-full self-end flex items-center justify-end gap-4 mt-6">
          <Button htmlType="submit">{selectedTask ? "Update" : "Add"}</Button>
        </div>
      </Form>
    </Modal>
  );
};

export default TaskModal;
