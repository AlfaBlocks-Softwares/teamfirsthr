"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { memo, useState } from "react";
import TaskCard from "./TaskCard";
import TaskModal from "./AddTaskModal";
import { MoreOutlined, PlusOutlined } from "@ant-design/icons";
import { IColumn, ITask } from "@/types";
import { Input, Typography } from "antd";
import ColumnsActionsModal from "./columnsactionmodal";

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
  addTaskInput: ITask;
  setAddTaskInput: React.Dispatch<React.SetStateAction<ITask>>;
  ID: string;
  setId: React.Dispatch<React.SetStateAction<string>>;
  deleteColumn: (id: string) => void;
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
  deleteColumn,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [showActionsModal, setShowActionsModal] = useState(false);
  const [modalPosition, setModalPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });

  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);

  const handleShowActionModal = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setModalPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    });
    setShowActionsModal(true);
  };

  const handleCancel = () => {
    setCreateTaskDialog(false);
    setAddTaskInput({ id: "", columnID: "", title: "", description: "" });
  };

  const handleClick = (id: string) => {
    setSelectedTask(null);
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

  const handleAddTask = () => {
    setId(column.id);
    setCreateTaskDialog(true);
  };

  const handleDeleteColumn = () => {
    deleteColumn(column?.id);
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
        className="p-spacing-s w-full flex justify-between relative"
      >
        <div
          className="w-full"
          onClick={() => {
            setEditMode(true);
          }}
        >
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
        <MoreOutlined
          className="cursor-pointer hover:bg-white p-spacing-xs rounded-lg transform rotate-90"
          onClick={handleShowActionModal}
        />
        {showActionsModal && (
          <ColumnsActionsModal
            visible={showActionsModal}
            onCancel={() => setShowActionsModal(false)}
            position={modalPosition}
            onAddTask={handleAddTask}
            onDeleteColumn={handleDeleteColumn}
          />
        )}
      </div>

      <div className="flex flex-grow flex-col justify-start items-center gap-spacing-xs overflow-x-hidden overflow-y-auto mb-spacing-s">
        {tasks.map((task: ITask) => (
          <TaskCard
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            updateTask={updateTask}
            onClick={() => {
              setSelectedTask(task);
              setCreateTaskDialog(true);
            }}
          />
        ))}
      </div>

      <TaskModal
        visible={createTaskDialog && ID === column.id}
        onCancel={handleCancel}
        onAdd={addTask}
        taskInput={addTaskInput}
        setTaskInput={setAddTaskInput}
        selectedTask={selectedTask}
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
