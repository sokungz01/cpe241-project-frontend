import { IMachineType } from "@/interface/machinetype.interface";
import { Option } from "@/interface/utils.interface";
import { filterOption } from "@/utils/util";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";

const QueryMachine = ({
  setSearch,
  machineType,
  setMachineType,
}: {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  machineType: IMachineType[];
  setMachineType: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [query, setQuery] = useState<string>("");
  const [machineTypeOption, setMachineTypeOption] = useState<Option[]>([]);
  const [select, setSelect] = useState<number>(0);

  useEffect(() => {
    const mapOption: Option[] = [];
    mapOption.push({
      label: "Please select the machine type",
      value: "0",
      disabled: true,
    });
    machineType.forEach(async (item) => {
      mapOption.push({
        label: item.machinetypeName,
        value: String(item.machinetypeID),
      });
    });
    setMachineTypeOption(mapOption);
  }, [machineType]);

  return (
    <div className="w-full p-6">
      <Form>
        <div className="flex flex-row justify-center lg:justify-evenly flex-wrap">
          <div className="flex-1 mr-6">
            <p className=" text-black placeholder-opacity-90 text-sm h-6">
              ค้นหา
            </p>
            <Input
              placeholder="ค้นหาด้วยชื่ออุปกรณ์ / รหัสอุปกรณ์"
              suffix={<SearchOutlined className=" opacity-25 h-auto" />}
              onChange={(event) => {
                setQuery(event.target.value);
              }}
              value={query}
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
              onChange={(value) => {
                setSelect(Number(value));
              }}
              defaultValue={null}
              value={machineTypeOption.filter(
                (item) => item.value === select.toString(),
              )}
              filterOption={filterOption}
              options={machineTypeOption}
            />
          </div>
          <div className="flex items-end justify-end gap-x-4">
            <Button
              type="primary"
              htmlType="submit"
              className="bg-[#0174BE] text-sm h-10 w-20"
              onClick={() => {
                setSearch(query);
                setMachineType(select);
              }}
            >
              ค้นหา
            </Button>
            <Button
              className="text-black text-sm h-10 w-20"
              htmlType="reset"
              onClick={() => {
                setSearch("");
                setMachineType(0);
                setQuery("");
              }}
            >
              Clear
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default QueryMachine;
