import { GetAllMachine } from "@/api/machine.api";
import { GetAllMachineType } from "@/api/machinetype.api";
import BreadcrumbComponent from "@/components/BreadcrumbComponent/BreadcrumbComponent";
import { IMachine } from "@/interface/machine.interface";
import { IMachineType } from "@/interface/machinetype.interface";
import { IBreadcrumb } from "@/interface/utils.interface";
import { Button, Space, Table } from "antd";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const MachineInfo = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [machineData, setMachineData] = useState<IMachine[]>([]);
  const [machineTypeData, setMachineTypeData] = useState<IMachineType[]>([]);

  const BreadCrumbLinks: IBreadcrumb[] = [
    {
      title: "ข้อมูลเครื่องจักร",
      href: "",
    },
    {
      title: "ข้อมูลทั้งหมด",
    },
  ];

  const fetchMachineTypeData = async () => {
    try {
      const result = await GetAllMachineType();
      setMachineTypeData(result.data);
    } catch (err) {
      throw new Error("Error! Fetching data failed");
    }
  };

  const fetchMachineData = async () => {
    setLoading(true);
    try {
      const result = await GetAllMachine();
      setMachineData(result.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      throw new Error("Error! Fetching data failed");
    }
  };

  useMemo(() => {
    Promise.all([fetchMachineData(), fetchMachineTypeData()]);
  }, []);

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
      title: "ประเภทเครื่องจักร",
      dataIndex: "machineTypeID",
      key: "machineTypeID",
      render: (record: number) =>
        machineTypeData.find((item) => item.machinetypeID === record)
          ?.machinetypeName,
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
          title={"ข้อมูลเครื่องจักร"}
          links={BreadCrumbLinks}
        />
      </div>

      <div className="m-6 bg-white rounded-md ">
        <div className="flex flex-col lg:flex-row w-full">
          <div className="flex-1">
            <p className="px-6 py-5 text-lg">รายการทั้งหมด</p>
          </div>
          <div className="flex mr-6 items-center justify-center lg:justify-end">
            <Link to="create">
              <Button
                type="primary"
                className="bg-[#0174BE] text-white flex text-sm py-3 align-middle items-center"
              >
                เพิ่มข้อมูลเครื่องจักร
              </Button>
            </Link>
          </div>
        </div>

        <div className="mx-6 text-sm overflow-x-auto">
          <Table columns={columns} loading={loading} dataSource={machineData} />
        </div>
      </div>
    </div>
  );
};

export default MachineInfo;
