import { UpdateItemQuantity } from "@/api/itemlog.api";
import { AuthContext } from "@/context/auth.context";
import { IItem } from "@/interface/item.interface";
import { IItemCategory } from "@/interface/itemCategory.interface";
import { IItemLog } from "@/interface/itemLog.interface";
import { SwalSuccess } from "@/utils/swal";
import { Button, Form, InputNumber, Modal, Spin } from "antd";
import { useContext, useState } from "react";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";

const AddQuantityModal = ({
  data,
  itemCategory,
  open,
  setOpen,
}: {
  data: IItem;
  itemCategory: IItemCategory[];
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const Auth = useContext(AuthContext);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (values: IItemLog) => {
    setLoading(true);
    try {
      values.itemID = Number(data.itemID);
      values.qty = Number(values.qty);
      values.isAdd = true;
      values.staffID = Number(Auth?.authContext.id);
      values.createDate = new Date();
      const result = await UpdateItemQuantity(values);
      if (result.status !== 200)
        throw new Error("Error! Put the data not success.");
      SwalSuccess("สำเร็จ!", "แก้ไขข้อมูลอุปกรณ์สำเร็จ").then(() => {
        setOpen(false);
        window.location.reload();
      });
    } catch (err) {
      throw new Error("Error! Cannot update quantity");
    }
  };

  return (
    <>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        width={350}
        closeIcon={false}
        centered
        footer={null}
      >
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          scrollToFirstError
        >
          <div className="flexflex-col">
            <div className="flex flex-row w-full justify-between items-center">
              <FaLessThan />
              <h5 className="text-xl font-semibold text-center my-4">
                ข้อมูลอุปกรณ์
              </h5>
              <FaGreaterThan />
            </div>
            <div className="flex flex-col my-4">
              <p className="text-lg">ชื่ออุปกรณ์ : {data.itemName}</p>
              <p className="text-lg">
                ประเภทอุปกรณ์ :{" "}
                {
                  itemCategory.find(
                    (item) => item.categoryID === data.itemCategoryID,
                  )?.categoryName
                }
              </p>
              <p className="text-lg">จำนวนคงเหลือ : {data.qty} ชิ้น</p>
              <hr className="my-4" />
              <div className="w-full">
                <Form.Item
                  label="จำนวนที่เพิ่มอุปกรณ์"
                  name="qty"
                  rules={[
                    { type: "number", message: "Please input valid number" },
                    {
                      required: true,
                      message: "Please input increasing number!",
                    },
                  ]}
                >
                  <InputNumber
                    controls={false}
                    step={0}
                    min={0}
                    className=" w-full mt-2 text-sm h-8"
                    placeholder="จำนวนที่เพิ่มอุปกรณ์"
                    disabled={loading}
                  />
                </Form.Item>
              </div>
              <div className="my-4 w-full flex flex-row justify-center items-center">
                <Button
                  htmlType="button"
                  className="px-6 mx-2"
                  size="middle"
                  disabled={loading}
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  {loading ? <Spin /> : "ยกเลิก"}
                </Button>
                <Button
                  htmlType="submit"
                  className="px-6 bg-primary text-white"
                  size="middle"
                  disabled={loading}
                >
                  {loading ? <Spin /> : "ตกลง"}
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default AddQuantityModal;
