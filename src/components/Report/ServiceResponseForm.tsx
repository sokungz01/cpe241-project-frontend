import { GetAllItem } from "@/api/item.api";
import { IItem } from "@/interface/item.interface";
import { IServiceResponse } from "@/interface/serviceresponse.interface";
import { Option } from "@/interface/utils.interface";
import { filterOption } from "@/utils/util";
import {
  Button,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Select,
  Spin,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useMemo, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";

const ServiceResponseForm = ({
  form,
  loading,
  onFinish,
  disabled,
}: {
  form: FormInstance;
  loading: boolean;
  onFinish?: (values: IServiceResponse) => Promise<void>;
  disabled?: boolean;
}) => {
  const [itemData, setItemData] = useState<Option[]>([]);

  const fetchItemData = async () => {
    try {
      const result = await GetAllItem();
      if (result.status !== 200) {
        throw new Error("Error! Cannot fetching data");
      }
      const mapOption: Option[] = [];
      const data: IItem[] = result.data;
      data.forEach(async (item) => {
        mapOption.push({
          label: item.itemName,
          value: String(item.itemID),
        });
      });

      setItemData(mapOption);
    } catch (err) {
      console.log(err);
    }
  };

  useMemo(async () => {
    await fetchItemData();
  }, []);

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <div className="flex flex-col lg:flex-row px-6 gap-4 mt-6">
        <div className=" bg-white w-full  rounded-md px-6">
          <div className="mt-6">
            <p className=" text-md font-medium">รายงานผลการแจ้งซ่อม</p>
          </div>

          <div className="flex w-full flex-col gap-y-4 mt-4">
            <section className="mt-8">
              <h4 className="font-semibold text-md"> รายงาน </h4>
              <hr className="my-4" />
              <div className="w-full my-4 flex flex-col gap-x-4 items-end">
                <div className="w-full">
                  <Form.Item
                    label="หัวข้อ"
                    name={"title"}
                    rules={[
                      {
                        required: true,
                        message: "Please input title!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="หัวข้อ"
                      className=" w-full mt-2 text-sm h-8"
                      disabled={loading || disabled}
                    />
                  </Form.Item>
                </div>
                <div className="w-full">
                  <Form.Item
                    label="รายละเอียดปัญหา"
                    name={"description"}
                    rules={[
                      {
                        required: true,
                        message: "Please input your description!",
                      },
                    ]}
                  >
                    <TextArea
                      showCount
                      placeholder="รายละเอียดเครื่องจักร"
                      className="w-full my-4 text-sm h-24"
                      style={{ resize: "none" }}
                      disabled={loading || disabled}
                    />
                  </Form.Item>
                </div>
                <div className="w-full">
                  <Form.List name={"maintenanceParts"}>
                    {(parts, partOptions) => (
                      <div>
                        {parts.length > 0 && (
                          <p className="font-semibold">อุปกรณ์ที่ใช้</p>
                        )}
                        {parts.map((part) => (
                          <div className="w-full bg-gray-50 rounded-xl p-4 my-4 flex flex-row gap-x-4 items-end">
                            <div className="w-1/2">
                              <Form.Item
                                label="อุปกรณ์ที่ใช้"
                                name={[part.name, "itemID"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input your item!",
                                  },
                                ]}
                              >
                                <Select
                                  showSearch
                                  className=" w-full mt-2 text-sm placeholder:text-sm"
                                  placeholder="อุปกรณ์ที่ใช้"
                                  disabled={loading || disabled}
                                  options={itemData}
                                  filterOption={filterOption}
                                />
                              </Form.Item>
                            </div>
                            <div className="w-1/2">
                              <Form.Item
                                label="จำนวนที่ใช้"
                                name={[part.name, "qty"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input your quantity!",
                                  },
                                ]}
                              >
                                <InputNumber
                                  min={0}
                                  step={0}
                                  controls={false}
                                  placeholder="จำนวนที่ใช้"
                                  className=" w-full mt-2 text-sm h-8"
                                  disabled={loading || disabled}
                                />
                              </Form.Item>
                            </div>
                            {!disabled && (
                              <RxCross2
                                className="size-8"
                                onClick={() => {
                                  partOptions.remove(part.name);
                                }}
                              />
                            )}
                          </div>
                        ))}
                        {!disabled && (
                          <Button
                            type="dashed"
                            className="my-2"
                            onClick={() =>
                              partOptions.add({
                                itemID: null,
                                qty: null,
                              })
                            }
                            block
                          >
                            + เพิ่มอุปกรณ์ที่เบิก
                          </Button>
                        )}
                      </div>
                    )}
                  </Form.List>
                </div>
                <hr className="w-full my-4" />
              </div>
            </section>
          </div>
          <div className="w-full flex flex-row justify-between items-center">
            <div className="flex justify-end w-full my-4">
              <Link to="../">
                <Button
                  htmlType="button"
                  className="px-6 mx-2"
                  size="middle"
                  disabled={loading || disabled}
                >
                  {loading ? <Spin /> : "ยกเลิก"}
                </Button>
              </Link>
              <Button
                htmlType="submit"
                className="px-6 bg-primary text-white"
                size="middle"
                disabled={loading || disabled}
              >
                {loading ? <Spin /> : "ตกลง"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default ServiceResponseForm;
