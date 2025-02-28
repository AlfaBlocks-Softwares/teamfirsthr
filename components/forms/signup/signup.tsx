"use client";
import Button from "@/components/ui/Button";
import { ROLEOptions } from "@/constants";
import { ISignUp } from "@/types";
import { ZodValidator } from "@/utils";
import { JSONTOPDFDownloader } from "@/utils/JSONToPDF";
import { signUpFormSchema } from "@/validations";
import { Form, Input, Select } from "antd";
import { Typography } from "antd";

const Users = [
  { id: 1, name: "John Doe", email: "john.doe@example.com" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
  { id: 3, name: "Michael Johnson", email: "michael.johnson@example.com" },
  { id: 4, name: "Emily Brown", email: "emily.brown@example.com" },
  { id: 5, name: "Robert Williams", email: "robert.williams@example.com" },
  { id: 6, name: "Sarah Miller", email: "sarah.miller@example.com" },
  { id: 7, name: "David Garcia", email: "david.garcia@example.com" },
  { id: 8, name: "Lisa Rodriguez", email: "lisa.rodriguez@example.com" },
  { id: 9, name: "Thomas Wilson", email: "thomas.wilson@example.com" },
  { id: 10, name: "Jennifer Martinez", email: "jennifer.martinez@example.com" },
  { id: 11, name: "Daniel Anderson", email: "daniel.anderson@example.com" },
  { id: 12, name: "Patricia Taylor", email: "patricia.taylor@example.com" },
  { id: 13, name: "Andrew Thomas", email: "andrew.thomas@example.com" },
  { id: 14, name: "Elizabeth Jackson", email: "elizabeth.jackson@example.com" },
  { id: 15, name: "James White", email: "james.white@example.com" },
  { id: 16, name: "Nancy Harris", email: "nancy.harris@example.com" },
  { id: 17, name: "Christopher Lewis", email: "christopher.lewis@example.com" },
  { id: 18, name: "Karen Robinson", email: "karen.robinson@example.com" },
  { id: 19, name: "Steven Walker", email: "steven.walker@example.com" },
  { id: 20, name: "Margaret Young", email: "margaret.young@example.com" },
];

export default function SignUpForm() {
  const onFinish = (values: ISignUp) => {
    console.log("Received values of form: ", values);
  };

  const handleExport = () => {
    JSONTOPDFDownloader(Users, { filename: "Users.pdf" });
  };

  return (
    <div className="!w-full !h-full">
      <Button onClick={handleExport}>Download PDF File</Button>
      <Typography.Title level={4}>Create New User</Typography.Title>
      <Form
        name="signup"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        className="!w-full !h-full !p-spacing-l"
        layout="vertical"
      >
        <div className="w-full !grid !grid-cols-2 justify-start items-start gap-spacing-m">
          <Form.Item
            label="USER ROLE"
            name="role"
            className=" !font-bold sm:col-span-2"
            rules={[{ required: true, message: "Please select leave type" }]}
          >
            <Select
              placeholder="Select role"
              options={ROLEOptions}
              className="!h-[40px]"
            />
          </Form.Item>

          <Form.Item
            name="name"
            label="FULL NAME"
            className=" !font-bold !h-max !w-full"
            rules={[
              ZodValidator({
                schema: signUpFormSchema.pick({ name: true }),
                fieldName: "name",
              }),
            ]}
          >
            <Input placeholder="Enter your name" className="!h-[40px] " />
          </Form.Item>

          <Form.Item
            name="email"
            label="EMAIL"
            className=" !font-bold !h-max !w-full"
            rules={[
              ZodValidator({
                schema: signUpFormSchema.pick({ email: true }),
                fieldName: "email",
              }),
            ]}
          >
            <Input placeholder="Enter your email" className="!h-[40px] " />
          </Form.Item>

          <Form.Item
            label="PHONE NUMBER"
            name="phone"
            className=" !font-bold !h-max !w-full"
            rules={[
              ZodValidator({
                schema: signUpFormSchema.pick({ phone: true }),
                fieldName: "phone",
              }),
            ]}
          >
            <Input
              placeholder="Enter your phone number"
              className="!h-[40px] "
            />
          </Form.Item>

          <Form.Item
            label="PASSWORD"
            name="password"
            className=" !font-bold !h-max !w-full"
            rules={[
              ZodValidator({
                schema: signUpFormSchema.pick({ password: true }),
                fieldName: "password",
              }),
            ]}
          >
            <Input
              type="password"
              placeholder="Enter your password"
              className="!h-[40px] "
            />
          </Form.Item>
        </div>
        <Button htmlType="submit" className="!w-max mt-spacing-s !px-spacing-l">
          Create
        </Button>
      </Form>
    </div>
  );
}
