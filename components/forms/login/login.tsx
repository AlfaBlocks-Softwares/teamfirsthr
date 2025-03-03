"use client";
import Button from "@/components/ui/Button";
import { useLoginMutation } from "@/redux/apis";
import { Ilogin } from "@/types";
import { ZodValidator } from "@/utils";
import { loginFormSchema } from "@/validations";
import { Form, Input } from "antd";
import { Typography } from "antd";

export default function LoginForm() {
  const [login, { isLoading }] = useLoginMutation();

  console.log(isLoading);

  const onFinish = async (values: Ilogin) => {
    await login({ email: values?.email, password: values?.password });
  };

  return (
    <section>
      <Typography.Title level={4} className="!text-center">
        Log In to Admin Panel
      </Typography.Title>
      <Typography.Title
        level={5}
        className="!text-center !text-caption !mb-spacing-m"
      >
        Enter your email and password below
      </Typography.Title>
      <Form
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        className="!my-spacing-l"
        layout="vertical"
      >
        <Form.Item
          label="EMAIL"
          name="email"
          className="!text-black !font-bold"
          rules={[
            ZodValidator({
              schema: loginFormSchema.pick({ email: true }),
              fieldName: "email",
            }),
          ]}
        >
          <Input
            placeholder="Enter your email"
            className="!h-[40px] !border-2 !border-gray-500"
          />
        </Form.Item>

        <Form.Item
          label="PASSWORD"
          name="password"
          className="!text-black !font-bold"
          rules={[
            ZodValidator({
              schema: loginFormSchema.pick({ password: true }),
              fieldName: "password",
            }),
          ]}
        >
          <Input
            type="password"
            placeholder="Enter your password"
            className="!h-[40px] !border-2 !border-gray-500"
          />
        </Form.Item>
        <Button
          htmlType="submit"
          className="!w-full mt-spacing-s"
          loading={isLoading}
        >
          Sign In
        </Button>
      </Form>
    </section>
  );
}
