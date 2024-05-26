import { GetAllItem } from "@/api/item.api";
import { GetAllItemCategory } from "@/api/itemCategory.api";
import BreadcrumbComponent from "@/components/BreadcrumbComponent/BreadcrumbComponent";
import TableInfo from "@/components/Info/TableInfo";
import AddQuantityModal from "@/components/Item/AddQuantityModal";
import QueryItem from "@/components/Item/QueryItem";
import { IItem, initialItem } from "@/interface/item.interface";
import { IItemCategory } from "@/interface/itemCategory.interface";
import { IBreadcrumb } from "@/interface/utils.interface";
import { Button, Space } from "antd";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const ItemInfo = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [itemData, setItemData] = useState<IItem[]>([]);
  const [masterData, setmasterData] = useState<IItem[]>([]);
  const [itemCategory, setItemCategory] = useState<IItemCategory[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<IItem>(initialItem);
  const [search, setSearch] = useState<string>("");
  const BreadCrumbLinks: IBreadcrumb[] = [
    {
      title: "ข้อมูลชิ้นส่วนอุปกรณ์",
      href: "",
    },
    {
      title: "ข้อมูลทั้งหมด",
    },
  ];

  const fetchItemCategoryData = async () => {
    try {
      const result = await GetAllItemCategory();
      setItemCategory(result.data);
    } catch (err) {
      throw new Error("Error! Fetching data failed");
    }
  };

  const fetchItemData = async () => {
    setLoading(true);
    try {
      const result = await GetAllItem();
      setItemData(result.data);
      setmasterData(result.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      throw new Error("Error! Fetching data failed");
    }
  };

  useMemo(() => {
    let filteredData = masterData;
    if (search !== "") {
      filteredData = filteredData.filter((item) => {
        return (
          item.itemName.toLowerCase().match(search.toLowerCase()) ||
          item.itemID.toString().match(search.toLowerCase())
        );
      });
    }
    setItemData(filteredData);
  }, [masterData, search]);

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
      width: 150,
      align: "center" as const,
      render: (row: IItem) => (
        <Space size="middle">
          <Button
            className=" border-[#0174BE] text-[#0174BE] text-sm"
            onClick={() => {
              setSelectedData(row);
              setOpenModal(true);
            }}
          >
            เพิ่มจำนวนสินค้า
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
      <div className="m-6 bg-white rounded-md">
        <QueryItem setSearch={setSearch} />
      </div>

      <TableInfo
        title="รายการทั้งหมด"
        hrefBtn="create"
        titleBtn="เพิ่มอุปกรณ์ใหม่"
        columns={columns}
        dataSource={itemData}
        loading={loading}
      />
      <AddQuantityModal
        data={selectedData}
        itemCategory={itemCategory}
        setOpen={setOpenModal}
        open={openModal}
      />
    </div>
  );
};

export default ItemInfo;
