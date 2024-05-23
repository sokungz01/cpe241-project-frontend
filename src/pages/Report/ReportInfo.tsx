import BreadcrumbComponent from "@/components/BreadcrumbComponent/BreadcrumbComponent";
import TableInfo from "@/components/Info/TableInfo";
import { IMachine } from "@/interface/machine.interface";
import { IBreadcrumb } from "@/interface/utils.interface";
import { Button, Space } from "antd";
import { Link } from "react-router-dom";

const ReportInfo = () => {
  //   const [loading, setLoading] = useState<boolean>(true);

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
      title: "รหัสเครื่องจักร",
      dataIndex: "machineID",
      key: "machineID",
    },
    {
      title: "ชื่อเครื่องจักร",
      dataIndex: "machineName",
      key: "machineName",
    },
    {
      title: "ยี่ห้อ",
      dataIndex: "machineBrand",
      key: "machineBrand",
    },
    {
      title: "สถานะเครื่องจักร",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "วันที่เริ่มใช้งาน",
      dataIndex: "startDate",
      key: "startDate",
      render: (record: Date) => {
        const date = new Date(record);
        const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        const month =
          date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1;
        const year = date.getFullYear();
        return (
          <div className="w-full content-center">
            {day}-{month}-{year}
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      width: 150,
      align: "center" as const,
      render: (row: IMachine) => (
        <Space size="middle">
          <Button
            className=" border-[#0174BE] text-[#0174BE] text-sm"
            onClick={() => {
              alert("KUY");
            }}
          >
            ตรวจสอบ
          </Button>
          <Link to={`edit/${row.machineID}`}>
            <Button className="border-[#0174BE] text-[#0174BE] text-sm">
              แก้ไข
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
        dataSource={[]}
        loading
        // dataSource={machineData}
        // loading={loading}∏
      />
    </div>
  );
};

export default ReportInfo;
