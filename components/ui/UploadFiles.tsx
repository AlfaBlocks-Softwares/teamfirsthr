"use client";
import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Upload, Form } from "antd";
import type { UploadFile, UploadProps } from "antd";

const { Dragger } = Upload;

interface FileUploaderProps {
  maxFileSize?: number;
  maxFiles?: number;
  onChange?: (fileList: UploadFile[]) => void;
  accept?: string;
  name?: string;
  label?: string;
  required?: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  maxFileSize = 10,
  maxFiles = 5,
  onChange,
  accept,
  name = "attachments",
  label = "Attachments",
  required = false,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleBeforeUpload = (file: File, fileList: File[]) => {
    setFileError(null);
    if (file?.size / 1024 / 1024 > maxFileSize) {
      setFileError(
        `File ${file?.name} exceeds the maximum size of ${maxFileSize}MB`
      );
      return Upload?.LIST_IGNORE;
    }
    if (fileList?.length + fileList?.length > maxFiles) {
      setFileError(`You can only upload a maximum of ${maxFiles} files`);
      return Upload?.LIST_IGNORE;
    }

    return false;
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    const validFileList = newFileList?.filter(
      (file) => file?.status !== "error"
    );

    setFileList(validFileList);

    if (validFileList?.length > 0) {
      setFileError(null);
    }

    if (onChange) {
      onChange(validFileList);
    }
  };

  const uploadProps: UploadProps = {
    name: "file",
    multiple: true,
    fileList,
    beforeUpload: handleBeforeUpload,
    onChange: handleChange,
    accept,
    onDrop(e) {
      console.log("Dropped files", e?.dataTransfer?.files);
    },
  };

  return (
    <Form.Item
      name={name}
      label={label}
      className="!text-black !font-bold"
      help={fileError}
      validateStatus={fileError ? "error" : undefined}
      rules={
        required
          ? [{ required: true, message: "Please upload at least one file" }]
          : []
      }
    >
      <Dragger {...uploadProps}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">{`Support for up to ${maxFiles} files. Max size for each file is ${maxFileSize}MB.`}</p>
      </Dragger>
    </Form.Item>
  );
};

export default FileUploader;
