import { CreateMachine } from "@/api/machine.api";
import { GetAllMachineType } from "@/api/machinetype.api";
import BreadcrumbComponent from "@/components/BreadcrumbComponent/BreadcrumbComponent";
import { IMachine } from "@/interface/machine.interface";
import { IMachineType } from "@/interface/machinetype.interface";
import { IBreadcrumb, Option } from "@/interface/utils.interface";
import { SwalSuccess } from "@/utils/swal";
import { Button, DatePicker, Form, Input, Select, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CreateMachinePage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [machineTypeOptions, setMachineTypeOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const BreadCrumbLinks: IBreadcrumb[] = [
    {
      title: "ข้อมูลเครื่องจักร",
      href: "./",
    },
    {
      title: "เพิ่มเครื่องจักร",
    },
  ];

  const fetchMachineType = async () => {
    try {
      const result = await GetAllMachineType();
      const machineType: IMachineType[] = result.data;
      const options: Option[] = [];
      machineType.map((item: IMachineType) =>
        options.push({
          label: item.machinetypeName,
          value: item.machinetypeID.toString(),
        }),
      );
      setMachineTypeOptions(options);
    } catch (err) {
      throw new Error("Error! Fetching data failed");
    }
  };

  useMemo(async () => {
    await fetchMachineType();
  }, []);

  const onFinish = async (values: IMachine) => {
    setLoading(true);
    try {
      values.machineTypeID = Number(values.machineTypeID);
      const result = await CreateMachine(values);
      if (result.status !== 200)
        throw new Error("Error! Post the data not success.");
      setLoading(false);
      SwalSuccess("สำเร็จ!", "เพิ่มเครื่องจักรใหม่สำเร็จ").then(() => {
        navigate("../");
      });
    } catch (err) {
      throw new Error("Error! Can not posting the data.");
    }
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
              <p className=" text-md font-medium">ข้อมูลเครื่องจักร</p>
            </div>

            <div className="flex flex-col gap-y-4 mt-4">
              <div className=" flex flex-col gap-x-4 lg:flex-row">
                <div className=" flex flex-col w-full lg:w-1/2">
                  <Form.Item
                    label="ชื่อเครื่องจักร"
                    name="machineName"
                    rules={[
                      {
                        required: true,
                        message: "Please input your machine name!",
                      },
                    ]}
                  >
                    <Input
                      className=" w-full mt-2 text-sm h-8"
                      placeholder="ชื่อเครื่องจักร"
                      disabled={loading}
                    />
                  </Form.Item>
                </div>
                <div className=" flex flex-col w-full lg:w-1/2">
                  <Form.Item
                    label="ยี่ห้อเครื่องจักร"
                    name="machineBrand"
                    rules={[
                      {
                        required: true,
                        message: "Please input your machine brand!",
                      },
                    ]}
                  >
                    <Input
                      className=" w-full mt-2 text-sm h-8"
                      placeholder="ยี่ห้อเครื่องจักร"
                      disabled={loading}
                    />
                  </Form.Item>
                </div>
              </div>

              <div className=" flex flex-col gap-x-4 lg:flex-row">
                <div className=" flex flex-col w-full lg:w-1/2">
                  <Form.Item
                    label="ประเภทเครื่องจักร"
                    name="machineTypeID"
                    rules={[
                      {
                        required: true,
                        message: "Please input your machine type!",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      className=" w-full mt-2 text-sm placeholder:text-sm"
                      placeholder="ประเภทเครื่องจักร"
                      disabled={loading}
                      options={machineTypeOptions}
                    />
                  </Form.Item>
                </div>
                <div className=" flex flex-col w-full lg:w-1/2">
                  <Form.Item
                    label="วันที่่เริ่มใช้งาน"
                    name="startDate"
                    rules={[
                      {
                        required: true,
                        message: "Please input your machine started date!",
                      },
                    ]}
                  >
                    <DatePicker
                      className=" w-full mt-2 text-sm h-8"
                      placeholder="วันที่่เริ่มใช้งาน"
                      disabled={loading}
                    />
                  </Form.Item>
                </div>
              </div>
              <div>
                <Form.Item
                  label="รายละเอียด"
                  name="desc"
                  rules={[
                    {
                      required: true,
                      message: "Please input your machine description!",
                    },
                  ]}
                >
                  <TextArea
                    showCount
                    placeholder="รายละเอียดเครื่องจักร"
                    className="w-full mt-2 text-sm h-24"
                    style={{ resize: "none" }}
                  />
                </Form.Item>
              </div>
              <div className="flex justify-end w-full my-4">
                <Link to="../">
                  <Button htmlType="button" className="px-6 mx-2" size="middle">
                    ยกเลิก
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
      </Form>
    </div>
  );
};

export default CreateMachinePage;
