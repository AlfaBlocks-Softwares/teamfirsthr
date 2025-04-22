"use client";
import React, { useEffect, useState } from "react";
import { Layout, Menu, Typography } from "antd";
import { usePathname, useRouter } from "next/navigation";
const { Header, Sider, Content } = Layout;
import {
  CloseCircleOutlined,
  LoginOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import GetNavItems from "@/constants/dashboard/NavItems";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "@/redux/selectors";
import { resetAuthState } from "@/redux/slices/auth/authSlice";
import UserProfileCard from "@/components/ui/profilecard";
import { resetUserState } from "@/redux/slices/user/userSlice";
import { resetAttendanceState } from "@/redux/slices/attendance/attendanceSlice";
import { deleteCookie } from "@/utils/cookies";

interface Props {
  children: React.ReactNode;
}

const MainLayout: React.FC<Props> = ({ children }) => {
  const user = useSelector(selectUser);
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(
    window?.innerWidth < 768 ? true : false
  );
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const showNavbar = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = async () => {
    await deleteCookie("auth");
    await deleteCookie("role");
    dispatch(resetAuthState());
    dispatch(resetUserState());
    dispatch(resetAttendanceState());
    router.replace("/");
  };

  return (
    <Layout className="max-w-screen h-[100dvh] flex flex-row justify-center items-center !bg-primary">
      {!isMobile && (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="!bg-primary min-h-screen"
        >
          <UserProfileCard collapsed={collapsed} />
          <Menu
            selectedKeys={[pathname]}
            className="!bg-primary !text-secondary !font-bold !pl-0"
            items={GetNavItems()}
          />
        </Sider>
      )}
      <Layout
        className={`!h-[90dvh]  self-center !bg-secondary !shadow-2xl !z-10 !rounded-2xl overflow-hidden flex flex-col !-ml-1 px-8 py-4 ${
          isMobile ? "!mr-0 !w-[100%]" : "!mr-8 !w-[95%]"
        }`}
      >
        <Header className="!bg-secondary !p-0 !flex !justify-between">
          <div className="flex !justify-center !items-center !gap-spacing-s">
            <MenuOutlined
              style={{ fontSize: "20px", marginRight: "1rem" }}
              onClick={showNavbar}
            />
            <Typography.Title
              level={2}
              className="!m-0 !p-0 !font-medium !text-[34px]"
            >
              Good Morning,
            </Typography.Title>
            <Typography.Title
              level={2}
              className="!m-0 !p-0 !font-medium !text-[34px]"
            >
              {user?.first_name ?? ""}
            </Typography.Title>
          </div>
          <LoginOutlined
            style={{ fontSize: "30px", cursor: "Pointer" }}
            onClick={handleLogout}
          />
        </Header>
        <Content className="overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] mt-spacing-l">
          {children}
        </Content>
      </Layout>

      {isMobile && !collapsed && (
        <nav className="w-[300px] !bg-primary min-h-screen fixed left-0 top-0 bottom-0 z-20 transition-all duration-300">
          <div className="py-6 px-4 flex justify-between items-center">
            <span className="text-secondary text-lg font-bold">
              {user?.first_name ?? ""}
            </span>
            <CloseCircleOutlined
              style={{ fontSize: "30px" }}
              className="!text-secondary"
              onClick={showNavbar}
            />
          </div>
          <Menu
            selectedKeys={[pathname]}
            className="!bg-primary !text-secondary !font-bold !pl-0"
            items={GetNavItems()}
          />
        </nav>
      )}
    </Layout>
  );
};

export default MainLayout;
