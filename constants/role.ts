export const ROLE = {
  EMPLOYEE: "employee",
  MANAGER: "manager",
  HR: "hr",
};

export const ROLEOptions = [
  {
    label: "EMPLOYEE",
    value: "employee",
  },
  {
    label: "MANAGER",
    value: "manager",
  },
  {
    label: "HR",
    value: "hr",
  },
];

export type Role = (typeof ROLE)[keyof typeof ROLE];
