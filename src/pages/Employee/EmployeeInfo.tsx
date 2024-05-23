import { GetAllEmployee } from "@/api/employee.api";
import { GetAllPosition } from "@/api/position.api";
import BreadcrumbComponent from "@/components/BreadcrumbComponent/BreadcrumbComponent";
import QueryBar from "@/components/EmployeeInfoComponent/QueryBar";
import TableInfo from "@/components/Info/TableInfo";
import { ESALARY_RANGE, SALARAY_RANGE } from "@/enum/salary.enum";
import { IEmployee } from "@/interface/employee.interface";
import { IPosition } from "@/interface/position.interface";
import { Filter, IBreadcrumb } from "@/interface/utils.interface";
import { Button, Space } from "antd";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import EmployeeInfoModal from "../../components/EmployeeInfoComponent/EmployeeInfoModal";

const EmployeeInfo = () => {
  const [employeeData, setEmployeeData] = useState<IEmployee[]>([]);
  const [masterEmployeeData, setMasterEmployeeData] = useState<IEmployee[]>([]);
  const [positionData, setPositionData] = useState<IPosition[]>([]);
  const [filter, setFilter] = useState<Filter>({
    search: "",
    positionID: 0,
    range: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [employeeIndData, setEmployeeIndData] = useState<IEmployee>({
    id: 0,
    name: "",
    surname: "",
    imageURL: "",
    bonus: 0,
    positionID: 0,
    email: "",
    password: "",
  });

  const BreadCrumbLinks: IBreadcrumb[] = [
    {
      title: "ข้อมูลพนักงาน",
      href: "",
    },
    {
      title: "ข้อมูลทั้งหมด",
    },
  ];

  const fetchAllPosition = async () => {
    try {
      const result = await GetAllPosition();
      setPositionData(result.data);
    } catch (err) {
      throw new Error("Error! Failed to fetch data [position]");
    }
  };

  const fetchAllEmployee = async () => {
    setLoading(true);
    try {
      const result = await GetAllEmployee();
      setEmployeeData(result.data);
      setMasterEmployeeData(result.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      throw new Error("Error! Failed to fetch data [employee]");
    }
  };

  useEffect(() => {
    Promise.all([fetchAllEmployee(), fetchAllPosition()]);
  }, []);

  useMemo(() => {
    let filteredData = masterEmployeeData;
    const search = filter.search;
    if (search !== "") {
      filteredData = filteredData.filter((item) => {
        return (
          item.id.toString().match(search) ||
          item.name.toLowerCase().match(search.toLowerCase()) ||
          item.surname.toLowerCase().match(search.toLowerCase())
        );
      });
    }

    if (filter.positionID !== 0) {
      filteredData = filteredData.filter((item) => {
        return item.positionID == Number(filter.positionID);
      });
    }
    if (filter.range !== 0) {
      const range: ESALARY_RANGE = filter.range;
      filteredData = filteredData.filter((item) => {
        const salaryRange = SALARAY_RANGE[range];
        if (salaryRange) {
          return (
            item.bonus >= salaryRange.low && item.bonus <= salaryRange.high
          );
        }
      });
    }

    setEmployeeData(filteredData);
  }, [filter, masterEmployeeData]);

  const columns = [
    {
      title: "รหัสพนักงาน",
      dataIndex: "id",
      key: "id",
      render: (record: number) => {
        return record.toString().padStart(6, "0");
      },
    },
    {
      title: "ชื่อ",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "นามสกุล",
      dataIndex: "surname",
      key: "surname",
    },
    {
      title: "ตำแหน่ง",
      key: "position",
      render: (row: IEmployee) =>
        positionData.find((item) => item.positionID === row.positionID)
          ?.positionName,
    },
    {
      title: "เงินพิเศษ",
      dataIndex: "bonus",
      key: "bonus",
      render: (record: number) =>
        record.toLocaleString("th-TH", { style: "currency", currency: "THB" }),
    },
    {
      title: "Action",
      key: "action",
      width: 150,
      align: "center" as const,
      render: (row: IEmployee) => (
        <Space size="middle">
          <Button
            className=" border-[#0174BE] text-[#0174BE] text-sm"
            onClick={() => {
              setEmployeeIndData(row);
              setOpenModal(true);
            }}
          >
            ตรวจสอบ
          </Button>
          <Link to={`edit/${row.id}`}>
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
        <BreadcrumbComponent links={BreadCrumbLinks} title={"ข้อมูลพนักงาน"} />
      </div>
      <div className="m-6 bg-white rounded-md">
        <QueryBar positionData={positionData} setFilter={setFilter} />
      </div>

      <TableInfo
        title="รายการทั้งหมด"
        hrefBtn="create"
        titleBtn="เพิ่มพนักงาน"
        columns={columns}
        dataSource={employeeData}
        loading={loading}
      />

      <EmployeeInfoModal
        open={openModal}
        setOpen={setOpenModal}
        data={employeeIndData}
        setData={setEmployeeIndData}
      />
    </div>
  );
};

export default EmployeeInfo;
