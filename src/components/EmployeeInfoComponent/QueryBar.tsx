import { ESALARY_RANGE, SALARAY_RANGE } from "@/enum/salary.enum";
import { IPosition } from "@/interface/position.interface";
import { Filter, Option } from "@/interface/utils.interface";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
// Filter `option.label` match the user type `input`
const filterOption = (
  input: string,
  option?: { label: string; value: string }
) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

const QueryBar = ({
  positionData,
  setFilter,
}: {
  positionData: IPosition[];
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
}) => {
  const initialFilter = {
    search: "",
    positionID: 0,
    range: 0,
  };
  const [queryFilter, setQueryFilter] = useState<Filter>(initialFilter);

  const salaryOptions: Option[] = [];

  salaryOptions.push({
    label: "Please select the bonus range",
    value: "0",
    disabled: true,
  });

  (
    Object.keys(ESALARY_RANGE).filter((v) =>
      isNaN(Number(v))
    ) as (keyof typeof ESALARY_RANGE)[]
  ).map((key) => {
    salaryOptions.push({
      label: SALARAY_RANGE[ESALARY_RANGE[key]].display,
      value: key,
    });
  });

  const [positionOptions, setPositionOptions] = useState<Option[]>([]);

  const onChangeFilter = (key: string, value: number | string) => {
    setQueryFilter({ ...queryFilter, [key]: value });
  };

  useEffect(() => {
    const mapOption: Option[] = [];
    mapOption.push({
      label: "Please select the position",
      value: "0",
      disabled: true,
    });
    positionData.forEach(async (item) => {
      mapOption.push({
        label: item.positionName,
        value: String(item.positionID),
      });
    });
    setPositionOptions(mapOption);
  }, [positionData]);
  return (
    <div className="w-full p-6">
      <Form>
        <div className="flex flex-row justify-center lg:justify-evenly flex-wrap">
          <div className="flex-1 mr-6">
            <p className=" text-black placeholder-opacity-90 text-sm h-6">
              ค้นหา
            </p>
            <Input
              placeholder="ค้นหาด้วยรหัสพนักงาน, ชื่อ, นามสกุล"
              suffix={<SearchOutlined className=" opacity-25 h-auto" />}
              onChange={(event) => {
                onChangeFilter("search", event.target.value);
              }}
              value={queryFilter.search}
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
                onChangeFilter("positionID", Number(value));
              }}
              defaultValue={null}
              value={positionOptions.filter(
                (item) => item.value === queryFilter.positionID.toString()
              )}
              filterOption={filterOption}
              options={positionOptions}
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
              onChange={(option: keyof typeof ESALARY_RANGE) => {
                const salaryRange = SALARAY_RANGE[ESALARY_RANGE[option]].value;
                onChangeFilter("range", salaryRange);
              }}
              defaultValue={null}
              value={
                salaryOptions[queryFilter.range]
                  .value as keyof typeof ESALARY_RANGE
              }
              filterOption={filterOption}
              options={salaryOptions}
            />
          </div>
          <div className="flex items-end justify-end gap-x-4">
            <Button
              type="primary"
              htmlType="submit"
              className="bg-[#0174BE] text-sm h-10 w-20"
              onClick={() => {
                setFilter(queryFilter);
              }}
            >
              ค้นหา
            </Button>
            <Button
              className="text-black text-sm h-10 w-20"
              htmlType="reset"
              onClick={() => {
                setFilter(initialFilter);
                setQueryFilter(initialFilter);
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

export default QueryBar;
