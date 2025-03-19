import { ROLE } from "@/constants";

const allRoutes = {
  COMMON: [
    "/dashboard",
    "/dashboard/profile",
    "/dashboard/management",
    "/dashboard/leave",
    "/dashboard/attendance",
  ],

  [ROLE.EMPLOYEE]: [],

  [ROLE.MANAGER]: ["/dashboard/leave-management"],

  [ROLE.HR]: [
    "/dashboard/leave-management",
    "/dashboard/create-new-user",
    "/dashboard/users",
  ],
};

export function isPathAllowed(path: string, role: string): boolean {
  const allowedPaths = [...allRoutes.COMMON];

  allowedPaths.push(...allRoutes[ROLE.EMPLOYEE]);

  if (role === ROLE.MANAGER) {
    allowedPaths.push(...allRoutes[ROLE.MANAGER]);
  }

  if (role === ROLE.HR) {
    allowedPaths.push(...allRoutes[ROLE.HR]);
  }

  return allowedPaths.includes(path) ? true : false;
}
