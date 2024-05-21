import { GetAllItemLog } from "@/api/itemlog.api";
import BreadcrumbComponent from "@/components/BreadcrumbComponent/BreadcrumbComponent";
import { IItem } from "@/interface/item.interface";
import { IItemLog } from "@/interface/itemLog.interface";
import { IBreadcrumb } from "@/interface/utils.interface";
import { Button, Space, Table } from "antd";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const ItemLogInfo = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [itemLogData, setItemLogData] = useState<IItemLog[]>([]);

  const BreadCrumbLinks: IBreadcrumb[] = [
    {
      title: "ข้อมูชิ้นส่วนอุปกรณ์",
      href: "",
    },
    {
      title: "ประวัติอุปกรณ์",
    },
  ];

  const fetchItemLogData = async () => {
    setLoading(true);
    try {
      const result = await GetAllItemLog();
      setItemLogData(result.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      throw new Error("Error! Fetching data failed");
    }
  };

  useMemo(async () => {
    await fetchItemLogData();
  }, []);

  const columns = [
    {
      title: "เลขประวัติอุปกรณ์",
      dataIndex: "itemLogID",
      key: "itemLogID",
    },
    {
      title: "ชื่ออุปกรณ์",
      key: "itemName",
      render: (row: IItemLog) => row.item.itemName,
    },
    {
      title: "ราคาอุปกรณ์ / ชิ้น",
      key: "itemCost",
      render: (record: IItemLog) =>
        record.item.itemCost.toLocaleString("th-TH", {
          style: "currency",
          currency: "THB",
        }),
    },
    {
      title: "จำนวน (ชิ้น)",
      dataIndex: "qty",
      key: "qty",
    },
    {
      title: "สถานะ",
      dataIndex: "isAdd",
      key: "isAdd",
      render: (record: boolean) => (
        <ul className="list-disc">
          {record ? (
            <li className="marker:text-success">เพิ่มรายการ</li>
          ) : (
            <li className="marker:text-danger">ลบรายการ</li>
          )}
        </ul>
      ),
    },
    {
      title: "กระทำโดย",
      key: "staff",
      render: (row: IItemLog) => row.staff.name + " " + row.staff.surname,
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
          title={"ประวัติชิ้นส่วนอุปกรณ์"}
          links={BreadCrumbLinks}
        />
      </div>

      <div className="m-6 bg-white rounded-md ">
        <div className="flex flex-col lg:flex-row w-full">
          <div className="flex-1">
            <p className="px-6 py-5 text-lg">รายการทั้งหมด</p>
          </div>
        </div>

        <div className="mx-6 text-sm overflow-x-auto">
          <Table columns={columns} loading={loading} dataSource={itemLogData} />
        </div>
      </div>
    </div>
  );
};

export default ItemLogInfo;