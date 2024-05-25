import { Option } from "@/interface/utils.interface";
import { filterOption } from "@/utils/util";
import { Form, FormInstance, Input, Select } from "antd";

const ServiceRequestInput = ({
  index,
  form,
  loading,
  disabled,
  errorOption,
}: {
  index: number;
  form: FormInstance;
  loading?: boolean;
  disabled?: boolean;
  errorOption: Option[];
}) => {
  return (
    <Form form={form} layout="vertical">
      <div className="flex flex-row gap-x-4 w-full">
        <div className="w-1/3">
          <Form.Item
            label="ประเภทปัญหา"
            name={["errorLog", index, "errorTypeID"]}
            rules={[
              {
                required: true,
                message: "Please input error type!",
              },
            ]}
          >
            <Select
              showSearch
              className=" w-full mt-2 text-sm placeholder:text-sm"
              placeholder="ประเภทป้ญหา"
              disabled={loading || disabled}
              options={errorOption}
              filterOption={filterOption}
            />
          </Form.Item>
        </div>
        <div className="w-full">
          <Form.Item
            label="รายละเอียดปัญหา"
            name={["errorLog", index, "errorDescription"]}
            rules={[
              {
                required: true,
                message: "Please input your error description!",
              },
            ]}
          >
            <Input
              placeholder="รายละเอียดปัญหา"
              className=" w-full mt-2 text-sm h-8"
              disabled={loading || disabled}
            />
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default ServiceRequestInput;
