import React from "react";
import {
  FormOutlined,
  TableOutlined,
  ProfileOutlined,
  SettingOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";

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
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };

  return (
    <div className=" shadow-lg">
      <Menu
        onClick={onClick}
        style={{ width: 256 }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={[]}
        mode="inline"
        items={items}
        className="flex flex-col h-screen py-1"
      />
    </div>
  );
};

export default Sidebar;
