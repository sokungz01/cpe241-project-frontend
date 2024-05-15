import { Input, Select, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const onChange = (value: string) => {
  console.log(`selected ${value}`);
};

const onSearch = (value: string) => {
  console.log("search:", value);
};

// Filter `option.label` match the user type `input`
const filterOption = (
  input: string,
  option?: { label: string; value: string }
) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

const QueryBar = () => {
  return (
    <>
      <div className="w-full p-6 flex flex-row justify-center lg:justify-evenly flex-wrap">
        <div className="flex-1 mr-6">
          <p className=" text-black placeholder-opacity-90 text-sm h-6">
            ค้นหา
          </p>
          <Input
            placeholder="ค้นหาด้วยรหัสพนักงาน, ชื่อ, นามสกุล"
            suffix={<SearchOutlined className=" opacity-25 h-auto" />}
            className=" flex h-10"
          />
        </div>
        <div className="flex-1 mr-6">
          <p className=" text-black placeholder-opacity-90 text-sm h-6">
            ตำแหน่ง
          </p>
          <Select
            showSearch
            placeholder="Please select"
            className=" flex h-10 text-sm"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
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
        <div className="flex-1 mr-6">
          <p className=" text-black placeholder-opacity-90 text-sm h-6">
            เงินพิเศษ
          </p>
          <Select
            showSearch
            placeholder="Please select"
            className=" flex h-10 text-sm"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={filterOption}
            options={[
              {
                value: "500-1000",
                label: "500-1000",
              },
              {
                value: "1000-10000",
                label: "1000-10000",
              },
              {
                value: "10000-20000",
                label: "10000-20000",
              },
            ]}
          />
        </div>
        <div className="flex items-end justify-end">
          <Button type="primary" className="bg-[#0174BE] text-sm h-10 w-20">
            ค้นหา
          </Button>
        </div>
      </div>
    </>
  );
};

export default QueryBar;
