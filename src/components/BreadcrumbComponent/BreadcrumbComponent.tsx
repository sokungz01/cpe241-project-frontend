import React from "react";
import { Breadcrumb } from "antd";

const BreadcrumbComponent: React.FC = () => (
  <>
    <div className=" px-6 py-6 bg-white">
      <Breadcrumb
        className="w-full text-sm align-middle"
        items={[
          {
            title: "ข้อมูลพนักงาน",
            href: "/",
          },
          {
            title: "ข้อมูลทั้งหมด",
          },
        ]}
      />
      <div className="pt-[16px]">
        <p className="text-xl align-middle"> ข้อมูลพนักงาน</p>
      </div>
    </div>
  </>
);

export default BreadcrumbComponent;
