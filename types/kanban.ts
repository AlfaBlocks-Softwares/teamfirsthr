export interface ITask {
  id: string;
  columnID: string;
  title: string;
  description?: string;
  assignedTo?: string;
}

export interface IColumn {
  id: string;
  title: string;
}
