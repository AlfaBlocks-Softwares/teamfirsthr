"use client";
import Button from "@/components/ui/Button";
import {
  DepartmentOptions,
  EmployementStatusOptions,
  GenderOptions,
  MaritalStatusOptions,
  ROLEOptions,
} from "@/constants";
import { useAddNewUserMutation } from "@/redux/apis";
import { IEmployeeProfile } from "@/types";
// import { ZodValidator } from "@/utils";
// import { signUpFormSchema } from "@/validations";
import { DatePicker, Form, Input, Select } from "antd";
import { Typography } from "antd";

export default function CreateNewUserForm() {
  const [addNewUser, { isLoading }] = useAddNewUserMutation();

  const onFinish = async (values: IEmployeeProfile) => {
    console.log("Received values of form: ", values);
    await addNewUser({ ...values });
  };

  return (
    <div className="!w-full !h-full">
      <Typography.Title level={4}>Create New User</Typography.Title>
      <Form
        name="signup"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        className="!w-full !h-full"
        layout="vertical"
      >
        <div className="w-full !grid !grid-cols-2 justify-start items-start gap-spacing-m">
          <Form.Item
            label="First Name"
            name="first_name"
            className="!text-black !font-bold"
            rules={[{ required: true, message: "First name is required" }]}
          >
            <Input
              placeholder="Enter your first name"
              className="!h-[40px] !font-normal"
            />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="last_name"
            className="!text-black !font-bold"
            rules={[{ required: true, message: "Last name is required" }]}
          >
            <Input
              placeholder="Enter your last name"
              className="!h-[40px] !font-normal"
            />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            className="!text-black !font-bold"
            rules={[
              { required: true, message: "Email is required", type: "email" },
            ]}
          >
            <Input
              type="email"
              placeholder="Enter your email"
              className="!h-[40px] !font-normal"
            />
          </Form.Item>
          <Form.Item
            label="Position"
            name="position"
            className="!text-black !font-bold"
            rules={[{ required: true, message: "Position is required" }]}
          >
            <Input placeholder="position" className="!h-[40px] !font-normal" />
          </Form.Item>
          <Form.Item
            label="Department"
            name="department"
            className="!text-black !font-bold"
            rules={[{ required: true, message: "Department is required" }]}
          >
            <Select
              placeholder="Select department"
              options={DepartmentOptions}
              className="!h-[40px] !font-normal"
            />
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            className="!text-black !font-bold"
            rules={[{ required: true, message: "Role is required" }]}
          >
            <Select
              placeholder="Select role"
              options={ROLEOptions}
              className="!h-[40px] !font-normal"
            />
          </Form.Item>
          <Form.Item
            label="Company"
            name="company"
            className="!text-black !font-bold"
          >
            <Input placeholder="company" className="!h-[40px] !font-normal" />
          </Form.Item>
          <Form.Item
            label="Marital Status"
            name="marital_status"
            className="!text-black !font-bold"
            rules={[{ required: true, message: "Marital Status is required" }]}
          >
            <Select
              placeholder="Select marital status"
              options={MaritalStatusOptions}
              className="!h-[40px] !font-normal"
            />
          </Form.Item>
          <Form.Item
            label="Gender"
            name="gender"
            className="!text-black !font-bold"
            rules={[{ required: true, message: "Gender is required" }]}
          >
            <Select
              placeholder="Select gender"
              options={GenderOptions}
              className="!h-[40px] !font-normal"
            />
          </Form.Item>

          <Form.Item
            label="Date of Birth"
            name="date_of_birth"
            className="!text-black !font-bold"
            rules={[{ required: true, message: "Date of birth is required" }]}
          >
            <DatePicker
              name="date_of_birth"
              className="!w-full !h-[40px] !font-normal"
            />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phone_number"
            className="!text-black !font-bold"
            rules={[{ required: true, message: "Phone is required" }]}
          >
            <Input
              placeholder="Phone Number"
              className="!h-[40px] !font-normal"
            />
          </Form.Item>
          <Form.Item
            label="Salary"
            name="salary"
            className="!text-black !font-bold"
            rules={[{ required: true, message: "Salary is required" }]}
          >
            <Input placeholder="salary" className="!h-[40px] !font-normal" />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            className="!text-black !font-bold"
            rules={[{ required: true, message: "Address is required" }]}
          >
            <Input placeholder="Address" className="!h-[40px] !font-normal" />
          </Form.Item>
          <Form.Item
            label="Employment Status"
            name="employment_status"
            className="!text-black !font-bold"
            rules={[
              { required: true, message: "Employement Status is required" },
            ]}
          >
            <Select
              placeholder="Select employement status"
              options={EmployementStatusOptions}
              className="!h-[40px] !font-normal"
            />
          </Form.Item>
          <Form.Item
            label="Date joined"
            name="date_joined"
            className="!text-black !font-bold"
            rules={[{ required: true, message: "Date Joined is required" }]}
          >
            <DatePicker
              name="date_joined"
              className="!w-full !h-[40px] !font-normal"
            />
          </Form.Item>
          <Form.Item
            label="Manager"
            name="manager"
            className="!text-black !font-bold"
            rules={[{ required: true, message: "Manager is required" }]}
          >
            <Input placeholder="Manager" className="!h-[40px] !font-normal" />
          </Form.Item>
          <Form.Item
            label="Emergency Contact Name"
            name="emergency_name"
            className="!text-black !font-bold"
            rules={[
              { required: true, message: "Emergency contact name is required" },
            ]}
          >
            <Input
              placeholder="Enter your emergency contact name"
              className="!h-[40px] !font-normal"
            />
          </Form.Item>
          <Form.Item
            label="Emergency Phone Number"
            name="emergency_phone"
            className="!text-black !font-bold"
            rules={[{ required: true, message: "Emergency phone is required" }]}
          >
            <Input
              placeholder="Enter your emergency phone number"
              className="!h-[40px] !font-normal"
            />
          </Form.Item>
          <Form.Item
            label="Emergency Contact Relation"
            name="emergency_contact"
            className="!text-black !font-bold "
            rules={[
              {
                required: true,
                message: "Emergency contact relation is required",
              },
            ]}
          >
            <Input
              placeholder="Enter your emergency contact relation"
              className="!h-[40px] !font-normal"
            />
          </Form.Item>
        </div>
        <Button
          htmlType="submit"
          className="!w-max mt-spacing-s !px-spacing-l"
          loading={isLoading}
        >
          Create
        </Button>
      </Form>
    </div>
  );
}
