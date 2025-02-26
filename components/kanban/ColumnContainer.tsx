"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { memo, useState } from "react";
import TaskCard from "./TaskCard";
import TaskModal from "./AddTaskModal";
import { PlusOutlined } from "@ant-design/icons";
import { IColumn, ITask } from "@/types";
import { Input, Typography } from "antd";

interface Props {
  column: IColumn;
  updateColumn: (id: string, title: string) => void;
  createTask: (columnId: string) => void;
  tasks: ITask[];
  deleteTask: (taskId: string) => void;
  updateTask: (
    taskId: string,
    content: { title: string; description: string }
  ) => void;
  createTaskDialog: boolean;
  setCreateTaskDialog: (show: boolean) => void;
  addTaskInput: { title: string; description: string };
  setAddTaskInput: React.Dispatch<
    React.SetStateAction<{ title: string; description: string }>
  >;
  ID: string;
  setId: React.Dispatch<React.SetStateAction<string>>;
}

export const ColumnContainer: React.FC<Props> = ({
  column,
  updateColumn,
  createTask,
  tasks,
  deleteTask,
  updateTask,
  createTaskDialog,
  setCreateTaskDialog,
  addTaskInput,
  setAddTaskInput,
  ID,
  setId,
}) => {
  const [editMode, setEditMode] = useState(false);

  const handleCancel = () => {
    setCreateTaskDialog(false);
    setAddTaskInput({ title: "", description: "" });
  };

  const handleClick = (id: string) => {
    setId(id);
    setCreateTaskDialog(true);
  };

  const addTask = () => {
    createTask(ID);
  };

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="w-[300px] rounded-md flex flex-col"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="h-max min-w-[300px] rounded-xl flex flex-col overflow-y-auto overflow-x-hidden border-2 border-primary bg-neutral-100 relative"
    >
      <div
        {...attributes}
        {...listeners}
        onClick={() => {
          setEditMode(true);
        }}
        className="p-spacing-s"
      >
        <div className="">
          {!editMode && (
            <Typography.Title level={5} className="!p-0 !m-0">
              {column.title}
            </Typography.Title>
          )}
          {editMode && (
            <Input
              value={column.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateColumn(column.id, e.target.value)
              }
              autoFocus
              onBlur={() => {
                setEditMode(false);
              }}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
              }}
            />
          )}
        </div>
      </div>

      <div className="flex flex-grow flex-col justify-start items-center gap-spacing-xs overflow-x-hidden overflow-y-auto mb-spacing-s">
        {tasks.map((task: ITask) => (
          <TaskCard
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            updateTask={updateTask}
          />
        ))}
      </div>

      <TaskModal
        visible={createTaskDialog && ID === column.id}
        onCancel={handleCancel}
        onAdd={addTask}
        taskInput={addTaskInput}
        setTaskInput={setAddTaskInput}
      />

      <div
        className="sticky left-0 bottom-0 !w-full flex items-center justify-start gap-spacing-xs !bg-primary !text-secondary py-spacing-xs px-spacing-xs cursor-pointer"
        onClick={() => handleClick(column.id)}
      >
        <PlusOutlined />
        Add task
      </div>
    </div>
  );
};

export default memo(ColumnContainer);
