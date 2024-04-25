import { Form, Input } from "antd";
import { IoLockClosedOutline } from "react-icons/io5";
import { LuUser2 } from "react-icons/lu";

const LoginForm = () => {
  const [form] = Form.useForm();
  return (
    <div className="w-full">
      <Form
        form={form}
        name="login"
        // onFinish={onFinish}
        scrollToFirstError
      >
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
            size="large"
            prefix={<LuUser2 className="text-primary" />}
            placeholder="Email"
            
          />
        </Form.Item>
        <Form.Item
          name="passowrd"
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
            className="bg-normal text-white px-6 py-2 rounded-sm text-lg"
          >
            Sign in
          </button>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
