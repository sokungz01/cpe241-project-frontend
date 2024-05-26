import { GetAllMachine } from "@/api/machine.api";
import {
  CreateMaintenanceLog,
  CreateMaintenanceLogByMaintainID,
} from "@/api/maintenancelog.api";
import BreadcrumbComponent from "@/components/BreadcrumbComponent/BreadcrumbComponent";
import ReportStatusBar from "@/components/Report/ReportStatusBar";
import { AuthContext } from "@/context/auth.context";
import { IMachine } from "@/interface/machine.interface";
import { IMaintenanceLog } from "@/interface/maintenancelog.interface";
import { IBreadcrumb, Option } from "@/interface/utils.interface";
import { SwalError, SwalSuccess } from "@/utils/swal";
import { filterOption } from "@/utils/util";
import { Button, Form, Select, Spin } from "antd";
import { useCallback, useContext, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
const CreateMaintenancePage = ({ isEdit }: { isEdit?: boolean }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [machineOption, setMachineOption] = useState<Option[]>([]);
  const { id } = useParams();
  const periodOptions: Option[] = [
    {
      value: "3",
      label: "ทุก 3 เดือน",
    },
    {
      value: "6",
      label: "ทุก 6 เดือน",
    },
    {
      value: "9",
      label: "ทุก 9 เดือน",
    },
    {
      value: "12",
      label: "ทุก 12 เดือน",
    },
  ];

  const fetchMachineData = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const fetchMaintenanceLog = useCallback(
    async (maintainID: number) => {
      setLoading(true);
      try {
        if (!maintainID || maintainID === 0)
          throw new Error("Error! Invalid maintainID");
        const result = await CreateMaintenanceLogByMaintainID(maintainID);
        const maintenanceLog: IMaintenanceLog = result.data;
        form.setFieldsValue(maintenanceLog);
        form.setFieldValue("machineID", maintenanceLog.machineID.toString());
        form.setFieldValue("period", maintenanceLog.period.toString());
        setLoading(false);
      } catch (err) {
        setLoading(false);
        throw new Error("Error! Fetching data failed.");
      }
    },
    [form, setLoading],
  );

  useMemo(async () => {
    await fetchMachineData();
  }, []);
  useMemo(async () => {
    await fetchMaintenanceLog(Number(id));
  }, [id, fetchMaintenanceLog]);
  const BreadCrumbLinks: IBreadcrumb[] = [
    {
      title: "รายงาน",
      href: "./",
    },
    {
      title: "เพิ่มรายงานประจำรอบ",
    },
  ];
  const EditBreadCrumbLinks: IBreadcrumb[] = [
    {
      title: "รายงาน",
      href: "./",
    },
    {
      title: "แก้ไขรายงานประจำรอบ",
    },
  ];

  const onFinish = async (values: IMaintenanceLog) => {
    setLoading(true);
    try {
      values.createdDate = new Date();
      values.updateDate = new Date();
      values.machineID = Number(values.machineID);
      values.staffID = Number(auth?.authContext.id);
      values.statusID = 1;
      values.period = Number(values.period);

      console.log(values);
      const result = await CreateMaintenanceLog(values);
      if (result.status !== 200) {
        SwalError("ผิดพลาด", "ไม่สามารถสร้างรายงานประจำรอบได้");
        throw new Error("Error! cannot post the data");
      }

      SwalSuccess("สำเร็จ", "เพิ่มรายงานประจำรอบสำเร็จ").then(() => {
        navigate("../");
      });
    } catch (error) {
      throw new Error("Error! cannot post the data");
    } finally {
      setLoading(false);
    }
  };

  const onFinishEdit = () => {};
  return (
    <>
      <div className="w-full h-full bg-[#f0f2f5]">
        <div className="flex flex-col">
          {isEdit ? (
            <BreadcrumbComponent
              links={EditBreadCrumbLinks}
              title="แก้ไขข้อมูลรายงานประจำรอบ"
            />
          ) : (
            <BreadcrumbComponent
              links={BreadCrumbLinks}
              title="รายงานประจำรอบ"
            />
          )}
        </div>
        <ReportStatusBar
          serviceRequestID={Number(id)}
          status={form.getFieldValue("statusID")}
          userID={form.getFieldValue("staffID")}
          maintain
        />
        <Form
          form={form}
          layout="vertical"
          onFinish={isEdit ? onFinishEdit : onFinish}
        >
          <div className="flex flex-col lg:flex-row px-6 gap-4 mt-6">
            <div className=" bg-white w-full  rounded-md px-6">
              <div className="mt-6">
                <p className=" text-md font-medium">เพิ่มรายงานประจำรอบ</p>
              </div>

              <div className="flex flex-col gap-y-4 mt-4">
                <div className=" flex flex-col gap-x-4 lg:flex-row">
                  <div className=" flex flex-col w-full lg:w-1/2">
                    <Form.Item
                      label="เครื่องจักร"
                      name="machineID"
                      rules={[
                        {
                          required: true,
                          message: "Please input your machine id!",
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        className=" w-full mt-2 text-sm placeholder:text-sm"
                        placeholder="เครื่องจักร"
                        disabled={loading}
                        options={machineOption}
                        filterOption={filterOption}
                      />
                    </Form.Item>
                  </div>
                  <div className=" flex flex-col w-full lg:w-1/2">
                    <Form.Item
                      label="ระยะเวลา"
                      name="period"
                      rules={[
                        {
                          required: true,
                          message: "Please input your machine id!",
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        className=" w-full mt-2 text-sm placeholder:text-sm"
                        placeholder="ระยะเวลา"
                        disabled={loading}
                        options={periodOptions}
                        filterOption={filterOption}
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="w-full flex flex-row justify-between items-center">
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

export default CreateMaintenancePage;
