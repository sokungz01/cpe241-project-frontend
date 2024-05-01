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

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "1",
    icon: <ProfileOutlined />,
    label: "ข้อมูลพนักงาน",
  },
  {
    key: "2",
    icon: <FormOutlined />,
    label: "รายงานแจ้งซ่อม",
  },
  {
    key: "3",
    icon: <TableOutlined />,
    label: "ข้อมูลเครื่องจักร",
  },
  {
    key: "4",
    icon: <SettingOutlined />,
    label: "ข้อมูลชิ้นส่วนอุปกรณ์",
    children: [
      {
        key: "4-1",
        label: "ประวัติคลังสินค้า",
      },
    ],
  },
  {
    key: "5",
    icon: <DashboardOutlined />,
    label: "Dashboard",
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
          onCollapse={(value: any) => setCollapsed(value)}
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
            defaultSelectedKeys={["1"]}
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
