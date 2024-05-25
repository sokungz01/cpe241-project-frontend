import { GetServiceRequestByID } from "@/api/servicerequest.api";
import { GetServiceResponseByServiceID } from "@/api/serviceresponse.api";
import BreadcrumbComponent from "@/components/BreadcrumbComponent/BreadcrumbComponent";
import ServiceRequestForm from "@/components/Report/ServiceRequestForm";
import ServiceResponseForm from "@/components/Report/ServiceResponseForm";
import { AuthContext } from "@/context/auth.context";
import { IErrorlog } from "@/interface/errorlog.interface";
import { ISerivceRequest } from "@/interface/servicerequest.interface";
import { IServiceResponseGroup } from "@/interface/serviceresponse.interface";
import { IBreadcrumb } from "@/interface/utils.interface";
import { Form } from "antd";
import dayjs from "dayjs";
import { useCallback, useContext, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ResponseSection from "../../components/Report/ResponseSection";
import ReportStatusBar from "@/components/Report/ReportStatusBar";

const ServiceResponse = () => {
  const { id } = useParams();
  const auth = useContext(AuthContext);
  const [requestForm] = Form.useForm();
  const [responseData, setResponseData] = useState<IServiceResponseGroup>();
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

        setLoading(false);
      } catch (err) {
        setLoading(false);
        throw new Error("Error! Fetching data failed.");
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
      const serviceData: IServiceResponseGroup = {
        serviceResponse: result.data,
      };
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
  return (
    <>
      <div className="w-full h-full bg-[#f0f2f5]">
        <div className="flex flex-col">
          <BreadcrumbComponent links={BreadCrumbLinks} title="เพิ่มรายงาน" />
        </div>
        <ReportStatusBar status={requestForm.getFieldValue("statusID")} />
        <ServiceRequestForm loading={loading} form={requestForm} disabled />
        <ResponseSection loading={loading} data={responseData!} />
        {auth?.authContext.positionID != 1 && (
          <ServiceResponseForm loading={loading} form={responseForm} />
        )}
      </div>
    </>
  );
};

export default ServiceResponse;
