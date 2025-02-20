"use client";
import Button from "@/components/ui/Button";
import { Ilogin } from "@/types";
import { Form, Input } from "antd";
import { Typography } from "antd";
import Link from "next/link";

export default function EmployeePrfileForm() {
  const onFinish = (values: Ilogin) => {
    console.log("Received values of form: ", values);
  };

  return (
    <section className="pb-spacing-l px-spacing-l">
      <Typography.Title level={4} className="!text-center">
        Log In to Admin Panel
      </Typography.Title>
      <Typography.Title
        level={5}
        className="!text-center !text-caption !mb-spacing-m"
      >
        Enter your phone number and password below
      </Typography.Title>
      <Form
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        className="!my-spacing-l"
        layout="vertical"
      >
        <Form.Item
          label="PHONE NUMBER"
          name="phone"
          className="!text-black !font-bold"
        >
          <Input
            placeholder="Enter your phone number"
            className="!h-[40px] !border-2 !border-gray-500"
          />
        </Form.Item>

        <Form.Item
          label="PASSWORD"
          name="password"
          className="!text-black !font-bold"
        >
          <Input
            type="password"
            placeholder="Enter your password"
            className="!h-[40px] !border-2 !border-gray-500"
          />
        </Form.Item>
        <Form.Item
          label="PASSWORD"
          name="password"
          className="!text-black !font-bold"
        >
          <Input
            type="password"
            placeholder="Enter your password"
            className="!h-[40px] !border-2 !border-gray-500"
          />
        </Form.Item>
        <Form.Item
          label="PASSWORD"
          name="password"
          className="!text-black !font-bold"
        >
          <Input
            type="password"
            placeholder="Enter your password"
            className="!h-[40px] !border-2 !border-gray-500"
          />
        </Form.Item>
        <Form.Item
          label="PASSWORD"
          name="password"
          className="!text-black !font-bold"
        >
          <Input
            type="password"
            placeholder="Enter your password"
            className="!h-[40px] !border-2 !border-gray-500"
          />
        </Form.Item>
        <Form.Item
          label="PASSWORD"
          name="password"
          className="!text-black !font-bold"
        >
          <Input
            type="password"
            placeholder="Enter your password"
            className="!h-[40px] !border-2 !border-gray-500"
          />
        </Form.Item>
        <Form.Item
          label="PASSWORD"
          name="password"
          className="!text-black !font-bold"
        >
          <Input
            type="password"
            placeholder="Enter your password"
            className="!h-[40px] !border-2 !border-gray-500"
          />
        </Form.Item>
        <Form.Item
          label="PASSWORD"
          name="password"
          className="!text-black !font-bold"
        >
          <Input
            type="password"
            placeholder="Enter your password"
            className="!h-[40px] !border-2 !border-gray-500"
          />
        </Form.Item>
        <Form.Item
          label="PASSWORD"
          name="password"
          className="!text-black !font-bold"
        >
          <Input
            type="password"
            placeholder="Enter your password"
            className="!h-[40px] !border-2 !border-gray-500"
          />
        </Form.Item>

        <Button htmlType="submit" className="!w-full">
          Sign Up
        </Button>
      </Form>
      <Typography.Title level={5} className="!text-caption !text-center">
        Don&apos;t have an account? <Link href={"/signup"}>Sign Up</Link>
      </Typography.Title>
    </section>
  );
}
