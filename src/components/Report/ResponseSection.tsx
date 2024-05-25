import { IServiceResponseGroup } from "@/interface/serviceresponse.interface";
import { Spin } from "antd";
import ResponseCard from "./ResponseCard";

const ResponseSection = ({
  data,
  loading,
}: {
  data: IServiceResponseGroup;
  loading: boolean;
}) => {
  return (
    <div className="flex flex-col lg:flex-row px-6 gap-4 mt-6">
      <div className=" bg-white w-full  rounded-md px-6">
        <div className="my-6">
          <p className=" text-md font-medium">ผลการแจ้งซ่อม</p>
          {loading ? (
            <div className="w-full flex flex-col">
              <Spin />
            </div>
          ) : (
            <div className="my-4">
              {data.serviceResponse.length > 0 ? (
                <>
                  {data.serviceResponse.map((item, index) => {
                    return <ResponseCard data={item} index={index + 1} />;
                  })}
                </>
              ) : (
                <>
                  <p className="text-center text-gray-500">ไม่พบข้อมูล</p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResponseSection;
