import {
  CreateEmployee,
  DeleteEmployee,
  GetEmployeeByID,
  UpdateEmployeeByID,
} from "@/api/employee.api";
import { GetAllPosition } from "@/api/position.api";
import BreadcrumbComponent from "@/components/BreadcrumbComponent/BreadcrumbComponent";
import { UploadImage } from "@/config/supabase";
import { IEmployee } from "@/interface/employee.interface";
import { IPosition } from "@/interface/position.interface";
import { IBreadcrumb } from "@/interface/utils.interface";
import { validateUpload } from "@/utils/imageUpload";
import { SwalError, SwalSuccess } from "@/utils/swal";
import { filterOption } from "@/utils/util";
import { PictureOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Select, Spin, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { useCallback, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

interface Option {
  label: string;
  value: string;
}

interface IEmployeeADD extends IEmployee {
  repassword: string;
}

const AddEmployee = ({ isEdit }: { isEdit?: boolean }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [positionOption, setPositionOption] = useState<Option[]>([]);
  const [previewImageURL, setPreviewImageURL] = useState<string>("");
  const [previewImageObj, setPreviewImageObj] = useState<File>();
  const [loading, setLoading] = useState<boolean>(false);
  const BreadCrumbLinks: IBreadcrumb[] = [
    {
      title: "ข้อมูลพนักงาน",
      href: "./",
    },
    {
      title: "เพิ่มพนักงาน",
    },
  ];
  const EditBreadCrumbLinks: IBreadcrumb[] = [
    {
      title: "ข้อมูลพนักงาน",
      href: "../",
    },
    {
      title: "แก้ไขข้อมูลพนักงาน",
    },
  ];
  const { id } = useParams();

  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      const result = await DeleteEmployee(id);
      if (result.status !== 200)
        throw new Error("Error! Delte the data not success.");
      setLoading(false);
      SwalSuccess("สำเร็จ!", "ลบพนักงานสำเร็จ").then(() => {
        navigate("../");
      });
    } catch (err) {
      setLoading(false);
    }
  };

  const fetchPositionData = async () => {
    try {
      const result = await GetAllPosition();
      if (result.status !== 200) {
        throw new Error("Error! Cannot fetching data");
      }
      const mapOption: Option[] = [];
      const data: IPosition[] = result.data;
      data.forEach(async (item) => {
        mapOption.push({
          label: item.positionName,
          value: String(item.positionID),
        });
      });

      setPositionOption(mapOption);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchEmployeeData = useCallback(
    async (userID: number) => {
      setLoading(true);
      try {
        if (!userID || userID === 0) throw new Error("Error! Invalid userID");
        const result = await GetEmployeeByID(userID);
        const employeeData: IEmployee = result.data;
        setPreviewImageURL(employeeData.imageURL);
        form.setFieldsValue(employeeData);
        form.setFieldValue("positionID", employeeData.positionID.toString());
        setLoading(false);
      } catch (err) {
        setLoading(false);
        throw new Error("Error! Fetching data failed.");
      }
    },
    [form, setLoading],
  );

  useMemo(async () => {
    await fetchPositionData();
  }, []);

  useMemo(async () => {
    await fetchEmployeeData(Number(id));
  }, [id, fetchEmployeeData]);

  const beforeUpload = async (file: File) => {
    const validate = await validateUpload(file);
    if (validate) {
      setPreviewImageURL(URL.createObjectURL(file));
      setPreviewImageObj(file);
      return false;
    }
  };

  const onFinish = async (values: IEmployeeADD) => {
    setLoading(true);
    try {
      if (!values.repassword.match(values.password)) {
        SwalError("ผิดพลาด!", "รหัสผ่านไม่ตรงกัน!");
        throw new Error("Password not match");
      }

      if (!previewImageObj) {
        SwalError("ผิดพลาด!", "กรุณาอัพโหลดรูปภาพ");
        throw new Error("Error! Upload avatar image.");
      }

      const imageURL = await UploadImage(previewImageObj);
      values.imageURL = imageURL;
      values.positionID = Number(values.positionID);
      const result = await CreateEmployee(values);

      if (result.status !== 200) {
        SwalError("ผิดพลาด!", "ไม่สามารถเพิ่มผู้ใช้ใหม่ได้");
        throw new Error("Error! Can't create new user");
      }

      SwalSuccess("สำเร็จ", "เพิ่มผู้ใช้สำเร็จ").then(() => {
        navigate("../");
      });

      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const onFinishEdit = async (values: IEmployee) => {
    setLoading(true);
    try {
      if (!id || Number(id) === 0) throw new Error("Error! userID is invalid.");

      if (previewImageObj) {
        const imageURL = await UploadImage(previewImageObj);
        values.imageURL = imageURL;
      }

      values.positionID = Number(values.positionID);
      values.password = "";

      const result = await UpdateEmployeeByID(Number(id), values);
      if (result.status !== 200) {
        SwalError("ผิดพลาด!", "ไม่สามารถผู้ใชงานได้ได้");
        throw new Error("Error! Can't update user data");
      }

      SwalSuccess("สำเร็จ", "แก้ไขข้อมูลผู้ใช้สำเร็จ").then(() => {
        navigate("../");
      });

      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <div className="w-full h-full bg-[#f0f2f5]">
      <div className="flex flex-col">
        {isEdit ? (
          <BreadcrumbComponent
            links={EditBreadCrumbLinks}
            title={`แก้ไขข้อมูลพนักงาน | รหัสพนักงาน ${id && id.toString().padStart(6, "0")}`}
          />
        ) : (
          <BreadcrumbComponent links={BreadCrumbLinks} title="เพิ่มพนักงาน" />
        )}
      </div>
      <Form
        form={form}
        layout="vertical"
        onFinish={isEdit ? onFinishEdit : onFinish}
      >
        <div className="flex flex-col lg:flex-row px-6 gap-4 mt-6">
          <div className=" w-full h-fit lg:w-1/3 bg-white rounded-md">
            <div className="flex flex-col mx-6 mt-6 mb-4">
              <p className="text-sm font-medium">รูปภาพ</p>
            </div>
            <div className="w-full flex flex-col items-center">
              <Form.Item name="imageURL">
                <ImgCrop aspect={640 / 640}>
                  <Upload
                    name="avatarImage"
                    accept="image/png, image/jpeg, image/jpg"
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                    maxCount={1}
                  >
                    {previewImageURL !== "" ? (
                      <img
                        src={previewImageURL}
                        className="aspect-square"
                        width={640}
                        height={640}
                      />
                    ) : (
                      <>
                        <div className="flex flex-col content-center justify-center text-center border-gray-300 border mx-6 py-10">
                          <PictureOutlined className=" opacity-30 text-4xl items-center justify-center mt-6 mb-8" />
                          <p className="items-center align-middle justify-center text-sm">
                            Click or drag file to this area to upload
                          </p>
                          <p className=" text-[10px] opacity-40 mt-1 leading-3">
                            Support for a single or bulk upload. Strictly
                            prohibit <br /> from uploading company data or other
                            band files
                          </p>
                        </div>
                        <div className="flex text-center w-full justify-center text-sm opacity-40 my-4">
                          <p>
                            Recommended resolution is 640*640 with file size 2
                            MB
                          </p>
                        </div>
                      </>
                    )}
                  </Upload>
                </ImgCrop>
              </Form.Item>
              {previewImageURL !== "" && (
                <Button
                  onClick={() => {
                    setPreviewImageObj(undefined);
                    setPreviewImageURL("");
                  }}
                  danger
                  className="my-4"
                >
                  ลบรูปภาพ
                </Button>
              )}
            </div>
          </div>

          <div className=" bg-white w-full h-fit lg:w-2/3 rounded-md px-6">
            <div className="mt-6">
              <p className=" text-md font-medium">ข้อมูลส่วนตัว</p>
            </div>

            <div className="flex flex-col gap-y-4 mt-4">
              <div className=" flex flex-col gap-x-4 lg:flex-row">
                <div className=" flex flex-col w-full lg:w-1/2">
                  <Form.Item
                    label="ชื่อ"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Please input your name!",
                      },
                    ]}
                  >
                    <Input
                      className=" w-full mt-2 text-sm h-8"
                      placeholder="ชื่อ"
                      disabled={loading}
                    />
                  </Form.Item>
                </div>
                <div className=" flex flex-col w-full lg:w-1/2">
                  <Form.Item
                    label="นามสกุล"
                    name="surname"
                    rules={[
                      {
                        required: true,
                        message: "Please input your surname!",
                      },
                    ]}
                  >
                    <Input
                      className=" w-full mt-2 text-sm h-8"
                      placeholder="นามสกุล"
                      disabled={loading}
                    />
                  </Form.Item>
                </div>
              </div>

              <div className=" flex flex-col gap-x-4 lg:flex-row">
                <div className=" flex flex-col w-full lg:w-1/2">
                  <Form.Item
                    label="ตำแหน่ง"
                    name="positionID"
                    rules={[
                      {
                        required: true,
                        message: "Please input your position!",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      className=" w-full mt-2 text-sm placeholder:text-sm"
                      placeholder="ตำแหน่ง"
                      disabled={loading}
                      options={positionOption}
                      filterOption={filterOption}
                    />
                  </Form.Item>
                </div>
                <div className=" flex flex-col w-full lg:w-1/2">
                  <Form.Item
                    label="โบนัส"
                    name="bonus"
                    rules={[
                      { type: "number", message: "Please input valid number" },
                      {
                        required: true,
                        message: "Please input your bonus!",
                      },
                    ]}
                  >
                    <InputNumber
                      controls={false}
                      step={0}
                      min={0}
                      className=" w-full mt-2 text-sm h-8"
                      placeholder="โบนัส"
                      disabled={loading}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className=" flex flex-col gap-x-4 lg:flex-row">
                <div className=" flex flex-col w-full lg:w-1/2">
                  <Form.Item
                    label="อีเมล"
                    name="email"
                    rules={[
                      {
                        type: "email",
                        message: "Please input the valid email!",
                      },
                      {
                        required: true,
                        message: "Please input your email!",
                      },
                    ]}
                  >
                    <Input
                      className=" w-full mt-2 text-sm h-8"
                      placeholder="อีเมล"
                      disabled={loading}
                    />
                  </Form.Item>
                </div>
              </div>
              {!isEdit && (
                <div className="my-4">
                  <p className="font-medium text-md ">ตั้งรหัสผ่าน</p>
                  <div className=" flex flex-col gap-x-4 lg:flex-row mt-2">
                    <div className=" flex flex-col w-full lg:w-1/2">
                      <Form.Item
                        label="รหัสผ่าน"
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "Please input your password!",
                          },
                        ]}
                      >
                        <Input.Password
                          className=" w-full mt-2 text-sm h-8"
                          placeholder="รหัสผ่าน"
                          disabled={loading}
                        />
                      </Form.Item>
                    </div>
                    <div className=" flex flex-col w-full lg:w-1/2">
                      <Form.Item
                        label="รหัสผ่าน (อีกครั้ง)"
                        name="repassword"
                        rules={[
                          {
                            required: true,
                            message: "Please input your re-password!",
                          },
                        ]}
                      >
                        <Input.Password
                          className=" w-full mt-2 text-sm h-8"
                          placeholder="รหัสผ่าน"
                          disabled={loading}
                        />
                      </Form.Item>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex flex-row justify-between items-center">
                {isEdit && (
                  <Button
                    htmlType="button"
                    className="px-6"
                    size="middle"
                    disabled={loading}
                    onClick={async () => {
                      await handleDelete(Number(id));
                    }}
                    danger
                  >
                    ลบบัญชี
                  </Button>
                )}
                <div className="flex justify-end w-full my-4">
                  <Link to="../">
                    <Button
                      htmlType="button"
                      className="px-6 mx-2"
                      size="middle"
                      disabled={loading}
                    >
                      ยกเลิก
                    </Button>
                  </Link>
                  <Button
                    htmlType="submit"
                    className="px-6 bg-primary text-white"
                    size="middle"
                    disabled={loading}
                  >
                    {loading ? <Spin /> : "ตกลง"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AddEmployee;
