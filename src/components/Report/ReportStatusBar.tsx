import { AuthContext } from "@/context/auth.context";
import { Option } from "@/interface/utils.interface";
import { handleReportStatus } from "@/utils/reportStatus";
import { Button, Select } from "antd";
import { useContext, useState } from "react";
import ReportStatusChangeModal from "./ReportStatusChangeModal";
import { UpdateMaintenanceLogStatus } from "@/api/maintenancelog.api";
import { UpdateServiceRequestStatus } from "@/api/servicerequest.api";
import { SwalError, SwalSuccess } from "@/utils/swal";
import { useNavigate } from "react-router-dom";

const ReportStatusBar = ({
  serviceRequestID,
  status,
  userID,
  isResponse,
  maintain,
}: {
  serviceRequestID: number;
  status: number;
  userID: number;
  isResponse?: boolean;
  maintain?: boolean;
}) => {
  const navigate = useNavigate();
  const Auth = useContext(AuthContext);
  const [statusID, setStatusID] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);

  const disableByStatus = [3, 4, 5];
  const closeCaseOptions: Option[] = [
    { value: "3", label: "ซ่อมสำเร็จ" },
    { value: "5", label: "ปฏิเสธคำร้อง" },
    { value: "6", label: "ไม่สามารถซ่อมได้" },
  ];

  const maintainOptions: Option[] = [{ value: "3", label: "ซ่อมสำเร็จ" }];

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
          {(Auth?.authContext.id === userID ||
            Auth?.authContext.positionID != 1) && (
            <Button
              danger
              className="mr-3 h-10"
              disabled={isResponse}
              onClick={async () => {
                if (maintain) {
                  const result = await UpdateMaintenanceLogStatus(
                    serviceRequestID,
                    { statusID: 5 },
                  );
                  setOpen(false);
                  if (result.status !== 200) {
                    SwalError("เกิดข้อผิดพลาด", "ไม่สามารถแก้ไขสถานะได้");
                  } else {
                    SwalSuccess("สำเร็จ", "เปลี่ยนสถานะเสร็จสิ้น").then(() => {
                      navigate("../");
                    });
                  }
                } else {
                  const result = await UpdateServiceRequestStatus(
                    serviceRequestID,
                    {
                      statusID: 5,
                    },
                  );
                  setOpen(false);
                  if (result.status !== 200) {
                    SwalError("เกิดข้อผิดพลาด", "ไม่สามารถแก้ไขสถานะได้");
                  } else {
                    SwalSuccess("สำเร็จ", "เปลี่ยนสถานะเสร็จสิ้น").then(() => {
                      navigate("../");
                    });
                  }
                }
              }}
            >
              ยกเลิกคำร้อง
            </Button>
          )}
          {Auth?.authContext.positionID !== 1 && (
            <Select
              disabled={disableByStatus.includes(status)}
              size="middle"
              className=" border-primary text-primary h-10 w-1/3"
              options={maintain ? maintainOptions : closeCaseOptions}
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
        option={maintain ? maintainOptions : closeCaseOptions}
        statusID={statusID}
        setOpen={setOpen}
        open={open}
        maintain={maintain}
      />
    </div>
  );
};

export default ReportStatusBar;
