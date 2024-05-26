import {
  GetAllEmployeeEngagement,
  GetAllInventoryAnalyze,
  GetAllMachineTypeErrorAnalyze,
  GetAllMaintainCost,
} from "@/api/analysis.api";
import { GetAllEmployee } from "@/api/employee.api";
import { GetAllMachine } from "@/api/machine.api";
import AnalyticCard from "@/components/Dashboard/AnalyticCard";
import TableInfo from "@/components/Info/TableInfo";
import {
  IEmployeeEngagementAnalysis,
  IInventoryAnalysis,
  IMachineTypeErrorAnylysis,
  IMaintenanceCostAnlysis,
} from "@/interface/analysis.interface";
import { IEmployee } from "@/interface/employee.interface";
import { IMachine } from "@/interface/machine.interface";
import { chartOptions } from "@/utils/chart";
import { convertDateToString } from "@/utils/util";
import { Spin } from "antd";
import {
  CategoryScale,
  Chart as ChartJS,
  ArcElement,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useMemo, useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import { FaUser, FaUserCog, FaUserTie } from "react-icons/fa";
import { IoCloudDone, IoCloudOffline } from "react-icons/io5";
import { RiAdminFill } from "react-icons/ri";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const colors = [
  "rgba(75,192,192,1)",
  "rgba(255,99,132,1)",
  "rgba(255,206,86,1)",
  "rgba(54,162,235,1)",
  "rgba(153,102,255,1)",
];

const TableColumns = [
  {
    title: "อันดับที่",
    dataIndex: "index",
    key: "index",
    render: (_value: any, _row: any, index: number) => index + 1,
    width: "10%",
  },
  {
    title: "รหัส",
    key: "employeeID",
    render: (row: IEmployeeEngagementAnalysis) =>
      row.employeeID.toString().padStart(6, "0"),
  },
  {
    title: "รายชื่อ",
    key: "staff",
    render: (row: IEmployeeEngagementAnalysis) => row.name + " " + row.surname,
    width: "20%",
  },
  {
    title: "จำนวนการซ่อม",
    key: "itemName",
    render: (row: IEmployeeEngagementAnalysis) =>
      row.maintenanceCount + "  ครั้ง",
  },
  {
    title: "จำนวนชิ้นที่เบิกรวม",
    key: "totalInventoryUsed",
    render: (row: IEmployeeEngagementAnalysis) =>
      row.totalInventoryUsed + "  ชิ้น",
  },
  {
    title: "อุปกรณ์ที่ใช้",
    dataIndex: "inventoryItemsUsed",
    key: "inventoryItemsUsed",
  },
];

const Dashboard = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [inventoryData, setInventoryData] = useState<IInventoryAnalysis[]>([]);
  const [machineTypeErrorData, setMachineTypeErrorData] = useState<
    IMachineTypeErrorAnylysis[]
  >([]);
  const [employeeEngagementData, setEmployeeEngagementData] = useState<
    IEmployeeEngagementAnalysis[]
  >([]);

  const [maintainCostData, setMaintainCostData] = useState<
    IMaintenanceCostAnlysis[]
  >([]);
  // Define the state for InventoryAnalyticState
  const [InventoryAnalyticState, setInventoryAnalyticState] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
      borderWidth: number;
    }[];
  }>({
    labels: [],
    datasets: [],
  });
  const [MachineErrorAnalyticState, setMachineErrorAnalyticState] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
      borderWidth: number;
    }[];
  }>({
    labels: [],
    datasets: [],
  });

  const [MaintainanceCostAnalyticState, setMaintainanceCostAnalyticState] =
    useState<{
      labels: string[];
      datasets: {
        data: number[];
        backgroundColor: string[];
      }[];
    }>({
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [],
        },
      ],
    });

  // Use useEffect to update InventoryAnalyticState when inventoryData changes
  useEffect(() => {
    const categories = [
      ...new Set(inventoryData.map((item) => item.categoryName)),
    ];
    const datasets = categories.map((category) => {
      const categoryData = inventoryData.filter(
        (item) => item.categoryName === category
      );
      const addedData = categoryData.map((item) => item.totalAdded);
      const removedData = categoryData.map((item) => item.totalRemoved);

      return [
        {
          label: `${category} - Added`,
          data: addedData,
          fill: false,
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.4)",
          borderWidth: 1,
        },
        {
          label: `${category} - Removed`,
          data: removedData,
          fill: false,
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.4)",
          borderWidth: 1,
        },
      ];
    });

    const machineTypes = [
      ...new Set(machineTypeErrorData.map((item) => item.machineTypeName)),
    ];
    const dates = [
      ...new Set(
        machineTypeErrorData.map((item) =>
          new Date(item.requestDate).toLocaleDateString()
        )
      ),
    ];

    const updatedDatasets = machineTypes.map((machineType, index) => {
      const dataForMachineType = machineTypeErrorData.filter(
        (item) => item.machineTypeName === machineType
      );

      const data = dates.map((date) => {
        const itemForDate = dataForMachineType.find(
          (item) => new Date(item.requestDate).toLocaleDateString() === date
        );
        return itemForDate ? itemForDate.totalServiceRequests : 0;
      });

      return {
        label: machineType,
        data,
        fill: false,
        borderColor: colors[index % colors.length],
        backgroundColor: colors[index % colors.length],
        borderWidth: 1,
      };
    });

    const labels = maintainCostData.map((item) => item.errorName);
    const data = maintainCostData.map((item) => item.totalMaintenanceCost);
    const backgroundColor = labels.map(
      (_, index) => `hsl(${(index / labels.length) * 360}, 100%, 75%)`
    );

    setMaintainanceCostAnalyticState({
      labels,
      datasets: [
        {
          data,
          backgroundColor,
        },
      ],
    });
    setInventoryAnalyticState({
      labels: Array.from(
        new Set(inventoryData.map((item) => item.Date.toString()))
      ),
      datasets: datasets.flat(),
    });

    setMachineErrorAnalyticState({
      labels: dates,
      datasets: updatedDatasets,
    });
  }, [inventoryData, machineTypeErrorData, maintainCostData]);

  const EmployeeData = useMemo(
    () => [
      {
        icon: <FaUser className="size-12" />,
        title: "พนักงาน",
        data: 0,
      },
      {
        icon: <FaUserCog className="size-12" />,
        title: "ช่างเทคนิค",
        data: 0,
      },
      {
        icon: <RiAdminFill className="size-12" />,
        title: "ผู้ดูแล",
        data: 0,
      },
      {
        icon: <FaUserTie className="size-12" />,
        title: "ผู้จัดการ",
        data: 0,
      },
    ],
    []
  );

  const MachineData = useMemo(
    () => [
      {
        icon: <IoCloudDone className="size-12" />,
        title: "กำลังใช้งาน",
        data: 0,
      },
      {
        icon: <IoCloudOffline className="size-12" />,
        title: "หยุดการใช้งาน",
        data: 0,
      },
    ],
    []
  );

  useMemo(async () => {
    setLoading(true);
    const fetchEmployee = async () => {
      try {
        const result = await GetAllEmployee();
        const employeeData: IEmployee[] = result.data;
        employeeData.forEach((item) => {
          if (item.positionID === 1) {
            EmployeeData[0].data += 1;
          } else if (item.positionID === 2) {
            EmployeeData[1].data += 1;
          } else if (item.positionID === 3) {
            EmployeeData[2].data += 1;
          } else if (item.positionID === 4) {
            EmployeeData[3].data += 1;
          }
        });
      } catch (error) {
        throw new Error("Error! cannot get the data");
      }
    };

    const fetchMachine = async () => {
      try {
        const result = await GetAllMachine();
        const employeeData: IMachine[] = result.data;
        employeeData.forEach((item) => {
          if (item.status === 1) {
            MachineData[0].data += 1;
          } else {
            MachineData[1].data += 1;
          }
        });
      } catch (error) {
        throw new Error("Error! cannot get the data");
      }
    };

    const fetchInventory = async () => {
      try {
        const result = await GetAllInventoryAnalyze();
        const invData: IInventoryAnalysis[] = result.data;
        const remapData = invData.map((item: IInventoryAnalysis) => {
          return {
            ...item,
            Date: convertDateToString(new Date(item.Date)), // Convert the Date property to a Date object
          };
        });
        setInventoryData(remapData);
      } catch (error) {
        throw new Error("Error! cannot get the data");
      }
    };

    const fetchMachineError = async () => {
      try {
        const result = await GetAllMachineTypeErrorAnalyze();
        const machineTypeError: IMachineTypeErrorAnylysis[] = result.data;
        const remapData: IMachineTypeErrorAnylysis[] = machineTypeError.map(
          (item: IMachineTypeErrorAnylysis) => {
            return {
              machineTypeName: item.machineTypeName,
              totalServiceRequests: item.totalServiceRequests,
              requestDate: convertDateToString(new Date(item.requestDate)),
            };
          }
        );
        setMachineTypeErrorData(remapData);
      } catch (error) {
        throw new Error("Error! cannot get the data");
      }
    };

    const fetchMachineTypeError = async () => {
      try {
        const result = await GetAllMachineTypeErrorAnalyze();
        const machineTypeError: IMachineTypeErrorAnylysis[] = result.data;
        const remapData: IMachineTypeErrorAnylysis[] = machineTypeError.map(
          (item: IMachineTypeErrorAnylysis) => {
            return {
              machineTypeName: item.machineTypeName,
              totalServiceRequests: item.totalServiceRequests,
              requestDate: new Date(item.requestDate),
            };
          }
        );
        setMachineTypeErrorData(remapData);
      } catch (error) {
        throw new Error("Error! cannot get the data");
      }
    };

    const fetchMaintenanceCost = async () => {
      try {
        const result = await GetAllMaintainCost();
        const maintainCost: IMaintenanceCostAnlysis[] = result.data;
        const remapData: IMaintenanceCostAnlysis[] = maintainCost.map(
          (item: IMaintenanceCostAnlysis) => {
            return {
              errorName: item.errorName,
              errorCount: item.errorCount,
              totalMaintenanceCost: item.totalMaintenanceCost,
            };
          }
        );
        setMaintainCostData(remapData);
      } catch (error) {
        throw new Error("Error! cannot get the data");
      }
    };

    const fetchEmployeeEngagement = async () => {
      try {
        const result = await GetAllEmployeeEngagement();
        const employeeEngagement: IEmployeeEngagementAnalysis[] = result.data;
        setEmployeeEngagementData(employeeEngagement);
      } catch (error) {
        throw new Error("Error! cannot get the data");
      }
    };

    Promise.all([
      fetchEmployee(),
      fetchMachine(),
      fetchInventory(),
      fetchMachineError(),
      fetchMachineTypeError(),
      fetchMaintenanceCost(),
      fetchEmployeeEngagement(),
    ]).then(() => {
      setLoading(false);
    });
  }, [EmployeeData, MachineData]);

  return (
    <>
      <div className="w-full h-full bg-[#f0f2f5] p-6">
        {loading ? (
          <div className="w-full h-full flex flex-row justify-center items-center">
            <Spin size="large" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-4 gap-x-6 gap-y-4 w-full">
              {EmployeeData.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="col-span-4 sm:col-span-2 lg:col-span-1 w-full"
                  >
                    <AnalyticCard
                      icon={item.icon}
                      title={item.title}
                      data={item.data}
                    />
                  </div>
                );
              })}

              {MachineData.map((item, index) => {
                return (
                  <div key={index} className="col-span-4 sm:col-span-2  w-full">
                    <AnalyticCard
                      icon={item.icon}
                      title={item.title}
                      data={item.data}
                    />
                  </div>
                );
              })}
            </div>
            <div className="bg-white shadow-xl my-5 p-5 flex flex-col">
              <p className="text-center text-lg font-light my-4">
                กราฟแสดงอัตราการเพิ่ม - ลดของอุปกรณ์คงคลังในแต่ละวัน - 
                แยกตามประเภทอุปกรณ์
              </p>
              <div className="w-full">
                <Line data={InventoryAnalyticState} options={chartOptions} />
              </div>
            </div>
            <div className="bg-white shadow-xl my-5 p-5 flex flex-col">
              <p className="text-center text-lg font-light my-4">
                กราฟแสดงจำนวนคำร้องแจ้งซ่อมของเครื่องจักรในแต่ละวัน -
                แยกตามประเภทของเครื่องจักร
              </p>
              <div className="w-full">
                <Line data={MachineErrorAnalyticState} options={chartOptions} />
              </div>
            </div>

            <div className="bg-white shadow-xl my-5 p-5 flex flex-col">
              <p className="text-center text-lg font-light my-4 mb-[-20px]">
                ตารางแสดงอันดับพนักงานที่มีส่วนร่วมในการซ่อมบำรุงเครื่องจักรสูงสุดและการใช้งานอุปกรณ์คงคลัง
              </p>
              <div className="w-full">
                <TableInfo
                  title=""
                  dataSource={employeeEngagementData}
                  columns={TableColumns}
                  loading={loading}
                />
              </div>
            </div>

            <div className="bg-white shadow-xl my-5 p-5 flex flex-col items-center">
              <p className="text-center text-lg font-light my-4 py-4">
                กราฟแสดงค่าใช้จ่ายในการซ่อมบำรุงเครื่องจักร -
                แยกตามประเภทความเสียหาย
              </p>
              <div className="w-1/2">
                <Pie
                  data={MaintainanceCostAnalyticState}
                  options={chartOptions}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
