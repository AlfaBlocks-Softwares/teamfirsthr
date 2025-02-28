import dynamic from "next/dynamic";

const LeaveManagementTable = dynamic(
  () => import("@/components/manager/leavemanagement/leavesTable")
);

export default function LeaveManagement() {
  return <LeaveManagementTable />;
}
