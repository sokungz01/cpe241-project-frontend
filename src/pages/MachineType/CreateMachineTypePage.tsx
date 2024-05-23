import {
    CreateMachineType,
    DeleteMachineType,
    GetMachineTypeByID,
    UpdateMachineType,
} from "@/api/machinetype.api";
import BreadcrumbComponent from "@/components/BreadcrumbComponent/BreadcrumbComponent";
import { IMachineType } from "@/interface/machinetype.interface";
import { IBreadcrumb } from "@/interface/utils.interface";
import { SwalSuccess } from "@/utils/swal";
import { Button, Form, Input, Spin } from "antd";
import { useCallback, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const CreateMachineTypePage = ({ isEdit }: { isEdit?: boolean }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();

  const BreadCrumbLinks: IBreadcrumb[] = [
    {
      title: "จัดการประเภท",
      href: "../",
    },
    {
      title: "ตั้งค่าประเภทข้อมูล",
      href: "../",
    },
    {
      title: "เพิ่มประเภทเครื่องจักร",
    },
  ];
  const EditBreadCrumbLinks: IBreadcrumb[] = [
    {
      title: "จัดการประเภท",
      href: "../",
    },
    {
      title: "ตั้งค่าประเภทข้อมูล",
      href: "../",
    },
    {
      title: "แก้ไขประเภทเครื่องจักร",
    },
  ];

  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      const result = await DeleteMachineType(id);
      if (result.status !== 200)
        throw new Error("Error! Delte the data not success.");
      setLoading(false);
      SwalSuccess("สำเร็จ!", "ลบประเภทเครื่องจักรสำเร็จ").then(() => {
        navigate("../../");
      });
    } catch (err) {
      setLoading(false);
    }
  };

  const onFinish = async (values: IMachineType) => {
    setLoading(true);
    try {
      const result = await CreateMachineType(values);
      if (result.status !== 200)
        throw new Error("Error! Post the data not success.");
      setLoading(false);
      SwalSuccess("สำเร็จ!", "เพิ่มประเภทเครื่องจักรใหม่สำเร็จ").then(() => {
        navigate("../../");
      });
    } catch (err) {
      setLoading(false);
    }
  };

  const onFinishEdit = async (values: IMachineType) => {
    setLoading(true);
    try {
      if (!id || Number(id) === 0) throw new Error("Error! invalid machine id");
      values.machinetypeID = Number(id);
      const result = await UpdateMachineType(Number(id), values);
      if (result.status !== 200)
        throw new Error("Error! Put the data not success.");
      setLoading(false);
      SwalSuccess("สำเร็จ!", "แก้ไขข้อมูลประเภทเครื่องจักร").then(() => {
        navigate("../../");
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const fetchMachineType = useCallback(
    async (machineID: number) => {
      setLoading(true);
      try {
        if (!machineID || machineID === 0)
          throw new Error("Error! Invalid machineID");
        const result = await GetMachineTypeByID(machineID);
        const machineType: IMachineType = result.data;
        form.setFieldsValue(machineType);
        form.setFieldValue(
          "machinetypeID",
          machineType.machinetypeID.toString()
        );
        setLoading(false);
      } catch (err) {
        setLoading(false);
        throw new Error("Error! Fetching data failed.");
      }
    },
    [form, setLoading]
  );

  useMemo(async () => {
    await fetchMachineType(Number(id));
  }, [id, fetchMachineType]);

  return (
    <>
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
              <div className="mt-6">
                <p className=" text-md font-medium">ข้อมูลประเภทเครื่องจักร</p>
              </div>

              <div className="flex flex-col gap-y-4 mt-4">
                <div className=" flex flex-col gap-x-4 lg:flex-row">
                  <div className=" flex flex-col w-full lg:w-1/2">
                    <Form.Item
                      label="ชื่อเครื่องจักร"
                      name="machinetypeName"
                      rules={[
                        {
                          required: true,
                          message: "Please input your machine type name!",
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
                      {loading ? <Spin /> : "ลบประเภทเครื่องจักร"}
                    </Button>
                  )}
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
    </>
  );
};
export default CreateMachineTypePage;
