import { GetServiceRequestByID } from "@/api/servicerequest.api";
import {
  CreateServiceResponse,
  GetServiceResponseByServiceID,
} from "@/api/serviceresponse.api";
import BreadcrumbComponent from "@/components/BreadcrumbComponent/BreadcrumbComponent";
import ServiceRequestForm from "@/components/Report/ServiceRequestForm";
import ServiceResponseForm from "@/components/Report/ServiceResponseForm";
import { AuthContext } from "@/context/auth.context";
import { IErrorlog } from "@/interface/errorlog.interface";
import { IMaintenanceParts } from "@/interface/maintenanceparts.interface";
import { ISerivceRequest } from "@/interface/servicerequest.interface";
import { IServiceResponse } from "@/interface/serviceresponse.interface";
import { IBreadcrumb } from "@/interface/utils.interface";
import { SwalError, SwalSuccess } from "@/utils/swal";
import { Form } from "antd";
import dayjs from "dayjs";
import { useCallback, useContext, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ResponseSection from "../../components/Report/ResponseSection";

const ServiceResponse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [requestForm] = Form.useForm();
  const [responseData, setResponseData] = useState<IServiceResponse[]>();
  const [responseForm] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const BreadCrumbLinks: IBreadcrumb[] = [
    {
      title: "ข้อมูลการรายงาน",
      href: "../",
    },
    {
      title: "รายงานทั้งหมด",
      href: "../",
    },
    {
      title: "เพิ่มรายงาน",
    },
  ];

  const fetchServiceRequest = useCallback(
    async (serviceID: number) => {
      setLoading(true);
      try {
        if (!serviceID || serviceID === 0)
          throw new Error("Error! Invalid serviceID");
        const result = await GetServiceRequestByID(serviceID);
        const serviceData: ISerivceRequest = result.data;
        requestForm.setFieldsValue(serviceData);
        requestForm.setFieldValue(
          "machineID",
          serviceData.machineID.toString(),
        );

        const errorLog: IErrorlog[] = serviceData.errorLog.map((item) => {
          return {
            ...item,
            errorTypeID: item.errorTypeID.toString(),
          } as IErrorlog;
        });

        requestForm.setFieldValue("errorLog", errorLog);
        requestForm.setFieldValue(
          "createdDate",
          dayjs(serviceData.createdDate),
        );
      } catch (err) {
        throw new Error("Error! Fetching data failed.");
      } finally {
        setLoading(false);
      }
    },
    [requestForm, setLoading],
  );

  const fetchServiceResponse = useCallback(async (serviceID: number) => {
    setLoading(true);
    try {
      if (!serviceID || serviceID === 0)
        throw new Error("Error! Invalid serviceID");
      const result = await GetServiceResponseByServiceID(serviceID);
      const serviceData: IServiceResponse[] = result.data;
      setResponseData(serviceData);
    } catch (err) {
      throw new Error("Error! Fetching data failed.");
    } finally {
      setLoading(false);
    }
  }, []);

  useMemo(async () => {
    await fetchServiceRequest(Number(id));
    await fetchServiceResponse(Number(id));
  }, [id, fetchServiceRequest, fetchServiceResponse]);

  const onFinish = async (values: IServiceResponse) => {
    setLoading(true);
    try {
      values.createdDate = new Date();
      values.updateDate = new Date();
      values.staffID = auth!.authContext.id;
      values.requestedServiceID = Number(id);
      if (values.maintenancePart == undefined || values.maintenancePart == null)
        values.maintenancePart = [];

      const elemMaintenanace: IMaintenanceParts[] = values.maintenancePart.map(
        (elem: IMaintenanceParts) => {
          elem.itemID = Number(elem.itemID);
          elem.qty = Number(elem.qty);
          return elem;
        },
      );

      values.maintenancePart = elemMaintenanace;
      console.log(values);
      const result = await CreateServiceResponse(values);

      if (result.status !== 200) {
        SwalError("เกิดข้อผิดพลาด", "ไม่สามารถสร้างรายงานปัญหาได้");
        throw new Error("Error! Cannot post the data");
      }

      SwalSuccess("สำเร็จ", "เพิ่มผลรายงงานการแจ้งซ่อม").then(() => {
        navigate("../");
      });
    } catch (error) {
      throw new Error("Error! cannot post the response data");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="w-full h-full bg-[#f0f2f5]">
        <div className="flex flex-col">
          <BreadcrumbComponent links={BreadCrumbLinks} title="เพิ่มรายงาน" />
        </div>

        <ServiceRequestForm loading={loading} form={requestForm} disabled />
        <ResponseSection loading={loading} data={responseData!} />
        {auth?.authContext.positionID != 1 &&
          (requestForm.getFieldValue("statusID") === 1 ||
            requestForm.getFieldValue("statusID") === 2) && (
            <ServiceResponseForm
              loading={loading}
              form={responseForm}
              onFinish={onFinish}
            />
          )}
      </div>
    </>
  );
};

export default ServiceResponse;
