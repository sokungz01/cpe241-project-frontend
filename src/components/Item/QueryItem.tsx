import { SearchOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useState } from "react";

const QueryItem = ({
  setSearch,
}: {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [query, setQuery] = useState<string>("");

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
          <div className="flex items-end justify-end gap-x-4">
            <Button
              type="primary"
              htmlType="submit"
              className="bg-[#0174BE] text-sm h-10 w-20"
              onClick={() => {
                setSearch(query);
              }}
            >
              ค้นหา
            </Button>
            <Button
              className="text-black text-sm h-10 w-20"
              htmlType="reset"
              onClick={() => {
                setSearch("");
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

export default QueryItem;
