import { IDashboardNavItems } from "@/types/dashboardlayout";
import { HomeOutlined } from "@ant-design/icons";
import Link from "next/link";
import { ROLE } from "../role";

const GetNavItems = () => {
  const userData = {
    name: "Muneeb",
    role: "manager",
  };

  const DashboardNavItems: IDashboardNavItems[] = [
    {
      key: "/dashboard",
      icon: <HomeOutlined />,
      label: (
        <Link href="/dashboard" className="!text-secondary !pl-0">
          Dashboard
        </Link>
      ),
    },
    {
      key: "/dashboard/profile",
      icon: <HomeOutlined />,
      label: (
        <Link href="/dashboard/profile" className="!text-secondary">
          Profile
        </Link>
      ),
    },
    {
      key: "/dashboard/management",
      icon: <HomeOutlined />,
      label: (
        <Link href="/dashboard/management" className="!text-secondary">
          Management
        </Link>
      ),
    },
    {
      key: "/dashboard/leave",
      icon: <HomeOutlined />,
      label: (
        <Link href="/dashboard/leave" className="!text-secondary">
          Leave
        </Link>
      ),
    },
  ];

  if (userData.role === ROLE.MANAGER) {
    DashboardNavItems.push({
      key: "/dashboard/leave-management",
      icon: <HomeOutlined />,
      label: (
        <Link href="/dashboard/leave-management" className="!text-secondary">
          Leave Management
        </Link>
      ),
    });
  }

  return DashboardNavItems;
};

export default GetNavItems;
