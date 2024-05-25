import { AuthContext } from "@/context/auth.context";
import { Button, ConfigProvider, Select } from "antd";
import { useContext } from "react";

const ReportStatusBar = ({
  status,
  userID,
  isResponse,
}: {
  status: number;
  userID: number;
  isResponse: boolean;
}) => {
  const Auth = useContext(AuthContext);

  const statusObj = {
    statusColor: "",
    statusTextColor: "",
    statusName: "",
  };

  const handleStatus = (statusID: number) => {
    switch (statusID) {
      case 1: {
        statusObj.statusColor = "bg-primary";
        statusObj.statusTextColor = "text-primary";
        statusObj.statusName = "รับคำร้อง";
        return statusObj;
      }
      case 2: {
        statusObj.statusColor = "bg-yellow-500";
        statusObj.statusTextColor = "text-yellow-500";
        statusObj.statusName = "อยู่ในระหว่างการซ่อม";
        return statusObj;
      }
      case 3: {
        statusObj.statusColor = "bg-green-500";
        statusObj.statusTextColor = "text-green-500";
        statusObj.statusName = "สำเร็จ";
        return statusObj;
      }
      case 4: {
        statusObj.statusColor = "bg-red-500";
        statusObj.statusTextColor = "text-red-500";
        statusObj.statusName = "ยกเลิกคำร้อง (โดยผู้ใช้)";
        return statusObj;
      }
      case 5: {
        statusObj.statusColor = "bg-red-500";
        statusObj.statusTextColor = "text-red-500";
        statusObj.statusName = "ปฏิเสธคำร้อง";
        return statusObj;
      }
      case 6: {
        statusObj.statusColor = "bg-unavailable";
        statusObj.statusTextColor = "text-unavailable";
        statusObj.statusName = "ไม่สามารถซ่อมได้";
        return statusObj;
      }
    }
  };

  const disableByStatus = [3, 4, 5];
  const closeCaseOptions = [
    { value: 1, label: "เรียบร้อย" },
    { value: 2, label: "ไม่สามารถซ่อมได้" },
  ];

  return (
    <div className="flex flex-col md:flex-row px-6 gap-4 mt-6">
      <div className="bg-white w-full rounded-md p-6 flex flex-row">
        <div className="flex-1">
          <p className=" text-md font-medium">สถานะคำร้อง</p>
          <div className=" flex flex-row mt-4 items-center">
            <div
              className={`flex size-3 ${handleStatus(status)?.statusColor} rounded-full`}
            ></div>
            <p
              className={`text-md px-2 ${handleStatus(status)?.statusTextColor}`}
            >
              {handleStatus(status)?.statusName}
            </p>
          </div>
        </div>
        <div className="flex flex-row justify-end">
          {Auth?.authContext.id === userID && (
            <Button danger className="mr-3 h-10" disabled={isResponse}>
              ยกเลิกคำร้อง
            </Button>
          )}

          {Auth?.authContext.positionID === 2 && (
            <Select
              disabled={disableByStatus.includes(status)}
              size="middle"
              className=" placeholder:border-primary placeholder:text-primary h-10"
              options={closeCaseOptions}
              placeholder="แจ้งปิดคำร้อง"
            ></Select>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportStatusBar;
