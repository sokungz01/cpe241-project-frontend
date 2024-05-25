import { CreateServiceRequest } from "@/api/servicerequest.api";
import BreadcrumbComponent from "@/components/BreadcrumbComponent/BreadcrumbComponent";
import ServiceRequestForm from "@/components/Report/ServiceRequestForm";
import { AuthContext } from "@/context/auth.context";
import { ISerivceRequest } from "@/interface/servicerequest.interface";
import { IBreadcrumb } from "@/interface/utils.interface";
import { SwalError, SwalSuccess } from "@/utils/swal";
import { Form } from "antd";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const ServiceRequest = () => {
  const [form] = Form.useForm();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const BreadCrumbLinks: IBreadcrumb[] = [
    {
      title: "ข้อมูลการรายงาน",
      href: "./",
    },
    {
      title: "รายงานทั้งหมด",
      href: "./",
    },
    {
      title: "เพิ่มรายงาน",
    },
  ];

  const onFinish = async (values: ISerivceRequest) => {
    setLoading(true);
    try {
      if (!values.errorLog || values.errorLog.length <= 0) {
        SwalError("แจ้งเตือน", "กรุณาระบุปัญหาที่พบ");
        throw new Error("Error! errorlog is empyty");
      }

      values.createdDate = new Date();
      values.employeeID = Number(auth?.authContext.id);
      values.machineID = Number(values.machineID);

      values.errorLog.forEach((item, index) => {
        values.errorLog[index].errorTypeID = Number(item.errorTypeID);
      });

      const result = await CreateServiceRequest(values);

      if (result.status !== 200) {
        SwalError("เกิดข้อผิดพลาด", result.data);
        throw new Error("Error! Data cannot post the data");
      }

      SwalSuccess("สำเร็จ", "เพิ่มการรายงานใหม่").then(() => {
        navigate("../");
      });

      console.log(values);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw new Error("Error! Cannot Post the data!");
    }
  };

  return (
    <div className="w-full h-full bg-[#f0f2f5]">
      <div className="flex flex-col">
        <BreadcrumbComponent links={BreadCrumbLinks} title="เพิ่มรายงาน" />
      </div>
      <ServiceRequestForm onFinish={onFinish} loading={loading} form={form} />
    </div>
  );
};

export default ServiceRequest;
