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

export interface ILeave {
  name: string;
  designation: string;
  from: string;
  to: string;
  status: string;
}
