import { UpdateMaintenanceLogStatus } from "@/api/maintenancelog.api";
import { UpdateServiceRequestStatus } from "@/api/servicerequest.api";
import { Option } from "@/interface/utils.interface";
import { handleReportStatus } from "@/utils/reportStatus";
import { SwalError, SwalSuccess } from "@/utils/swal";
import { Button, Modal } from "antd";
import { FaRegQuestionCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ReportStatusChangeModal = ({
  serviceRequestID,
  oldStatusID,
  statusID,
  option,
  open,
  setOpen,
  maintain,
}: {
  serviceRequestID: number;
  option: Option[];
  oldStatusID: number;
  statusID: number;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  maintain?: boolean;
}) => {
  const navigate = useNavigate();
  return (
    <>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        width={400}
        closeIcon={false}
        centered
        footer={null}
      >
        <div className="flex flex-col w-full justify-center">
          <div className="w-full flex flex-row justify-center">
            <FaRegQuestionCircle className="size-16 my-3" />
          </div>
          <h4 className="font-light text-2xl text-center">
            คุณต้องการเปลี่ยนสถานะใช่หรือไม่
          </h4>
          <hr className="w-full my-4" />
          <div className="text-center">
            <p>ต้องการเปลี่ยนสถานะ</p>
            <p>
              <span
                className={handleReportStatus(oldStatusID)?.statusTextColor}
              >
                {handleReportStatus(oldStatusID)?.statusName}
              </span>{" "}
              เป็น{" "}
              <span className="text-danger">
                {option.find((item) => Number(item.value) == statusID)?.label}
              </span>
            </p>
          </div>
          <div className="flex flex-row justify-center my-4">
            <Button
              htmlType="button"
              color="light"
              className="px-6 mx-2 border-black"
              size="middle"
              onClick={() => {
                setOpen(false);
              }}
            >
              ยกเลิก
            </Button>
            <Button
              htmlType="button"
              color="light"
              className="px-6 mx-2 bg-primary text-white"
              size="middle"
              onClick={async () => {
                if (maintain) {
                  const result = await UpdateMaintenanceLogStatus(
                    serviceRequestID,
                    { statusID: Number(statusID) },
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
                      statusID: Number(statusID),
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
              ยืนยัน
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ReportStatusChangeModal;
