import { GetALlItem } from "@/api/item.api";
import { GetALlItemCategory } from "@/api/itemCategory.api";
import BreadcrumbComponent from "@/components/BreadcrumbComponent/BreadcrumbComponent";
import { IItem } from "@/interface/item.interface";
import { IItemCategory } from "@/interface/itemCategory.interface";
import { IBreadcrumb } from "@/interface/utils.interface";
import { Button, Space, Table } from "antd";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const ItemInfo = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [itemData, setItemData] = useState<IItem[]>([]);
  const [itemCategory, setItemCategory] = useState<IItemCategory[]>([]);

  const BreadCrumbLinks: IBreadcrumb[] = [
    {
      title: "ข้อมูชิ้นส่วนอุปกรณ์",
      href: "",
    },
    {
      title: "ข้อมูลทั้งหมด",
    },
  ];

  const fetchItemCategoryData = async () => {
    try {
      const result = await GetALlItemCategory();
      setItemCategory(result.data);
    } catch (err) {
      throw new Error("Error! Fetching data failed");
    }
  };

  const fetchItemData = async () => {
    setLoading(true);
    try {
      const result = await GetALlItem();
      setItemData(result.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      throw new Error("Error! Fetching data failed");
    }
  };

  useMemo(() => {
    Promise.all([fetchItemData(), fetchItemCategoryData()]);
  }, []);

  const columns = [
    {
      title: "รหัสอุปกรณ์",
      dataIndex: "itemID",
      key: "itemID",
    },
    {
      title: "ชื่ออุปกรณ์",
      dataIndex: "itemName",
      key: "itemName",
    },
    {
      title: "ประเภทอุปกรณ์",
      dataIndex: "itemCategoryID",
      key: "itemCategoryID",
      render: (record: number) =>
        itemCategory.find((item) => item.categoryID === record)?.categoryName,
    },
    {
      title: "ราคาอุปกรณ์ / ชิ้น",
      dataIndex: "itemCost",
      key: "itemCost",
      render: (record: number) =>
        record.toLocaleString("th-TH", { style: "currency", currency: "THB" }),
    },
    {
      title: "จำนวนอุปกรณ์คงคลัง",
      dataIndex: "qty",
      key: "qty",
    },
    {
      title: "Action",
      key: "action",
      render: (row: IItem) => (
        <Space size="middle">
          <Button
            className=" border-[#0174BE] text-[#0174BE] text-sm"
            onClick={() => {
              alert("KUY");
            }}
          >
            ตรวจสอบ
          </Button>
          <Link to={`edit/${row.itemID}`}>
            <Button className="border-[#0174BE] text-[#0174BE] text-sm">
              แก้ไข
            </Button>
          </Link>
        </Space>
      ),
    },
  ];
  return (
    <div className="w-full h-full bg-[#f0f2f5]">
      <div className="flex flex-col">
        <BreadcrumbComponent
          title={"ข้อมูลชิ้นส่วนอุปกรณ์"}
          links={BreadCrumbLinks}
        />
      </div>

      <div className="m-6 bg-white rounded-md ">
        <div className="flex flex-col lg:flex-row w-full">
          <div className="flex-1">
            <p className="px-6 py-5 text-lg">รายการทั้งหมด</p>
          </div>
          <div className="flex mr-6 items-center justify-center lg:justify-end">
            <Link to="create">
              <Button
                type="primary"
                className="bg-[#0174BE] text-white flex text-sm py-3 align-middle items-center"
              >
                เพิ่มอุปกรณ์ใหม่
              </Button>
            </Link>
          </div>
        </div>

        <div className="mx-6 text-sm overflow-x-auto">
          <Table columns={columns} loading={loading} dataSource={itemData} />
        </div>
      </div>
    </div>
  );
};

export default ItemInfo;
