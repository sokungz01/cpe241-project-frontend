import { GetAllMachine } from "@/api/machine.api";
import { GetAllMachineType } from "@/api/machinetype.api";
import BreadcrumbComponent from "@/components/BreadcrumbComponent/BreadcrumbComponent";
import TableInfo from "@/components/Info/TableInfo";
import QueryMachine from "@/components/Machine/QueryMachine";
import { IMachine } from "@/interface/machine.interface";
import { IMachineType } from "@/interface/machinetype.interface";
import { IBreadcrumb } from "@/interface/utils.interface";
import { handleMachineStatus } from "@/utils/reportStatus";
import { Button, Space } from "antd";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const MachineInfo = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [select, setSelect] = useState<number>(0);
  const [machineData, setMachineData] = useState<IMachine[]>([]);
  const [masterData, setMasterdata] = useState<IMachine[]>([]);
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
      setMasterdata(result.data);
      setMachineData(result.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      throw new Error("Error! Fetching data failed");
    }
  };

  useMemo(() => {
    let filteredData = masterData;
    if (search !== "") {
      filteredData = filteredData.filter((item) => {
        return (
          item.machineName.toLowerCase().match(search.toLowerCase()) ||
          item.machineBrand.toLowerCase().match(search.toLowerCase()) ||
          item.machineID.toString().match(search.toLowerCase())
        );
      });
    }
    if (select !== 0) {
      filteredData = filteredData.filter((item) => {
        return item.machineTypeID === select;
      });
    }
    setMachineData(filteredData);
  }, [masterData, search, select]);

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
      key: "status",
      sorter: (a: IMachine, b: IMachine) => a.status - b.status,
      render: (row: IMachine) => {
        return (
          <>
            <div className=" flex flex-row items-center">
              <div
                className={`flex size-3 ${handleMachineStatus(row.status)?.statusColor} rounded-full`}
              ></div>
              <p
                className={`text-md px-2 ${handleMachineStatus(row.status)?.statusTextColor}`}
              >
                {handleMachineStatus(row.status)?.statusName}
              </p>
            </div>
          </>
        );
      },
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
          {/* <Button
            className=" border-[#0174BE] text-[#0174BE] text-sm"
            onClick={() => {
              setOpenModal(true);
              setMachineIndData(row);
            }}
          >
            ตรวจสอบ
          </Button> */}
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

      <div className="m-6 bg-white rounded-md">
        <QueryMachine
          setSearch={setSearch}
          machineType={machineTypeData}
          setMachineType={setSelect}
        />
      </div>

      <TableInfo
        title="รายการทั้งหมด"
        hrefBtn="create"
        titleBtn="เพิ่มประเภทเครื่องจักร"
        columns={columns}
        dataSource={machineData}
        loading={loading}
      />
    </div>
  );
};

export default MachineInfo;
