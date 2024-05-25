import { IServiceResponse } from "@/interface/serviceresponse.interface";
import { convertDateToString } from "@/utils/util";

const ResponseCard = ({
  index,
  data,
}: {
  index: number;
  data: IServiceResponse;
}) => {
  return (
    <>
      <h5 className="font-medium">
        รายงานครั้งที่ #{index} |{" "}
        <span className="font-light">{data.title}</span>
      </h5>
      <h6>รายละเอียดการรายงาน : </h6>
      <div className="w-full border rounded-lg px-2 py-3">
        <p className="text-md font-light">{data.description}</p>
      </div>
      <p className="text-sm mt-2">
        รายงานโดย :{" "}
        {data.user.name.toLocaleUpperCase() +
          " " +
          data.user.surname.toLocaleUpperCase()}{" "}
        เมื่อวันที่ : {convertDateToString(new Date(data.createdDate))}
      </p>
      <hr className="w-full my-4" />
    </>
  );
};

export default ResponseCard;
