import { IEmployee } from "@/interface/employee.interface";
import { Button, Modal } from "antd";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";

const EmployeeInfoModal = ({
  data,
  open,
  setOpen,
}: {
  data: IEmployee;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        width={350}
        closeIcon={false}
        centered
        footer={[
          <Button
            key="button"
            color="light"
            onClick={() => {
              setOpen(false);
            }}
          >
            Close
          </Button>,
        ]}
      >
        <div className="flex flex-row justify-between items-center">
          <FaLessThan />
          <h5 className="text-xl font-semibold text-center my-4">
            ข้อมูลพนักงาน
          </h5>
          <FaGreaterThan />
        </div>
        <div className="w-full flex justify-center">
          <img
            src={data.imageURL || "/user_profile.png"}
            className="w-3/4 aspect-square"
          />
        </div>
        <hr className="my-4" />
        <div className="flex flex-row items-center gap-x-4">
          <img src="/user_profile.png" className="size-12 rounded-full" />
          <div className="flex flex-col ">
            <p className="text-base">
              {data.name} {data.surname}
            </p>
            <p className="text-sm">{data.id.toString().padStart(5, "0")}</p>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default EmployeeInfoModal;
