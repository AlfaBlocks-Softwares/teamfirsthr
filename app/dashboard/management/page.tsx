import dynamic from "next/dynamic";
import React from "react";

const KanbanBoard = dynamic(() => import("@/components/kanban/KanbanBoard"));

const WorkManagement = () => {
  return <KanbanBoard />;
};

export default WorkManagement;
