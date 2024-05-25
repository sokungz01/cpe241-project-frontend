import { AuthContext } from "@/context/auth.context";
import { handleReportStatus } from "@/utils/reportStatus";
import { Button, Select } from "antd";
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

  const disableByStatus = [3, 4, 5];
  const closeCaseOptions = [
    { value: 1, label: "ซ่อมสำเร็จ" },
    { value: 2, label: "ปฏิเสธคำร้อง" },
    { value: 3, label: "ไม่สามารถซ่อมได้" },
  ];

  return (
    <div className="flex flex-col md:flex-row px-6 gap-4 mt-6">
      <div className="bg-white w-full rounded-md p-6 flex flex-row">
        <div className="flex-1">
          <p className=" text-md font-medium">สถานะคำร้อง</p>
          <div className=" flex flex-row mt-4 items-center">
            <div
              className={`flex size-3 ${handleReportStatus(status)?.statusColor} rounded-full`}
            ></div>
            <p
              className={`text-md px-2 ${handleReportStatus(status)?.statusTextColor}`}
            >
              {handleReportStatus(status)?.statusName}
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
