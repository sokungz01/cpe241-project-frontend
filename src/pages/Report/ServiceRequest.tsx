import { GetAllMachine } from "@/api/machine.api";
import BreadcrumbComponent from "@/components/BreadcrumbComponent/BreadcrumbComponent";
import { IErrorlog } from "@/interface/errorlog.interface";
import { IMachine } from "@/interface/machine.interface";
import { IBreadcrumb, Option } from "@/interface/utils.interface";
import { filterOption } from "@/utils/util";
import { Button, DatePicker, Form, Select, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ServiceRequest = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [machineOption, setMachineOption] = useState<Option[]>([]);

  const BreadCrumbLinks: IBreadcrumb[] = [
    {
      title: "ข้อมูลการรายงาน",
      href: "",
    },
    {
      title: "รายงานทั้งหมด",
    },
  ];

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

  useEffect(() => {
    Promise.all([fetchMachineData()]);
  }, []);

  const onFinish = async (values: IErrorlog) => {
    setLoading(true);
    return values;
  };

  return (
    <div className="w-full h-full bg-[#f0f2f5]">
      <div className="flex flex-col">
        <BreadcrumbComponent links={BreadCrumbLinks} title="เพิ่มเครื่องจักร" />
      </div>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <div className="flex flex-col lg:flex-row px-6 gap-4 mt-6">
          <div className=" bg-white w-full  rounded-md px-6">
            <div className="mt-6">
              <p className=" text-md font-medium">รายงานแจ้งซ่อม</p>
            </div>

            <div className="flex flex-col gap-y-4 mt-4">
              <div className=" flex flex-col gap-x-4 lg:flex-row">
                <div className=" flex flex-col w-full lg:w-1/2">
                  <Form.Item
                    label="วันที่รายงาน"
                    name="createdDate"
                    rules={[
                      {
                        required: true,
                        message: "Please input your reported date!",
                      },
                    ]}
                  >
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
                      disabled={loading}
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
                    placeholder="รายละเอียดปัญหาโดยสังเขป"
                    className="w-full mt-2 text-sm h-24"
                    style={{ resize: "none" }}
                  />
                </Form.Item>
              </div>
              <div className="w-full flex flex-row justify-between items-center">
                <div className="flex justify-end w-full my-4">
                  <Link to="../../">
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
                    className="px-6 bg-primary text-white"
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
  );
};

export default ServiceRequest;
