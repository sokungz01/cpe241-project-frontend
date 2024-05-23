import { GetALlItemCategory } from "@/api/itemCategory.api";
import { GetAllMachineType } from "@/api/machinetype.api";
import { GetAllPosition } from "@/api/position.api";
import BreadcrumbComponent from "@/components/BreadcrumbComponent/BreadcrumbComponent";
import TableInfo from "@/components/Info/TableInfo";
import { IMachineType } from "@/interface/machinetype.interface";
import { IPosition } from "@/interface/position.interface";
import { IBreadcrumb } from "@/interface/utils.interface";
import { Button, Space } from "antd";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { IItemCategory } from "../../interface/itemCategory.interface";

const SettingsInfo = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [itemCategory, setItemCatagory] = useState<IItemCategory[]>([]);
  const [position, setPosition] = useState<IPosition[]>([]);
  const [machineType, setMachineType] = useState<IMachineType[]>([]);

  const BreadCrumbLinks: IBreadcrumb[] = [
    {
      title: "จัดการประเภท",
      href: "",
    },
    {
      title: "ตั้งค่าประเภทข้อมูล",
    },
  ];

  const fetchItemCategory = async () => {
    setLoading(true);
    try {
      const result = await GetALlItemCategory();
      setItemCatagory(result.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      throw new Error("Error! Fetching data failed");
    }
  };

  const fetchPosition = async () => {
    setLoading(true);
    try {
      const result = await GetAllPosition();
      setPosition(result.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      throw new Error("Error! Fetching data failed");
    }
  };

  const fetchMachineType = async () => {
    setLoading(true);
    try {
      const result = await GetAllMachineType();
      setMachineType(result.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      throw new Error("Error! Fetching data failed");
    }
  };

  useMemo(() => {
    Promise.all([fetchItemCategory(), fetchPosition(), fetchMachineType()]);
  }, []);

  const columnsPosition = [
    {
      title: "เลขประจำตำแหน่ง",
      dataIndex: "positionID",
      key: "positionID",
    },
    {
      title: "ชื่อตำแหน่ง",
      key: "positionName",
      dataIndex: "positionName",
    },
    {
      title: "ราคาอุปกรณ์ / ชิ้น",
      key: "positionSalary",
      dataIndex: "positionSalary",
      render: (record: number) =>
        record.toLocaleString("th-TH", {
          style: "currency",
          currency: "THB",
        }),
    },
    {
      title: "Action",
      key: "action",
      width: 150,
      align: "center" as const,
      render: (row: IPosition) => (
        <Space size="middle">
          <Link to={`position/edit/${row.positionID}`}>
            <Button className="border-[#0174BE] text-[#0174BE] text-sm">
              แก้ไข
            </Button>
          </Link>
        </Space>
      ),
    },
  ];

  const columnsMachineType = [
    {
      title: "เลขประเภทเครื่องจักร",
      dataIndex: "machinetypeID",
      key: "machinetypeID",
    },
    {
      title: "ชื่อประเภทเครื่องจักร",
      key: "machinetypeName",
      dataIndex: "machinetypeName",
    },
    {
      title: "Action",
      key: "action",
      width: 150,
      align: "center" as const,
      render: (row: IMachineType) => (
        <Space size="middle">
          <Link to={`machinetype/edit/${row.machinetypeID}`}>
            <Button className="border-[#0174BE] text-[#0174BE] text-sm">
              แก้ไข
            </Button>
          </Link>
        </Space>
      ),
    },
  ];

  const columnsItemCategory = [
    {
      title: "เลขประเภทเครื่องจักร",
      dataIndex: "categoryID",
      key: "categoryID",
    },
    {
      title: "ชื่อประเภทเครื่องจักร",
      key: "categoryName",
      dataIndex: "categoryName",
    },
    {
      title: "Action",
      key: "action",
      width: 150,
      align: "center" as const,
      render: (row: IItemCategory) => (
        <Space size="middle">
          <Link to={`itemcategory/edit/${row.categoryID}`}>
            <Button className="border-[#0174BE] text-[#0174BE] text-sm">
              แก้ไข
            </Button>
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="w-full h-full bg-[#f0f2f5]">
        <div className="flex flex-col">
          <BreadcrumbComponent
            title={"จัดการประเภทข้อมูล"}
            links={BreadCrumbLinks}
          />
        </div>

        <TableInfo
          title="รายการทั้งหมด"
          titleBtn="เพิ่มตำแหน่ง"
          hrefBtn="position/create"
          columns={columnsPosition}
          dataSource={position}
          loading={loading}
        />
        <TableInfo
          title="รายการทั้งหมด"
          hrefBtn="machinetype/create"
          titleBtn="เพิ่มประเภทเครื่องจักร"
          columns={columnsMachineType}
          dataSource={machineType}
          loading={loading}
        />
        <TableInfo
          title="รายการทั้งหมด"
          hrefBtn="itemcategory/create"
          titleBtn="เพิ่มประเภทอุปกรณ์"
          columns={columnsItemCategory}
          dataSource={itemCategory}
          loading={loading}
        />
      </div>
    </>
  );
};

export default SettingsInfo;
