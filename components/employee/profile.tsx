"use client";
import Button from "../ui/Button";
import { DatePicker, Form, Input, Select, Upload } from "antd";
import { Typography } from "antd";
import { IUser } from "@/types";
import Image from "next/image";
import defaultProfile from "@/public/profile.png";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/selectors";
import { GenderOptions, MaritalStatusOptions } from "@/constants";
import { useMemo } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import toast from "react-hot-toast";

dayjs.extend(customParseFormat);

export default function EmployeeProfile() {
  const user = useSelector(selectUser);
  const [form] = Form.useForm();

  const onFinish = (values: IUser) => {
    const payload = {
      ...values,
      date_joined: values.date_joined
        ? dayjs(values?.date_joined)?.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
        : null,
      date_of_birth: values.date_of_birth
        ? dayjs(values?.date_of_birth)?.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
        : null,
      date_terminated: values.date_terminated
        ? dayjs(values?.date_terminated)?.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
        : null,
    };

    console.log("Final Payload: ", payload);
  };

  const initialValues = useMemo(() => {
    return {
      ...user,
      date_joined: user?.date_joined
        ? dayjs(user.date_joined, "YYYY-MM-DD")
        : null,
      date_of_birth: user?.date_of_birth
        ? dayjs(user.date_of_birth, "YYYY-MM-DD")
        : null,
      date_terminated: user?.date_terminated
        ? dayjs(user.date_terminated, "YYYY-MM-DD")
        : null,
    };
  }, [user]);

  const handleResetForm = () => {
    form.resetFields();
  };

  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith("image/");
    const maxSize = 3 * 1024 * 1024; //3MB

    if (!isImage) {
      toast.error("You can only upload image files!");
      return Upload.LIST_IGNORE;
    }

    if (file.size > maxSize) {
      toast.error("Image size must be 3MB or less!");
      return Upload.LIST_IGNORE;
    }

    return true;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUpload = ({ file }: { file: any }) => {
    console.log(file);
  };

  return (
    <section className="!w-full !h-full">
      <Form
        form={form}
        name="profile"
        initialValues={initialValues}
        onFinish={onFinish}
        className="!my-spacing-l !grid !grid-cols-1 sm:!grid-cols-2 gap-spacing-l"
        layout="vertical"
      >
        <div className="w-full flex flex-col gap-spacing-xs">
          <Typography.Title
            level={2}
            className="!font-bold !p-0 !m-0 !text-[24px]"
          >
            Settings
          </Typography.Title>
          <Typography.Title
            level={5}
            className="!font-semibold  !p-0 !m-0 !text-[16px] !text-muted"
          >
            Manage your account profile
          </Typography.Title>
        </div>
        <div className="flex gap-spacing-xs justify-end">
          <Button variant="primary" size="md" htmlType="submit">
            Save change
          </Button>
          <Button
            variant="secondary"
            size="md"
            htmlType="button"
            onClick={handleResetForm}
          >
            Cancel
          </Button>
        </div>

        <Typography.Title level={4} className="!p-0 !m-0">
          Profile Picture
        </Typography.Title>
        <div className="mt-spacing-xs flex justify-start items-start gap-spacing-xl sm:!col-span-2 flex-wrap">
          <div className="flex gap-spacing-s">
            <Image
              src={user?.profile_picture || defaultProfile}
              alt="profile_pic"
              className="h-[64px] w-[64px] object-contain rounded-[50%]"
            ></Image>

            <div className="flex flex-col justify-start items-start gap-spacing-xxxs">
              <Typography.Title className="!p-0 !m-0 !text-lg !text-black">
                {user?.first_name ?? ""}
              </Typography.Title>
              <Typography.Title className="!p-0 !m-0 !text-sm  !text-muted">
                {user?.role ?? ""}
              </Typography.Title>
            </div>
          </div>

          <div className="mr-spacing-l flex gap-spacing-m self-end">
            <Upload
              showUploadList={false}
              customRequest={handleUpload}
              beforeUpload={beforeUpload}
            >
              <Button>Change</Button>
            </Upload>
            <Button variant="secondary" htmlType="button">
              Delete
            </Button>
          </div>
        </div>

        <Form.Item
          label="First Name"
          name="first_name"
          className="!text-black !font-bold"
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
        >
          <Input placeholder="" className="!h-[40px] !font-normal" disabled />
        </Form.Item>

        <Form.Item
          label="Department"
          name="department"
          className="!text-black !font-bold"
        >
          <Input
            placeholder="department"
            className="!h-[40px] !font-normal"
            disabled
          />
        </Form.Item>

        <Form.Item label="Role" name="role" className="!text-black !font-bold">
          <Input
            placeholder="role"
            className="!h-[40px] !font-normal"
            disabled
          />
        </Form.Item>

        <Form.Item
          label="Company"
          name="company"
          className="!text-black !font-bold"
        >
          <Input
            placeholder="company"
            className="!h-[40px] !font-normal"
            disabled
          />
        </Form.Item>

        <Form.Item
          label="Gender"
          name="gender"
          className="!text-black !font-bold"
        >
          <Select
            placeholder="Select gender"
            options={GenderOptions}
            className="!h-[40px] !font-normal"
          />
        </Form.Item>

        <Form.Item
          label="Marital Status"
          name="marital_status"
          className="!text-black !font-bold"
        >
          <Select
            placeholder="Select marital status"
            options={MaritalStatusOptions}
            className="!h-[40px] !font-normal"
          />
        </Form.Item>

        <Form.Item
          label="Date of Birth"
          name="date_of_birth"
          className="!text-black !font-bold"
        >
          <DatePicker
            className="!w-full !h-[40px] !font-normal"
            format={"DD-MM-YYYY"}
          />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone_number"
          className="!text-black !font-bold"
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
        >
          <Input
            placeholder="salary"
            className="!h-[40px] !font-normal"
            disabled
          />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          className="!text-black !font-bold"
        >
          <Input placeholder="Address" className="!h-[40px] !font-normal" />
        </Form.Item>

        <Form.Item
          label="Employment Status"
          name="employment_status"
          className="!text-black !font-bold"
        >
          <Input
            placeholder="Employment Status"
            className="!h-[40px] !font-normal"
            disabled
          />
        </Form.Item>

        <Form.Item
          label="Date joined"
          name="date_joined"
          className="!text-black !font-bold !w-full"
        >
          <DatePicker
            placeholder="Date Joined"
            className="!h-[40px] !w-full !font-normal"
            disabled
            format={"DD-MM-YYYY"}
          />
        </Form.Item>

        <Form.Item
          label="Manager"
          name="manager"
          className="!text-black !font-bold"
        >
          <Input className="!h-[40px] !font-normal" disabled />
        </Form.Item>

        <Form.Item
          label="Emergency Contact Name"
          name={["emergency_contact", "name"]}
          className="!text-black !font-bold"
        >
          <Input
            placeholder="Enter your emergency contact name"
            className="!h-[40px] !font-normal"
          />
        </Form.Item>

        <Form.Item
          label="Emergency Phone Number"
          name={["emergency_contact", "phone"]}
          className="!text-black !font-bold"
        >
          <Input
            placeholder="Enter your emergency phone number"
            className="!h-[40px] !font-normal"
          />
        </Form.Item>

        <Form.Item
          label="Emergency Contact Relation"
          name={["emergency_contact", "relation"]}
          className="!text-black !font-bold"
        >
          <Input
            type="text"
            placeholder="Enter your emergency contact relation"
            className="!h-[40px] !font-normal"
          />
        </Form.Item>
      </Form>
    </section>
  );
}
