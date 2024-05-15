import BreadcrumbComponent from "@/components/BreadcrumbComponent/BreadcrumbComponent";
import { PictureOutlined } from "@ant-design/icons";
import { Input, Select } from "antd";

const filterOption = (
  input: string,
  option?: { label: string; value: string },
) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

const AddEmployee = () => {
  return (
    <div className="w-full h-full bg-[#f0f2f5]">
      <div className="flex flex-col">
        <BreadcrumbComponent />
      </div>
      <div className="flex flex-col lg:flex-row px-6 gap-4 mt-6">
        <div className=" w-full lg:w-1/3 bg-white rounded-md">
          <div className="flex flex-col mx-6 mt-6 mb-4">
            <p className="text-sm font-medium">รูปภาพ</p>
          </div>
          <div className="flex flex-col content-center justify-center text-center border-gray-300 border mx-6 py-10">
            <PictureOutlined className=" opacity-30 text-4xl items-center justify-center mt-6 mb-8" />
            <p className="items-center align-middle justify-center text-sm">
              Click or drag file to this area to upload
            </p>
            <p className=" text-[10px] opacity-40 mt-1 leading-3">
              Support for a single or bulk upload. Strictly prohibit <br /> from
              uploading company data or other band files
            </p>
          </div>
          <div className="flex text-center w-full justify-center text-sm opacity-40 my-4">
            <p>Recommended resolution is 640*640 with file size 2 MB</p>
          </div>
        </div>

        <div className=" bg-white w-full lg:w-2/3 rounded-md px-6">
          <div className="mt-6">
            <p className=" text-sm font-medium">ข้อมูลส่วนตัว</p>
          </div>

          <div className="flex flex-col gap-y-4 mt-4">
            <div className=" flex flex-col gap-x-4 lg:flex-row">
              <div className=" flex flex-col w-full lg:w-1/2">
                <p className=" text-sm font-normal">ชื่อ</p>
                <Input
                  className=" w-full mt-2 text-sm h-8"
                  placeholder="ชื่อ"
                />
              </div>
              <div className=" flex flex-col w-full lg:w-1/2">
                <p className=" text-sm font-normal">นามสกุล</p>
                <Input
                  className=" w-full mt-2 text-sm h-8"
                  placeholder="นามสกุล"
                />
              </div>
            </div>

            <div className=" flex flex-row gap-x-4 ">
              <div className=" flex flex-col w-full lg:w-1/2">
                <p className=" text-sm font-normal">ตำแหน่ง</p>
                <Select
                  showSearch
                  className=" w-full mt-2 text-sm placeholder:text-sm"
                  placeholder="ตำแหน่ง"
                  filterOption={filterOption}
                  options={[
                    {
                      value: "employee",
                      label: "พนักงานทั่วไป",
                    },
                    {
                      value: "technician",
                      label: "ช่าง",
                    },
                    {
                      value: "admin",
                      label: "แอดมิน",
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
