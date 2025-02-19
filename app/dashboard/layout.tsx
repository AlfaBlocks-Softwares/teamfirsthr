"use client";
import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { usePathname } from "next/navigation";
import Button from "@/components/ui/Button";
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
    <Layout className="!bg-primary !h-full !min-h-screen flex flex-row justify-center items-center">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="!bg-primary !min-h-screen"
      >
        <div className="py-6 px-4 flex items-center">
          <div className="text-secondary text-lg font-bold">User</div>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[pathname]}
          className="!bg-primary !text-secondary !font-bold !pl-0"
          items={DashboardNavItems}
        />
      </Sider>
      <Layout className="!h-[95vh] !bg-secondary !shadow-2xl !z-10 !rounded-2xl !mr-8">
        <Header className="!bg-secondary !p-4 !flex !justify-between !items-center !shadow-lg !rounded-lg">
          <Button
            icon={<MenuOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="!bg-secondary !text-black !border-none"
          />
        </Header>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
