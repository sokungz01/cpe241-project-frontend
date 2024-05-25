import { GetAllErrorType } from "@/api/errortype.api";
import { GetAllMachine } from "@/api/machine.api";
import { IErrorType } from "@/interface/errortype.interface";
import { IMachine } from "@/interface/machine.interface";
import { ISerivceRequest } from "@/interface/servicerequest.interface";
import { Option } from "@/interface/utils.interface";
import { filterOption } from "@/utils/util";
import {
  FormInstance,
  Form,
  Button,
  Spin,
  Select,
  DatePicker,
  Input,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";

const ServiceRequestForm = ({
  form,
  loading,
  onFinish,
  disabled,
}: {
  form: FormInstance;
  loading: boolean;
  onFinish?: (values: ISerivceRequest) => Promise<void>;
  disabled?: boolean;
}) => {
  const [machineOption, setMachineOption] = useState<Option[]>([]);
  const [errorTypeOption, setErrorTypeOption] = useState<Option[]>([]);
  const fetchMachineData = async () => {
    try {
      const result = await GetAllMachine();
      if (result.status !== 200) {
        throw new Error("Error! Cannot fetching data");
      }
      const mapOption: Option[] = [];
      const data: IMachine[] = result.data;
      data.forEach(async (item) => {
        mapOption.push({
          label: "[ " + item.machineBrand + " ] | " + item.machineName,
          value: String(item.machineID),
        });
      });

      setMachineOption(mapOption);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchErrorType = async () => {
    try {
      const result = await GetAllErrorType();
      if (result.status !== 200) {
        throw new Error("Error! Cannot fetching data");
      }
      const mapOption: Option[] = [];
      const data: IErrorType[] = result.data;
      data.forEach(async (item) => {
        mapOption.push({
          label: item.errorName,
          value: String(item.errorTypeID),
        });
      });

      setErrorTypeOption(mapOption);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    Promise.all([fetchMachineData(), fetchErrorType()]);
  }, []);
  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <div className="flex flex-col lg:flex-row px-6 gap-4 mt-6">
        <div className=" bg-white w-full  rounded-md px-6">
          <div className="mt-6">
            <p className=" text-md font-medium">รายงานแจ้งซ่อม</p>
          </div>

          <div className="flex flex-col gap-y-4 mt-4">
            <div className=" flex flex-col gap-x-4 lg:flex-row">
              <div className=" flex flex-col w-full lg:w-1/2">
                <Form.Item label="วันที่รายงาน" name="createdDate">
                  <DatePicker
                    className=" w-full mt-2 text-sm placeholder:text-sm"
                    placeholder="เครื่องจักรที่ต้องการจะรายงาน"
                    disabled
                    defaultValue={dayjs()}
                  />
                </Form.Item>
              </div>
              <div className=" flex flex-col w-full lg:w-1/2">
                <Form.Item
                  label="เครื่องจักรที่ต้องการจะรายงาน"
                  name="machineID"
                  rules={[
                    {
                      required: true,
                      message: "Please input your machine!",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    className=" w-full mt-2 text-sm placeholder:text-sm"
                    placeholder="เครื่องจักรที่ต้องการจะรายงาน"
                    disabled={loading || disabled}
                    options={machineOption}
                    filterOption={filterOption}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="w-full">
              <Form.Item
                label="รายละเอียด"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Please input your report description!",
                  },
                ]}
              >
                <TextArea
                  showCount
                  disabled={loading || disabled}
                  placeholder="รายละเอียดปัญหาโดยสังเขป"
                  className="w-full mt-2 text-sm h-24"
                  style={{ resize: "none" }}
                />
              </Form.Item>

              <section className="mt-8">
                <h4 className="font-semibold text-md"> ปัญหาที่พบ </h4>
                <hr className="my-4" />
                <Form.List name="errorLog">
                  {(items, itemOptions) => (
                    <div>
                      {items.map((item) => (
                        <div className="w-full my-4 flex flex-row gap-x-4 items-end">
                          <div className="w-1/3">
                            <Form.Item
                              label="ประเภทปัญหา"
                              name={[item.name, "errorTypeID"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Please input error type!",
                                },
                              ]}
                            >
                              <Select
                                showSearch
                                className=" w-full mt-2 text-sm placeholder:text-sm"
                                placeholder="ประเภทป้ญหา"
                                disabled={loading || disabled}
                                options={errorTypeOption}
                                filterOption={filterOption}
                              />
                            </Form.Item>
                          </div>
                          <div className="w-full">
                            <Form.Item
                              label="รายละเอียดปัญหา"
                              name={[item.name, "errorDescription"]}
                              rules={[
                                {
                                  required: true,
                                  message:
                                    "Please input your error description!",
                                },
                              ]}
                            >
                              <Input
                                placeholder="รายละเอียดปัญหา"
                                className=" w-full mt-2 text-sm h-8"
                                disabled={loading || disabled}
                              />
                            </Form.Item>
                          </div>
                          {items.length > 1 && !disabled && (
                            <RxCross2
                              className="size-8"
                              onClick={() => {
                                itemOptions.remove(item.name);
                              }}
                            />
                          )}
                        </div>
                      ))}
                      {!disabled && (
                        <Button
                          type="dashed"
                          onClick={() => itemOptions.add({})}
                          block
                        >
                          + เพิ่มปัญหาใหม่
                        </Button>
                      )}
                    </div>
                  )}
                </Form.List>
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
      </div>
    </Form>
  );
};

export default ServiceRequestForm;
