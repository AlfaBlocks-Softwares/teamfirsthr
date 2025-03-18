export interface IAttendance {
  user: string;
  check_in: string;
  check_out: string;
}

export interface IAttendanceTable {
  name: string;
  department: string;
  late: string;
  user?: string;
  check_in: string;
  check_out: string;
}
