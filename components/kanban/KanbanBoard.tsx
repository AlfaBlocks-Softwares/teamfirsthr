"use client";
import { memo, useCallback, useEffect, useState } from "react";
import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./TaskCard";
import { nanoid } from "nanoid";
import { IColumn, ITask } from "@/types";
import { Input, Typography } from "antd";
import Button from "../ui/Button";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";

const defaultCols: IColumn[] = [
  {
    id: nanoid(),
    title: "Todo",
  },
  {
    id: nanoid(),
    title: "In progress",
  },
  {
    id: nanoid(),
    title: "Done",
  },
];

function KanbanBoard() {
  const [columns, setColumns] = useState<IColumn[]>(defaultCols);

  const [tasks, setTasks] = useState<ITask[]>([]);

  const [activeColumn, setActiveColumn] = useState<IColumn | null>(null);
  const [activeTask, setActiveTask] = useState<ITask | null>(null);
  const [createTaskDialog, setCreateTaskDialog] = useState(false);
  const [addTaskInput, setAddTaskInput] = useState<{
    title: string;
    description: string;
  }>({ title: "", description: "" });
  const [ID, setId] = useState<string>("");

  const [newColumnTitle, setNewColumnTitle] = useState<string>("");
  const [isAddingColumn, setIsAddingColumn] = useState<boolean>(false);

  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isDnDEnabled = windowWidth >= 768;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 30,
      },
    })
  );

  const cancelAddColumn = () => {
    setNewColumnTitle("");
    setIsAddingColumn(false);
  };

  const addColumn = () => {
    if (!newColumnTitle.trim()) return;

    const newColumn: IColumn = {
      id: nanoid(),
      title: newColumnTitle.trim(),
    };

    setColumns([...columns, newColumn]);
    setNewColumnTitle("");
    setIsAddingColumn(false);
  };

  const createTask = (columnId: string) => {
    const newTask: ITask = {
      id: nanoid(),
      columnID: columnId,
      title: addTaskInput.title,
      description: addTaskInput.description,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setCreateTaskDialog(false);
    setAddTaskInput({ title: "", description: "" });
  };

  const deleteTask = useCallback((id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }, []);

  const updateTask = useCallback(
    (id: string, content: { title: string; description: string }) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          if (task.id !== id) return task;
          return { ...task, ...content };
        })
      );
    },
    []
  );

  const updateColumn = useCallback((id: string, title: string) => {
    setColumns((prevColumns) =>
      prevColumns.map((col) => {
        if (col.id !== id) return col;
        return { ...col, title };
      })
    );
  }, []);

  const onDragStart = useCallback((event: DragStartEvent) => {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }, []);

  const onDragEnd = useCallback((event: DragEndEvent) => {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Column";
    if (!isActiveAColumn) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);
      const overColumnIndex = columns.findIndex((col) => col.id === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }, []);

  const onDragOver = useCallback((event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (tasks[activeIndex].columnID !== tasks[overIndex].columnID) {
          tasks[activeIndex].columnID = tasks[overIndex].columnID;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const taskToUpdate = tasks[activeIndex];
        if (taskToUpdate) {
          taskToUpdate.columnID = String(overId);
        }
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }, []);

  return (
    <DndContext
      sensors={isDnDEnabled ? sensors : []}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <div className="w-full h-full">
        <div className="w-full h-full flex flex-row gap-spacing-s overflow-hidden overflow-x-auto">
          <>
            {columns?.map((col) => (
              <ColumnContainer
                key={col.id}
                column={col}
                updateColumn={updateColumn}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                createTaskDialog={createTaskDialog}
                setCreateTaskDialog={setCreateTaskDialog}
                addTaskInput={addTaskInput}
                setAddTaskInput={setAddTaskInput}
                ID={ID}
                setId={setId}
                tasks={tasks.filter((task) => task.columnID === col.id)}
              />
            ))}

            <div className="h-max min-w-[300px] rounded-xl flex flex-col overflow-y-auto overflow-x-hidden border-2 border-primary bg-neutral-100 relative p-spacing-xs">
              {!isAddingColumn ? (
                <div
                  className="flex gap-spacing-xxs cursor-pointer"
                  onClick={() => setIsAddingColumn(true)}
                >
                  <PlusOutlined />
                  <Typography.Title level={5} className="!m-0 !p-0">
                    Add list
                  </Typography.Title>
                </div>
              ) : (
                <div className="flex flex-col gap-spacing-s p-spacing-xxs">
                  <Input
                    type="text"
                    value={newColumnTitle}
                    onChange={(e) => setNewColumnTitle(e.target.value)}
                    placeholder="New list title"
                    autoFocus
                  />
                  <div className="flex items-center gap-spacing-xs">
                    <Button onClick={addColumn} className="!w-max !h-max">
                      Add list
                    </Button>
                    <CloseOutlined
                      className="cursor-pointer"
                      onClick={cancelAddColumn}
                    />
                  </div>
                </div>
              )}
            </div>
          </>
        </div>
      </div>

      {createPortal(
        <DragOverlay>
          {activeColumn && (
            <ColumnContainer
              column={activeColumn}
              updateColumn={updateColumn}
              createTask={createTask}
              deleteTask={deleteTask}
              updateTask={updateTask}
              createTaskDialog={createTaskDialog}
              setCreateTaskDialog={setCreateTaskDialog}
              addTaskInput={addTaskInput}
              setAddTaskInput={setAddTaskInput}
              tasks={tasks.filter((task) => task?.columnID === activeColumn.id)}
              ID={ID}
              setId={setId}
            />
          )}
          {activeTask && (
            <TaskCard
              task={activeTask}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          )}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
}

export default memo(KanbanBoard);
