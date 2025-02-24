export interface ILeaveTypeOptions {
  label: string;
  value: string;
}

export interface IEmployeeLeaveForm {
  reason: string;
  type: ILeaveTypeOptions;
  startDate: string;
  endDate: string;
  files?: File[];
}
