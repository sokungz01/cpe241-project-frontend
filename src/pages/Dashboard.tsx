import {
  GetAllInventoryAnalyze,
  GetAllMachineTypeErrorAnalyze,
} from "@/api/analysis.api";
import { GetAllEmployee } from "@/api/employee.api";
import { GetAllMachine } from "@/api/machine.api";
import AnalyticCard from "@/components/Dashboard/AnalyticCard";
import {
  IInventoryAnalysis,
  IMachineTypeErrorAnylysis,
} from "@/interface/analysis.interface";
import { IEmployee } from "@/interface/employee.interface";
import { IMachine } from "@/interface/machine.interface";
import { chartOptions } from "@/utils/chart";
import { Spin } from "antd";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
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
);

const colors = [
  "rgba(75,192,192,1)",
  "rgba(255,99,132,1)",
  "rgba(255,206,86,1)",
  "rgba(54,162,235,1)",
  "rgba(153,102,255,1)",
];

const Dashboard = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [inventoryData, setInventoryData] = useState<IInventoryAnalysis[]>([]);
  const [machineTypeErrorData, setMachineTypeErrorData] = useState<
    IMachineTypeErrorAnylysis[]
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

  // Use useEffect to update InventoryAnalyticState when inventoryData changes
  useEffect(() => {
    const categories = [
      ...new Set(inventoryData.map((item) => item.categoryName)),
    ];
    const datasets = categories.map((category) => {
      const categoryData = inventoryData.filter(
        (item) => item.categoryName === category,
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
          new Date(item.requestDate).toLocaleDateString(),
        ),
      ),
    ];

    const updatedDatasets = machineTypes.map((machineType, index) => {
      const dataForMachineType = machineTypeErrorData.filter(
        (item) => item.machineTypeName === machineType,
      );

      const data = dates.map((date) => {
        const itemForDate = dataForMachineType.find(
          (item) => new Date(item.requestDate).toLocaleDateString() === date,
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

    setMachineErrorAnalyticState({
      labels: dates,
      datasets: updatedDatasets,
    });

    setInventoryAnalyticState({
      labels: Array.from(
        new Set(inventoryData.map((item) => item.Date.toString())),
      ),
      datasets: datasets.flat(),
    });
  }, [inventoryData, machineTypeErrorData]);

  const EmployeeData = useMemo(
    () => [
      {
        icon: <FaUser className="size-12" />,
        title: "พนักงงาน",
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
    [],
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
    [],
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
            Date: new Date(item.Date).toString(), // Convert the Date property to a Date object
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
              requestDate: new Date(item.requestDate).toString(),
            };
          },
        );
        setMachineTypeErrorData(remapData);
      } catch (error) {
        throw new Error("Error! cannot get the data");
      }
    };
    Promise.all([
      fetchEmployee(),
      fetchMachine(),
      fetchInventory(),
      fetchMachineError(),
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
                กราฟแสดงอัตราการเพิ่ม - ลดของอุปกรณ์คงคลังในแต่ละวัน
                เทียบกับประเภทของอุปกรณ์
              </p>
              <div className="w-full">
                <Line data={InventoryAnalyticState} options={chartOptions} />
              </div>
            </div>
            <div className="bg-white shadow-xl my-5 p-5 flex flex-col">
              <p className="text-center text-lg font-light my-4">
                กราฟแสดงอัตราการเพิ่ม - ลดของอุปกรณ์คงคลังในแต่ละวัน
                เทียบกับประเภทของอุปกรณ์
              </p>
              <div className="w-full">
                <Line data={MachineErrorAnalyticState} options={chartOptions} />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
