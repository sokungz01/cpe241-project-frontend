import { IMaintenanceParts } from "@/interface/maintenanceparts.interface";
import { IServiceResponse } from "@/interface/serviceresponse.interface";
import { convertDateToString } from "@/utils/util";
import { useMemo } from "react";

const ResponseCard = ({
  index,
  data,
}: {
  index: number;
  data: IServiceResponse;
}) => {
  useMemo(async () => {}, []);

  return (
    <div className="border rounded-xl p-5 my-4">
      <h5 className="font-medium">
        รายงานครั้งที่ #{index} |
        <span className="font-light"> {data.title}</span>
      </h5>
      <div className="mt-2">
        <h6>รายละเอียดการรายงาน : </h6>
        <div className="w-full border rounded-lg px-2 py-3">
          <p className="text-md font-light">{data.description}</p>
        </div>
        {data.maintenanceParts.length > 0 && (
          <div className="my-2">
            <p className="text-md">อุปกรณ์ที่ใช้</p>
            <div className="w-full border rounded-lg px-2 py-3">
              <ul className="text-md font-light list-decimal px-6 tabular-nums">
                {data.maintenanceParts.map((item: IMaintenanceParts, index) => {
                  return (
                    <li key={index}>
                      {item.item.itemName} จำนวน {item.qty} ชิ้น
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
        <p className="text-sm mt-2">
          รายงานโดย :
          {data.user.name.toLocaleUpperCase() +
            " " +
            data.user.surname.toLocaleUpperCase()}{" "}
          เมื่อวันที่ : {convertDateToString(new Date(data.createdDate))}
        </p>
      </div>
      <hr className="w-full my-4" />
    </div>
  );
};

export default ResponseCard;
