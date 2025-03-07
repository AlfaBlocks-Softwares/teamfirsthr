"use client";
import Button from "../ui/Button";
import { Form, Input } from "antd";
import { Typography } from "antd";
import { IEmployeeProfile } from "@/types";
import { useGetUserDetailsQuery } from "@/redux/apis";

export default function EmployeeProfile() {
  const { data: user, isLoading, error } = useGetUserDetailsQuery();

  console.log(user, isLoading, error);

  const onFinish = (values: IEmployeeProfile) => {
    console.log("Received values of form: ", values);
  };

  return (
    <section className="!w-full !h-full">
      <Form
        name="profile"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        className="!my-spacing-l !grid !grid-cols-2 gap-spacing-l"
        layout="vertical"
      >
        <div className="w-full flex flex-col gap-spacing-xs">
          <Typography.Title level={2} className="!font-bold !p-0 !m-0">
            Settings
          </Typography.Title>
          <Typography.Title level={5} className="!font-semibold  !p-0 !m-0">
            Manage your account profile
          </Typography.Title>
        </div>
        <div className="flex gap-spacing-xs justify-end">
          <Button variant="primary" size="md" htmlType="submit">
            Save change
          </Button>
          <Button variant="secondary" size="md">
            Cancel
          </Button>
        </div>

        <Form.Item
          label="First Name"
          name="first_name"
          className="!text-black !font-bold"
        >
          <Input placeholder="Enter your first name" className="!h-[40px] " />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="last_name"
          className="!text-black !font-bold"
        >
          <Input placeholder="Enter your last name" className="!h-[40px] " />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          className="!text-black !font-bold"
        >
          <Input
            type="email"
            placeholder="Enter your email"
            className="!h-[40px] "
          />
        </Form.Item>

        <Form.Item
          label="Position"
          name="position"
          className="!text-black !font-bold"
        >
          <Input placeholder="" className="!h-[40px] " disabled />
        </Form.Item>

        <Form.Item
          label="Department"
          name="department"
          className="!text-black !font-bold"
        >
          <Input placeholder="department" className="!h-[40px] " disabled />
        </Form.Item>

        <Form.Item label="Role" name="role" className="!text-black !font-bold">
          <Input placeholder="role" className="!h-[40px] " disabled />
        </Form.Item>

        <Form.Item
          label="Company"
          name="company"
          className="!text-black !font-bold"
        >
          <Input placeholder="company" className="!h-[40px] " disabled />
        </Form.Item>

        <Form.Item
          label="Gender"
          name="gender"
          className="!text-black !font-bold"
        >
          <Input placeholder="gender" className="!h-[40px] " />
        </Form.Item>

        <Form.Item
          label="Marital Status"
          name="marital_status"
          className="!text-black !font-bold"
        >
          <Input placeholder="Marital Status" className="!h-[40px] " />
        </Form.Item>

        <Form.Item
          label="Date of Birth"
          name="date_of_birth"
          className="!text-black !font-bold"
        >
          <Input placeholder="Date of Birth" className="!h-[40px] " />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone_number"
          className="!text-black !font-bold"
        >
          <Input placeholder="Phone Number" className="!h-[40px] " />
        </Form.Item>

        <Form.Item
          label="Salary"
          name="salary"
          className="!text-black !font-bold"
        >
          <Input placeholder="salary" className="!h-[40px] " disabled />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          className="!text-black !font-bold"
        >
          <Input placeholder="Address" className="!h-[40px] " />
        </Form.Item>

        <Form.Item
          label="Employment Status"
          name="employment_status"
          className="!text-black !font-bold"
        >
          <Input
            placeholder="Employment Status"
            className="!h-[40px] "
            disabled
          />
        </Form.Item>

        <Form.Item
          label="Date joined"
          name="date_joined"
          className="!text-black !font-bold"
        >
          <Input placeholder="Date Joined" className="!h-[40px] " disabled />
        </Form.Item>

        <Form.Item
          label="Manager"
          name="manager"
          className="!text-black !font-bold"
        >
          <Input placeholder="Manager" className="!h-[40px] " disabled />
        </Form.Item>

        <Form.Item
          label="Emergency Contact Name"
          name="emergency_name"
          className="!text-black !font-bold"
        >
          <Input
            placeholder="Enter your emergency contact name"
            className="!h-[40px] "
          />
        </Form.Item>

        <Form.Item
          label="Emergency Phone Number"
          name="emergency_phone"
          className="!text-black !font-bold"
        >
          <Input
            placeholder="Enter your emergency phone number"
            className="!h-[40px] "
          />
        </Form.Item>

        <Form.Item
          label="Emergency Contact Relation"
          name="emergency_contact"
          className="!text-black !font-bold"
        >
          <Input
            type="email"
            placeholder="Enter your emergency contact relation"
            className="!h-[40px] "
          />
        </Form.Item>
      </Form>
    </section>
  );
}
