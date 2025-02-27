export const ROLE = {
  EMPLOYEE: "employee",
  MANAGER: "manager",
  HR: "hr",
};

export type Role = (typeof ROLE)[keyof typeof ROLE];
