"use client";
import { useState } from "react";
import Button from "@/components/ui/Button";
import { IEmployeeLeaveForm } from "@/types";
import { DatePicker, Form, Input, Select } from "antd";
import { Typography } from "antd";
import type { UploadFile } from "antd";
import FileUploader from "@/components/ui/UploadFiles";
import { leaveTypeOptions } from "@/constants/dashboard";

export default function EmployeeLeaveForm() {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleFileChange = (newFileList: UploadFile[]) => {
    setFileList(newFileList);
  };

  const onFinish = (values: IEmployeeLeaveForm) => {
    const formData = {
      ...values,
      attachments: fileList,
    };

    console.log("Received values of form: ", formData);
  };

  return (
    <section className="p-spacing-l">
      <div className="flex flex-col justify-start items-start gap-spacing-s">
        <Typography.Title level={2} className="!p-0 !m-0">
          Employee Leave Form
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
              className="w-full"
              format="YYYY-MM-DD"
              onChange={(_, formatted) => console.log(formatted)}
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
              className="w-full"
              format="YYYY-MM-DD"
              onChange={(_, formatted) => console.log(formatted)}
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
          <Button htmlType="submit" className="!w-max">
            Apply Leave
          </Button>
        </div>
      </Form>
    </section>
  );
}
