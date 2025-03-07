export const MARITAL_STATUS = {
  SINGLE: "single",
  MARRIED: "married",
};

export const MaritalStatusOptions = [
  {
    label: "SINGLE",
    value: "single",
  },
  {
    label: "MARRIED",
    value: "married",
  },
];

export type MaritalStatusType =
  (typeof MARITAL_STATUS)[keyof typeof MARITAL_STATUS];

export const DEPARTMENT = {
  TECH: "tech",
  SALES: "sales",
  OPERATIONS: "operations",
};

export const DepartmentOptions = [
  {
    label: "TECH",
    value: "tech",
  },
  {
    label: "SALES",
    value: "sales",
  },
  {
    label: "OPERATIONS",
    value: "operations",
  },
];

export type DepartmentType = (typeof DEPARTMENT)[keyof typeof DEPARTMENT];

export const Employement = {
  PROBATION: "probation",
  FULLTIME: "full-time",
  ONLEAVE: "on leave",
  TERMINATED: "terminated",
};

export const EmployementStatusOptions = [
  {
    label: "PROBATION",
    value: "probation",
  },
  {
    label: "FULL TIME",
    value: "full-time",
  },
  {
    label: "ON LEAVE",
    value: "on leave",
  },
  {
    label: "TERMINATED",
    value: "terminated",
  },
];

export type EmployementStatusType =
  (typeof Employement)[keyof typeof Employement];
