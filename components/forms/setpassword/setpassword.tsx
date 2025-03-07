"use client";
import Button from "@/components/ui/Button";
import { useSetupPasswordMutation } from "@/redux/apis";
import { ISetupPassword } from "@/types";
import { ZodValidator } from "@/utils";
import { passwordSchema } from "@/validations";
import { Form, Input } from "antd";
import { Typography } from "antd";
import { useRouter } from "next/navigation";

export default function SetUpPasswordForm() {
  const [setUpPassword, { isLoading }] = useSetupPasswordMutation();
  const router = useRouter();

  const onFinish = async (values: ISetupPassword) => {
    await setUpPassword({ password: values?.password, router });
  };

  return (
    <section>
      <Typography.Title level={4} className="!text-center">
        Set Up your account password
      </Typography.Title>
      <Typography.Title
        level={5}
        className="!text-center !text-caption !mb-spacing-m"
      >
        Enter new password and confirm password below
      </Typography.Title>
      <Form
        name="setuppassword"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        className="!my-spacing-l"
        layout="vertical"
      >
        <Form.Item
          label="PASSWORD"
          name="password"
          className="!text-black !font-bold"
          rules={[
            ZodValidator({
              schema: passwordSchema.pick({ password: true }),
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
          Submit
        </Button>
      </Form>
    </section>
  );
}
