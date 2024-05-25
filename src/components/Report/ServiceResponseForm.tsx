import { ISerivceRequest } from "@/interface/servicerequest.interface";
import { Button, Form, FormInstance, Input, Spin } from "antd";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";

const ServiceResponseForm = ({
  form,
  loading,
  onFinish,
  disabled,
}: {
  form: FormInstance;
  loading: boolean;
  onFinish?: (values: ISerivceRequest) => Promise<void>;
  disabled?: boolean;
}) => {
  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <div className="flex flex-col lg:flex-row px-6 gap-4 mt-6">
        <div className=" bg-white w-full  rounded-md px-6">
          <div className="mt-6">
            <p className=" text-md font-medium">รายงานผลการแจ้งซ่อม</p>
          </div>

          <div className="flex w-full flex-col gap-y-4 mt-4">
            <section className="mt-8">
              <h4 className="font-semibold text-md"> รายงาน </h4>
              <hr className="my-4" />
              <Form.List name="errorLog">
                {(items, itemOptions) => (
                  <div>
                    {items.map((item) => (
                      <div className="w-full my-4 flex flex-row gap-x-4 items-end">
                        <div className="w-1/3">
                          <Form.Item
                            label="หัวข้อ"
                            name={[item.name, "title"]}
                            rules={[
                              {
                                required: true,
                                message: "Please input title!",
                              },
                            ]}
                          >
                            <Input
                              placeholder="หัวข้อ"
                              className=" w-full mt-2 text-sm h-8"
                              disabled={loading || disabled}
                            />
                          </Form.Item>
                        </div>
                        <div className="w-full">
                          <Form.Item
                            label="รายละเอียดปัญหา"
                            name={[item.name, "Description"]}
                            rules={[
                              {
                                required: true,
                                message: "Please input your description!",
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
                        {items.length > 1 && !disabled && (
                          <RxCross2
                            className="size-8"
                            onClick={() => {
                              itemOptions.remove(item.name);
                            }}
                          />
                        )}
                      </div>
                    ))}
                    {!disabled && (
                      <Button
                        type="dashed"
                        onClick={() => itemOptions.add({})}
                        block
                      >
                        + เพิ่มการรายงาน
                      </Button>
                    )}
                  </div>
                )}
              </Form.List>
            </section>
          </div>
          <div className="w-full flex flex-row justify-between items-center">
            <div className="flex justify-end w-full my-4">
              <Link to="../">
                <Button
                  htmlType="button"
                  className="px-6 mx-2"
                  size="middle"
                  disabled={loading || disabled}
                >
                  {loading ? <Spin /> : "ยกเลิก"}
                </Button>
              </Link>
              <Button
                htmlType="submit"
                className="px-6 bg-primary text-white"
                size="middle"
                disabled={loading || disabled}
              >
                {loading ? <Spin /> : "ตกลง"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default ServiceResponseForm;
