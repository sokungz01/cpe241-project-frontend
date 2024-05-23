import { GetAllItemLog } from "@/api/itemlog.api";
import BreadcrumbComponent from "@/components/BreadcrumbComponent/BreadcrumbComponent";
import TableInfo from "@/components/Info/TableInfo";
import { IItemLog } from "@/interface/itemLog.interface";
import { IBreadcrumb } from "@/interface/utils.interface";
import { Button, Space } from "antd";
import { useMemo, useState } from "react";

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
      width: 150,
      align: "center" as const,
      render: () => (
        <Space size="middle">
          <Button
            className=" border-[#0174BE] text-[#0174BE] text-sm"
            onClick={() => {
              alert("KUY");
            }}
          >
            ตรวจสอบ
          </Button>
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

      <TableInfo
        title="รายการทั้งหมด"
        columns={columns}
        dataSource={itemLogData}
        loading={loading}
      />
    </div>
  );
};

export default ItemLogInfo;
