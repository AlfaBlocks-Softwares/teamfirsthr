"use client";
import { useState } from "react";
import Button from "@/components/ui/Button";
import { IEmployeeLeaveForm } from "@/types";
import { DatePicker, Form, Input, Select } from "antd";
import { Typography } from "antd";
import type { UploadFile } from "antd";
import FileUploader from "@/components/ui/UploadFiles";
import { leaveTypeOptions } from "@/constants/dashboard";
import { useApplyForLeaveMutation } from "@/redux/apis";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export default function EmployeeLeaveForm() {
  const [form] = Form.useForm();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [applyForLeave, { isLoading }] = useApplyForLeaveMutation();

  const handleFileChange = (newFileList: UploadFile[]) => {
    setFileList(newFileList);
  };

  const onFinish = async (values: IEmployeeLeaveForm) => {
    // const formData = {
    //   ...values,
    //   attachments: fileList,
    // };

    const payload = {
      start_date: dayjs(values?.startDate)?.format("YYYY-MM-DD"),
      end_date: dayjs(values?.endDate)?.format("YYYY-MM-DD"),
    };

    await applyForLeave(payload);
  };

  return (
    <section className="p-spacing-l">
      <div className="flex flex-col justify-start items-start gap-spacing-s">
        <Typography.Title level={2} className="!p-0 !m-0">
          Leave Form
        </Typography.Title>
        <Typography.Title level={5} className="!text-caption !p-0 !m-0">
          You have 15 leaves remaining
        </Typography.Title>
      </div>
      <Form
        form={form}
        name="leave"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        className="!my-spacing-l w-full h-full"
        layout="vertical"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-spacing-m">
          <Form.Item
            label="Leave Type"
            name="leaveType"
            className="!text-black !font-bold sm:col-span-2"
            rules={[{ required: true, message: "Please select leave type" }]}
          >
            <Select
              placeholder="Select leave type"
              options={leaveTypeOptions}
            />
          </Form.Item>

          <Form.Item
            label="Start Date"
            name="startDate"
            className="!text-black !font-bold"
            rules={[{ required: true, message: "Please select start date" }]}
          >
            <DatePicker
              name="startDate"
              className="w-full !font-normal"
              format="YYYY-MM-DD"
            />
          </Form.Item>

          <Form.Item
            label="End Date"
            name="endDate"
            className="!text-black !font-bold"
            rules={[{ required: true, message: "Please select end date" }]}
          >
            <DatePicker
              name="endDate"
              className="w-full !font-normal"
              format="YYYY-MM-DD"
            />
          </Form.Item>

          <Form.Item
            label="Reason"
            name="reason"
            className="!text-black !font-bold sm:col-span-2"
            rules={[{ required: true, message: "Please provide a reason" }]}
          >
            <Input.TextArea
              name="reason"
              rows={6}
              placeholder="Reason for leave"
              className="!font-normal"
            />
          </Form.Item>

          <div className="sm:col-span-2">
            <FileUploader
              maxFileSize={10}
              maxFiles={5}
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              name="attachments"
              label="Attachments"
            />
          </div>
        </div>

        <div className="mt-spacing-m">
          <Button htmlType="submit" className="!w-max" loading={isLoading}>
            Apply Leave
          </Button>
        </div>
      </Form>
    </section>
  );
}
