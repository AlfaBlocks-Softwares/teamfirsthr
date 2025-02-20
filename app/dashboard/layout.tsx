"use client";
import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { usePathname } from "next/navigation";
import { DashboardNavItems } from "@/constants";
const { Header, Sider, Content } = Layout;
import { MenuOutlined } from "@ant-design/icons";

interface Props {
  children: React.ReactNode;
}

const MainLayout: React.FC<Props> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <Layout className="max-w-screen h-max min-h-screen flex flex-row justify-center items-center !bg-primary">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="!bg-primary min-h-screen"
      >
        <div className="py-6 px-4 flex items-center">
          <span className="text-secondary text-lg font-bold">User</span>
        </div>
        <Menu
          selectedKeys={[pathname]}
          className="!bg-primary !text-secondary !font-bold !pl-0"
          items={DashboardNavItems}
        />
      </Sider>
      <Layout className="self-center !bg-secondary !shadow-2xl !z-10 !rounded-2xl !mr-8 !h-[90dvh] overflow-hidden flex flex-col !-ml-1 px-8 py-4">
        <Header className="!bg-secondary !p-0 !flex !justify-between">
          <div className="flex !justify-center !items-center !gap-spacing-s">
            <MenuOutlined
              style={{ fontSize: "25px" }}
              onClick={() => setCollapsed(!collapsed)}
            />
            <h2>Good Morning</h2>
          </div>
        </Header>
        <Content className="overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] mt-spacing-l">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
