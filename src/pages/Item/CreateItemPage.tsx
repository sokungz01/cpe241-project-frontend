import {
  CreateItem,
  DeleteItem,
  GetItemByID,
  UpdateItem,
} from "@/api/item.api";
import { GetAllItemCategory } from "@/api/itemCategory.api";
import BreadcrumbComponent from "@/components/BreadcrumbComponent/BreadcrumbComponent";
import { AuthContext } from "@/context/auth.context";
import { IItem } from "@/interface/item.interface";
import { IItemCategory } from "@/interface/itemCategory.interface";
import { IBreadcrumb, Option } from "@/interface/utils.interface";
import { SwalSuccess } from "@/utils/swal";
import { Button, Form, Input, InputNumber, Select, Spin } from "antd";
import { useCallback, useContext, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const CreateItemPage = ({ isEdit }: { isEdit?: boolean }) => {
  const [form] = Form.useForm();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [itemCategory, setItemCategory] = useState<Option[]>([]);
  const { id } = useParams();

  const BreadCrumbLinks: IBreadcrumb[] = [
    {
      title: "ข้อมูลชิ้นส่วนอุปกรณ์",
      href: "./",
    },
    {
      title: "เพิ่มอุปกรณ์ใหม่",
    },
  ];
  const EditBreadCrumbLinks: IBreadcrumb[] = [
    {
      title: "ข้อมูลชิ้นส่วนอุปกรณ์",
      href: "./",
    },
    {
      title: "แก้ไขอุปกรณ์",
    },
  ];

  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      const result = await DeleteItem(id);
      if (result.status !== 200)
        throw new Error("Error! Delte the data not success.");
      setLoading(false);
      SwalSuccess("สำเร็จ!", "ลบอุปกรณ์สำเร็จ").then(() => {
        navigate("../");
      });
    } catch (err) {
      setLoading(false);
    }
  };

  const onFinish = async (values: IItem) => {
    setLoading(true);
    try {
      values.itemCategoryID = Number(values.itemCategoryID);
      values.staffID = Number(auth?.authContext.id);
      const result = await CreateItem(values);
      if (result.status !== 200)
        throw new Error("Error! Post the data not success.");
      setLoading(false);
      SwalSuccess("สำเร็จ!", "เพิ่มมอุปกรณ์ใหม่สำเร็จ").then(() => {
        navigate("../");
      });
    } catch (err) {
      setLoading(false);
    }
  };

  const onFinishEdit = async (values: IItem) => {
    setLoading(true);
    try {
      if (!id || Number(id) === 0) throw new Error("Error! invalid machine id");
      values.staffID = Number(auth?.authContext.id);
      values.itemID = Number(id);
      values.itemCost = Number(values.itemCost);
      values.itemCategoryID = Number(values.itemCategoryID);
      values.qty = Number(values.qty);
      const result = await UpdateItem(Number(id), values);
      if (result.status !== 200)
        throw new Error("Error! Put the data not success.");
      SwalSuccess("สำเร็จ!", "แก้ไขข้อมูลอุปกรณ์สำเร็จ").then(() => {
        navigate("../");
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const fetchItemCategory = async () => {
    try {
      const result = await GetAllItemCategory();
      const machineType: IItemCategory[] = result.data;
      const options: Option[] = [];
      machineType.map((item: IItemCategory) =>
        options.push({
          label: item.categoryName,
          value: item.categoryID.toString(),
        }),
      );
      setItemCategory(options);
    } catch (err) {
      throw new Error("Error! Fetching data failed");
    }
  };

  const fetchItemData = useCallback(
    async (itemID: number) => {
      setLoading(true);
      try {
        if (!itemID || itemID === 0) throw new Error("Error! Invalid itemID");
        const result = await GetItemByID(itemID);
        const ItemData: IItem = result.data;
        form.setFieldsValue(ItemData);
        form.setFieldValue("itemID", ItemData.itemID.toString());
        form.setFieldValue(
          "itemCategoryID",
          ItemData.itemCategoryID.toString(),
        );
        setLoading(false);
      } catch (err) {
        setLoading(false);
        throw new Error("Error! Fetching data failed.");
      }
    },
    [form, setLoading],
  );

  useMemo(async () => {
    await fetchItemCategory();
  }, []);

  useMemo(async () => {
    await fetchItemData(Number(id));
  }, [id, fetchItemData]);

  return (
    <>
      <div className="w-full h-full bg-[#f0f2f5]">
        <div className="flex flex-col">
          {isEdit ? (
            <BreadcrumbComponent
              links={EditBreadCrumbLinks}
              title="แก้ไขข้อมูลอุปกรณ์"
            />
          ) : (
            <BreadcrumbComponent links={BreadCrumbLinks} title="เพิ่มอุปกรณ์" />
          )}
        </div>
        <Form
          form={form}
          layout="vertical"
          onFinish={isEdit ? onFinishEdit : onFinish}
        >
          <div className="flex flex-col lg:flex-row px-6 gap-4 mt-6">
            <div className=" bg-white w-full  rounded-md px-6">
              <div className="mt-6">
                <p className=" text-md font-medium">เพิ่มอุปกรณ์ใหม่</p>
              </div>

              <div className="flex flex-col gap-y-4 mt-4">
                <div className=" flex flex-col gap-x-4 lg:flex-row">
                  <div className=" flex flex-col w-full lg:w-1/2">
                    <Form.Item
                      label="ชื่ออุปกรณ์"
                      name="itemName"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Item name!",
                        },
                      ]}
                    >
                      <Input
                        className=" w-full mt-2 text-sm h-8"
                        placeholder="ชื่ออุปกรณ์"
                        disabled={loading}
                      />
                    </Form.Item>
                  </div>
                  <div className=" flex flex-col w-full lg:w-1/2">
                    <Form.Item
                      label="ประเภทอุปกรณ์"
                      name="itemCategoryID"
                      rules={[
                        {
                          required: true,
                          message: "Please input your item category!",
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        className=" w-full mt-2 text-sm placeholder:text-sm"
                        placeholder="ประเภทอุปกรณ์"
                        disabled={loading}
                        options={itemCategory}
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className=" flex flex-col gap-x-4 lg:flex-row">
                  <div className=" flex flex-col w-full lg:w-1/2">
                    <Form.Item
                      label="ราคาอุปกรณ์ / ชิ้น"
                      name="itemCost"
                      rules={[
                        {
                          required: true,
                          message: "Please input your item cost!",
                        },
                      ]}
                    >
                      <InputNumber
                        controls={false}
                        step={0}
                        min={0}
                        className=" w-full mt-2 text-sm h-8"
                        placeholder="ราคาอุปกรณ์ / ชิ้น"
                        disabled={loading}
                      />
                    </Form.Item>
                  </div>
                  <div className=" flex flex-col w-full lg:w-1/2">
                    <Form.Item
                      label="จำนวนสินค้า"
                      name="qty"
                      rules={[
                        {
                          required: true,
                          message: "Please input your item quantity!",
                        },
                      ]}
                    >
                      <InputNumber
                        controls={false}
                        step={0}
                        min={0}
                        className=" w-full mt-2 text-sm h-8"
                        placeholder="จำนวนสินค้า"
                        disabled={loading || isEdit}
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="w-full flex flex-row justify-between items-center">
                  {isEdit && (
                    <Button
                      htmlType="button"
                      className="px-6"
                      size="middle"
                      onClick={async () => {
                        await handleDelete(Number(id));
                      }}
                      disabled={loading}
                      danger
                    >
                      {loading ? <Spin /> : "ลบอุปกรณ์"}
                    </Button>
                  )}
                  <div className="flex justify-end w-full my-4">
                    <Link to="../">
                      <Button
                        htmlType="button"
                        className="px-6 mx-2"
                        size="middle"
                        disabled={loading}
                      >
                        {loading ? <Spin /> : "ยกเลิก"}
                      </Button>
                    </Link>
                    <Button
                      htmlType="submit"
                      className="px-6 bg-primary text-white border-primary"
                      size="middle"
                      disabled={loading}
                    >
                      {loading ? <Spin /> : "ตกลง"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};
export default CreateItemPage;
