import { IDashboardNavItems } from "@/types/dashboardlayout";
import { HomeOutlined } from "@ant-design/icons";
import Link from "next/link";

export const DashboardNavItems: IDashboardNavItems[] = [
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
    key: "/dashboard/leave",
    icon: <HomeOutlined />,
    label: (
      <Link href="/dashboard/leave" className="!text-secondary">
        Leave
      </Link>
    ),
  },
  {
    key: "/settings",
    icon: <HomeOutlined />,
    label: (
      <Link href="/dashboard" className="!text-secondary">
        employees
      </Link>
    ),
  },
  {
    key: "/profile2",
    icon: <HomeOutlined />,
    label: (
      <Link href="/dashboard" className="!text-secondary">
        employees
      </Link>
    ),
  },
  {
    key: "/employees",
    icon: <HomeOutlined />,
    label: (
      <Link href="/dashboard" className="!text-secondary">
        employees
      </Link>
    ),
  },
];
