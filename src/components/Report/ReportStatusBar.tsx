import { AuthContext } from "@/context/auth.context";
import { Option } from "@/interface/utils.interface";
import { handleReportStatus } from "@/utils/reportStatus";
import { Button, Select } from "antd";
import { useContext, useState } from "react";
import ReportStatusChangeModal from "./ReportStatusChangeModal";

const ReportStatusBar = ({
  serviceRequestID,
  status,
  userID,
  isResponse,
}: {
  serviceRequestID: number;
  status: number;
  userID: number;
  isResponse: boolean;
}) => {
  const Auth = useContext(AuthContext);
  const [statusID, setStatusID] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);

  const disableByStatus = [3, 4, 5];
  const closeCaseOptions: Option[] = [
    { value: "3", label: "ซ่อมสำเร็จ" },
    { value: "5", label: "ปฏิเสธคำร้อง" },
    { value: "6", label: "ไม่สามารถซ่อมได้" },
  ];

  return (
    <div className="flex flex-col md:flex-row px-6 gap-4 mt-6">
      <div className="bg-white w-full rounded-md p-6 flex flex-row">
        <div className="flex-1 w-1/2">
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
        <div className="flex flex-row justify-end w-1/2">
          {Auth?.authContext.id === userID && (
            <Button danger className="mr-3 h-10" disabled={isResponse}>
              ยกเลิกคำร้อง
            </Button>
          )}
          {Auth?.authContext.positionID !== 1 && (
            <Select
              disabled={disableByStatus.includes(status)}
              size="middle"
              className=" border-primary text-primary h-10 w-1/3"
              options={closeCaseOptions}
              onChange={(e: number) => {
                setStatusID(e);
                setOpen(true);
              }}
              placeholder="แจ้งปิดคำร้อง"
            ></Select>
          )}
        </div>
      </div>
      <ReportStatusChangeModal
        serviceRequestID={serviceRequestID}
        oldStatusID={status}
        option={closeCaseOptions}
        statusID={statusID}
        setOpen={setOpen}
        open={open}
      />
    </div>
  );
};

export default ReportStatusBar;
