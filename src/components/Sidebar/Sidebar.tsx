import React from "react";
import { useState } from "react";
import {
  FormOutlined,
  TableOutlined,
  ProfileOutlined,
  SettingOutlined,
  DashboardOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import { Link } from "react-router-dom";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "1",
    icon: <ProfileOutlined />,
    label: <Link to="/tools/employeeInfo">ข้อมูลพนักงาน</Link>,
  },
  {
    key: "2",
    icon: <FormOutlined />,
    label: <Link to="/tools/fixReport">รายงานแจ้งซ่อม</Link>,
  },
  {
    key: "3",
    icon: <TableOutlined />,
    label: <Link to="/tools/machineInfo">ข้อมูลเครื่องจักร</Link>,
  },
  {
    key: "4",
    icon: <SettingOutlined />,
    label: "ข้อมูลชิ้นส่วนอุปกรณ์",
    children: [
      {
        key: "4-1",
        label: <Link to="/tools/stockHistory">ประวัติคลังสินค้า</Link>,
      },
    ],
  },
  {
    key: "5",
    icon: <DashboardOutlined />,
    label: <Link to="/tools/dashboard">Dashboard</Link>,
  },
];

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <>
      <Layout className="shadow-md overflow-hidden">
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value: boolean) => setCollapsed(value)}
          className=""
          trigger={null}
          theme="light"
          width={250}
          breakpoint="lg"
        >
          <button
            className={`text-center w-full py-2 hover:bg-[#eee] border-r border-[#f0f0f0]`}
            onClick={() => {
              setCollapsed(!collapsed);
            }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </button>
          <Menu
            theme="light"
            defaultSelectedKeys={['1']}
            mode="inline"
            items={items}
            className="h-screen flex flex-col"
          />
        </Sider>
      </Layout>
    </>
  );
};

export default Sidebar;
