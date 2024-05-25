import { GetAllServiceRequest } from "@/api/servicerequest.api";
import BreadcrumbComponent from "@/components/BreadcrumbComponent/BreadcrumbComponent";
import TableInfo from "@/components/Info/TableInfo";
import { IEmployee } from "@/interface/employee.interface";
import { ISerivceRequest } from "@/interface/servicerequest.interface";
import { IBreadcrumb } from "@/interface/utils.interface";
import { handleReportStatus } from "@/utils/reportStatus";
import { convertDateToString } from "@/utils/util";
import { Button, Space } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ReportInfo = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [serviceRequestData, setServiceRequestData] = useState<
    ISerivceRequest[]
  >([]);

  const fetchServiceRequest = async () => {
    setLoading(true);
    try {
      const result = await GetAllServiceRequest();
      console.log(result.data);
      setServiceRequestData(result.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      throw new Error("Error! Fetching data failed");
    }
  };

  useEffect(() => {
    Promise.all([fetchServiceRequest()]);
  }, []);

  const BreadCrumbLinks: IBreadcrumb[] = [
    {
      title: "ข้อมูลการรายงาน",
      href: "",
    },
    {
      title: "รายงานทั้งหมด",
    },
  ];

  const columns = [
    {
      title: "เลขที่รายงาน",
      dataIndex: "serviceID",
      key: "serviceID",
      render: (record: number) => {
        return record.toString().padStart(6, "0");
      },
    },
    {
      title: "ชื่อเครื่องจักร",
      key: "machineName",
      render: (row: ISerivceRequest) => {
        return row.machine.machineName;
      },
    },
    {
      title: "สถานะการรายงาน",
      key: "statusID",
      sorter: (a: ISerivceRequest, b: ISerivceRequest) =>
        a.statusID - b.statusID,
      render: (row: ISerivceRequest) => {
        return (
          <>
            <div className=" flex flex-row items-center">
              <div
                className={`flex size-3 ${handleReportStatus(row.statusID)?.statusColor} rounded-full`}
              ></div>
              <p
                className={`text-md px-2 ${handleReportStatus(row.statusID)?.statusTextColor}`}
              >
                {handleReportStatus(row.statusID)?.statusName}
              </p>
            </div>
          </>
        );
      },
    },
    {
      title: "วันที่รายงานปัญหา",
      key: "createdDate",
      sorter: (a: ISerivceRequest, b: ISerivceRequest) =>
        new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime(),
      render: (row: ISerivceRequest) => {
        const createDate = convertDateToString(row.createdDate);
        let date = new Date();
        if (row.updateDate?.Time) date = new Date(row.updateDate.Time);
        const updateDate = convertDateToString(date);
        return (
          <div className="w-full content-center">
            {createDate}
            {row.updateDate != null && (
              <p className="text-xs">แก้ไขล่าสุด {updateDate}</p>
            )}
          </div>
        );
      },
    },
    {
      title: "ผู้รายงาน",
      key: "user",
      dataIndex: "user",
      render: (row: IEmployee) => {
        return (
          row.name.toLocaleUpperCase() +
          " " +
          row.surname.substring(0, 4).toLocaleUpperCase()
        );
      },
    },
    {
      title: "Action",
      key: "action",
      width: 150,
      align: "center" as const,
      render: (row: ISerivceRequest) => (
        <Space size="middle">
          <Link to={`response/${row.serviceID}`}>
            <Button className=" border-[#0174BE] text-[#0174BE] text-sm">
              แจ้งรายงาน
            </Button>
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <div className="w-full h-full bg-[#f0f2f5]">
      <div className="flex flex-col">
        <BreadcrumbComponent
          title={"ข้อมูลการรายงาน"}
          links={BreadCrumbLinks}
        />
      </div>

      <TableInfo
        title="รายการทั้งหมด"
        hrefBtn="create"
        titleBtn="เพิ่มรายงาน"
        columns={columns}
        dataSource={serviceRequestData}
        loading={loading}
      />
    </div>
  );
};

export default ReportInfo;
