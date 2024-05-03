import BreadcrumbComponent from "@/components/BreadcrumbComponent/BreadcrumbComponent";
import QueryBar from "@/components/EmployeeInfoComponent/QueryBar";
import { Table, Space, Button, ConfigProvider } from "antd";

const dataSource = [
  {
    employeeId: "0000001",
    fname: "John",
    lname: "Doe",
    position: "ช่าง",
    bonus: 5000,
    action: "Edit/Delete",
  },
  {
    employeeId: "0000002",
    fname: "Jane",
    lname: "Smith",
    position: "พนักงานทั่วไป",
    bonus: 3000,
    action: "Edit/Delete",
  },
  {
    employeeId: "0000003",
    fname: "Bob",
    lname: "Johnson",
    position: "แอดมิน",
    bonus: 9999,
    action: "Edit/Delete",
  },
];

const columns = [
  {
    title: "รหัสพนักงาน",
    dataIndex: "employeeId",
    key: "employeeId",
  },
  {
    title: "ชื่อ",
    dataIndex: "fname",
    key: "fname",
  },
  {
    title: "นามสกุล",
    dataIndex: "lname",
    key: "lname",
  },
  {
    title: "ตำแหน่ง",
    dataIndex: "position",
    key: "position",
  },
  {
    title: "เงินพิเศษ",
    dataIndex: "bonus",
    key: "bonus",
  },
  {
    title: "Action",
    key: "action",
    render: () => (
      <Space size="middle">
        <Button className=" border-[#0174BE] text-[#0174BE] text-sm">
          ตรวจสอบ
        </Button>
        <Button className="border-[#0174BE] text-[#0174BE] text-sm">
          แก้ไข
        </Button>
      </Space>
    ),
  },
];

const EmployeeInfo = () => {
  return (
        <div className="w-full bg-[#f0f2f5]">
          <div className="flex flex-col">
            <BreadcrumbComponent />
          </div>
          <div className="m-6 h-28 bg-white rounded-md">
            <QueryBar />
          </div>

          <div className="m-6 bg-white rounded-md">
            <div className="flex flex-row w-full">
              <div className="flex-1">
                <p className="px-6 py-5 text-lg">Search Table</p>
              </div>
              <div className="flex px-6 items-center justify-end">
                <Button
                  type="primary"
                  className="bg-[#0174BE] text-white flex text-sm h-9 align-middle items-center"
                  href="addEmployee"
                >
                  เพิ่มข้อมูลพนักงาน
                </Button>
              </div>
            </div>

            <div className="mx-6 text-sm">
              <ConfigProvider
                theme={{
                  components: {
                    Table: {
                      cellFontSize: 15,
                    },
                  },
                }}
              >
              <Table className="" dataSource={dataSource} columns={columns} />
              </ConfigProvider>
            </div>
          </div>
        </div>
  );
};

export default EmployeeInfo;
