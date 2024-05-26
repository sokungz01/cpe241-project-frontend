import { Login } from "@/api/authen.api";
import { axiosInstance } from "@/api/axiosInstance";
import { AuthContext } from "@/context/auth.context";
import { SwalError, SwalSuccess } from "@/utils/swal";
import { Form, Input } from "antd";
import { useContext, useEffect, useState } from "react";
import { IoLockClosedOutline } from "react-icons/io5";
import { LuUser2 } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [form] = Form.useForm();
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const token: string | null = localStorage.getItem("accessToken") || null;

  useEffect(() => {
    if (token !== null && token !== "") {
      if (
        auth?.authContext.positionID === 1 ||
        auth?.authContext.positionID === 2
      ) {
        navigate("/tools/report");
      } else {
        navigate("/tools/employee");
      }
    }
  });

  const onFinish = async () => {
    try {
      setIsLoading(true);
      const values = await form.validateFields();
      const response = await Login(values.email, values.password);
      if (response.status !== 200) {
        throw new Error("Failed to login");
      }
      const token: string = response.data.token;
      localStorage.setItem("accessToken", token);
      axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
      SwalSuccess("เข้าสู่ระบบสำเร็จ", "กำลังเปลี่ยนเส้นทาง");
      setIsLoading(false);
    } catch (err) {
      SwalError("เข้าสู่ระบบไม่สำเร็จ", "กรุณาลองใหม่ภายหลัง");
      setIsLoading(false);
      throw new Error("Failed : cannot login." + err);
    }
  };

  return (
    <div className="w-full">
      <Form form={form} name="login" onFinish={onFinish} scrollToFirstError>
        <Form.Item
          name="email"
          hasFeedback
          rules={[
            {
              type: "email",
              message: "The input is not valid e-mail!",
            },
            {
              required: true,
              message: "Please input your e-mail!",
            },
          ]}
        >
          <Input
            name="email"
            size="large"
            prefix={<LuUser2 className="text-primary" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            {
              min: 8,
              message: "Password must be minimun 8 characters",
            },
          ]}
        >
          <Input.Password
            size="large"
            prefix={<IoLockClosedOutline className="text-primary" />}
            placeholder="Password"
          />
        </Form.Item>

        <div className="flex flex-row justify-center">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-normal text-white px-6 py-2 rounded-sm text-lg disabled:bg-normal/60"
          >
            Sign in
          </button>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
