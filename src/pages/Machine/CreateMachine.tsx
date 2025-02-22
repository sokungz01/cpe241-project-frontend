import {
  CreateMachine,
  DeleteMachine,
  GetMachineByID,
  UpdateMachineByID,
} from "@/api/machine.api";
import { GetAllMachineType } from "@/api/machinetype.api";
import BreadcrumbComponent from "@/components/BreadcrumbComponent/BreadcrumbComponent";
import { IMachine } from "@/interface/machine.interface";
import { IMachineType } from "@/interface/machinetype.interface";
import { IBreadcrumb, Option } from "@/interface/utils.interface";
import { SwalSuccess } from "@/utils/swal";
import { Button, DatePicker, Form, Input, Select, Spin, Switch } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { useCallback, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const CreateMachinePage = ({ isEdit }: { isEdit?: boolean }) => {
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
  const EditBreadCrumbLinks: IBreadcrumb[] = [
    {
      title: "ข้อมูลเครื่องจักร",
      href: "../",
    },
    {
      title: "แก้ไขข้อมูลเครื่องจักร",
    },
  ];

  const { id } = useParams();

  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      const result = await DeleteMachine(id);
      if (result.status !== 200)
        throw new Error("Error! Delte the data not success.");
      setLoading(false);
      SwalSuccess("สำเร็จ!", "ลบเครื่องจักรสำเร็จ").then(() => {
        navigate("../");
      });
    } catch (err) {
      setLoading(false);
    }
  };

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

  const fetchMachineData = useCallback(
    async (machineID: number) => {
      setLoading(true);
      try {
        if (!machineID || machineID === 0)
          throw new Error("Error! Invalid machineID");
        const result = await GetMachineByID(machineID);
        const machineData: IMachine = result.data;
        form.setFieldsValue(machineData);
        form.setFieldValue(
          "machineTypeID",
          machineData.machineTypeID.toString(),
        );
        form.setFieldValue("startDate", dayjs(machineData.startDate));
        setLoading(false);
      } catch (err) {
        setLoading(false);
        throw new Error("Error! Fetching data failed.");
      }
    },
    [form, setLoading],
  );

  useMemo(async () => {
    await fetchMachineType();
  }, []);

  useMemo(async () => {
    await fetchMachineData(Number(id));
  }, [id, fetchMachineData]);

  const onFinish = async (values: IMachine) => {
    setLoading(true);
    try {
      values.machineTypeID = Number(values.machineTypeID);
      values.status = values.status ? 1 : 0;
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

  const onFinishEdit = async (values: IMachine) => {
    setLoading(true);
    try {
      if (!id || Number(id) === 0) throw new Error("Error! invalid machine id");
      values.machineTypeID = Number(values.machineTypeID);
      values.status = values.status ? 1 : 0;
      const result = await UpdateMachineByID(Number(id), values);
      if (result.status !== 200)
        throw new Error("Error! Put the data not success.");
      setLoading(false);
      SwalSuccess("สำเร็จ!", "แก้ไขข้อมูลเครื่องจักรสำเร็จ").then(() => {
        navigate("../");
      });
    } catch (err) {
      throw new Error("Error! Can not put the data.");
    }
  };

  return (
    <div className="w-full h-full bg-[#f0f2f5]">
      <div className="flex flex-col">
        {isEdit ? (
          <BreadcrumbComponent
            links={EditBreadCrumbLinks}
            title="แก้ไขข้อมูลเครื่องจักร"
          />
        ) : (
          <BreadcrumbComponent
            links={BreadCrumbLinks}
            title="เพิ่มเครื่องจักร"
          />
        )}
      </div>
      <Form
        form={form}
        layout="vertical"
        onFinish={isEdit ? onFinishEdit : onFinish}
      >
        <div className="flex flex-col lg:flex-row px-6 gap-4 mt-6">
          <div className=" bg-white w-full  rounded-md px-6">
            <div className="mt-6 flex flex-row items-center">
              <p className=" text-md font-medium">ข้อมูลเครื่องจักร</p>
              <div className="ml-auto flex items-center">
                <p className=" px-3 text-center">สถานะเครื่องจักร :</p>
                <Form.Item name="status">
                  <Switch
                    className="bg-unavailable"
                    checkedChildren="เปิดใช้งาน"
                    unCheckedChildren="ปิดใช้งาน"
                  />
                </Form.Item>
              </div>
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
                    label="วันที่เริ่มใช้งาน"
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
                      placeholder="วันที่เริ่มใช้งาน"
                      disabled={loading}
                      format={"DD-MM-YYYY"}
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
              <div className="flex flex-row justify-between items-center">
                {isEdit && (
                  <Button
                    htmlType="button"
                    className="px-6"
                    size="middle"
                    disabled={loading}
                    onClick={async () => {
                      await handleDelete(Number(id));
                    }}
                    danger
                  >
                    ลบเครื่องจักร
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

export default CreateMachinePage;
