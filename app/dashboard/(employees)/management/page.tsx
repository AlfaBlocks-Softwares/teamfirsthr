import dynamic from "next/dynamic";
import React from "react";

const KanbanBoard = dynamic(() => import("@/components/kanban/KanbanBoard"));

const EmployeeWorkManagement = () => {
  return <KanbanBoard />;
};

export default EmployeeWorkManagement;
