"use client";
import { memo, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { DeleteFilled } from "@ant-design/icons";
import { CSS } from "@dnd-kit/utilities";
import { ITask } from "@/types";
import { Typography } from "antd";

interface Props {
  task: ITask;
  deleteTask: (id: string) => void;
  updateTask: (
    id: string,
    content: { title: string; description: string }
  ) => void;
  onClick?: () => void;
}

const TaskCard: React.FC<Props> = ({ task, deleteTask, onClick }) => {
  const [mouseIsOver, setMouseIsOver] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    deleteTask(task?.id);
  };
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="px-spacing-s h-max py-spacing-m items-center flex text-left cursor-grab relative w-full"
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onClick}
      className="bg-secondary p-spacing-s h-max py-spacing-m text-left rounded-xl cursor-grab relative task w-[90%] flex flex-col gap-spacing-xxs select-none justify-between"
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
    >
      <Typography.Title
        level={5}
        className="!m-0 !p-0 !w-[90%] !overflow-hidden !text-ellipsis !text-muted"
      >
        {task?.title}
      </Typography.Title>
      {mouseIsOver && <DeleteFilled onClick={handleDelete} />}
    </div>
  );
};

export default memo(TaskCard);
