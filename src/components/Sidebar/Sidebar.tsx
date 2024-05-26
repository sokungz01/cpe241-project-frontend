import { AuthContext } from "@/context/auth.context";
import { SwalSuccess } from "@/utils/swal";
import {
  DashboardOutlined,
  FormOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProfileOutlined,
  SettingOutlined,
  TableOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import React, { useContext, useState } from "react";
import { LuWrench } from "react-icons/lu";
import { RiLogoutBoxLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";

const { Sider } = Layout;
type MenuItem = Required<MenuProps>["items"][number];

const Sidebar: React.FC = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    SwalSuccess("ออกจากระบบสำเร็จ", "กำลังเปลี่ยนเส้นทาง").then(() => {
      navigate("/login");
    });
  };

  let items: MenuItem[] = [];

  if (auth?.authContext.positionID === 4) {
    items = [
      {
        key: "1",
        icon: <ProfileOutlined />,
        label: <Link to="/tools/employee">ข้อมูลพนักงาน</Link>,
      },
      {
        key: "3",
        icon: <TableOutlined />,
        label: <Link to="/tools/machine">ข้อมูลเครื่องจักร</Link>,
      },
      {
        key: "3",
        icon: <FormOutlined />,
        label: "รายงาน",
        children: [
          {
            key: "3-1",
            label: <Link to="/tools/report">รายงานแจ้งซ่อม</Link>,
          },
          {
            key: "3-2",
            label: <Link to="/tools/report-period">รายงานประจำรอบ</Link>,
          },
        ],
      },
      {
        key: "4",
        icon: <SettingOutlined />,
        label: "อุปกรณ์",
        children: [
          {
            key: "4-1",
            label: <Link to="/tools/item">ข้อมูลชิ้นส่วนอุปกรณ์</Link>,
          },
          {
            key: "4-2",
            label: <Link to="/tools/item/log">ประวัติอุปกรณ์</Link>,
          },
        ],
      },
      {
        key: "5",
        icon: <LuWrench />,
        label: <Link to="/tools/settings">จัดการประเภท</Link>,
      },
      {
        key: "6",
        icon: <DashboardOutlined />,
        label: <Link to="/tools/dashboard">Dashboard</Link>,
      },
      {
        key: "logout",
        icon: <RiLogoutBoxLine />,
        label: <a onClick={() => handleLogout()}>ออกจากระบบ</a>,
      },
    ];
  } else if (auth?.authContext.positionID === 3) {
    items = [
      {
        key: "1",
        icon: <ProfileOutlined />,
        label: <Link to="/tools/employee">ข้อมูลพนักงาน</Link>,
      },
      {
        key: "3",
        icon: <TableOutlined />,
        label: <Link to="/tools/machine">ข้อมูลเครื่องจักร</Link>,
      },
      {
        key: "3",
        icon: <FormOutlined />,
        label: "รายงาน",
        children: [
          {
            key: "3-1",
            label: <Link to="/tools/report">รายงานแจ้งซ่อม</Link>,
          },
          {
            key: "3-2",
            label: <Link to="/tools/report-period">รายงานประจำรอบ</Link>,
          },
        ],
      },
      {
        key: "4",
        icon: <SettingOutlined />,
        label: "อุปกรณ์",
        children: [
          {
            key: "4-1",
            label: <Link to="/tools/item">ข้อมูลชิ้นส่วนอุปกรณ์</Link>,
          },
          {
            key: "4-2",
            label: <Link to="/tools/item/log">ประวัติอุปกรณ์</Link>,
          },
        ],
      },
      {
        key: "5",
        icon: <LuWrench />,
        label: <Link to="/tools/settings">จัดการประเภท</Link>,
      },
      {
        key: "logout",
        icon: <RiLogoutBoxLine />,
        label: <a onClick={() => handleLogout()}>ออกจากระบบ</a>,
      },
    ];
  } else if (auth?.authContext.positionID === 2) {
    items = [
      {
        key: "3",
        icon: <TableOutlined />,
        label: <Link to="/tools/machine">ข้อมูลเครื่องจักร</Link>,
      },
      {
        key: "3",
        icon: <FormOutlined />,
        label: "รายงาน",
        children: [
          {
            key: "3-1",
            label: <Link to="/tools/report">รายงานแจ้งซ่อม</Link>,
          },
          {
            key: "3-2",
            label: <Link to="/tools/report-period">รายงานประจำรอบ</Link>,
          },
        ],
      },
      {
        key: "4",
        icon: <SettingOutlined />,
        label: "อุปกรณ์",
        children: [
          {
            key: "4-1",
            label: <Link to="/tools/item">ข้อมูลชิ้นส่วนอุปกรณ์</Link>,
          },
          {
            key: "4-2",
            label: <Link to="/tools/item/log">ประวัติอุปกรณ์</Link>,
          },
        ],
      },
      {
        key: "logout",
        icon: <RiLogoutBoxLine />,
        label: <a onClick={() => handleLogout()}>ออกจากระบบ</a>,
      },
    ];
  } else {
    items = [
      {
        key: "3",
        icon: <FormOutlined />,
        label: <Link to="/tools/report">รายงานแจ้งซ่อม</Link>,
      },
      {
        key: "logout",
        icon: <RiLogoutBoxLine />,
        label: <a onClick={() => handleLogout()}>ออกจากระบบ</a>,
      },
    ];
  }
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
