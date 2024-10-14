"use client";

import { Button, Input, Upload } from "antd";
import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
import { BiUpload } from "react-icons/bi";
import { IoReturnUpBack } from "react-icons/io5";
import { toast } from "react-toastify";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
interface Props {
  backToViewBlogList: () => void;
}

const AddBlog: React.FC<Props> = (props) => {
  const { backToViewBlogList } = props;

  const [value, setValue] = useState("");

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],

    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],

    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],

    ["clean"],
  ];

  const modules = {
    toolbar: toolbarOptions,
  };

  const beforeUploadImage = (file: File) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      toast.error("Chỉ chấp nhận file hình ảnh vào ô này!");
    }
    return isImage || Upload.LIST_IGNORE;
  };

  return (
    <div>
      <div
        onClick={backToViewBlogList}
        className="flex items-center gap-4 flex-row back-button"
        style={{ color: "#8B8484" }}
      >
        <IoReturnUpBack />
        Quay lại
      </div>

      <h1 className="text-center text-2xl uppercase">Tạo blog mới</h1>

      <Input placeholder="Thêm tiêu đề cho blog" className="mb-5 mt-5" />

      <Upload
        listType="picture"
        beforeUpload={beforeUploadImage}
        accept="image/*"
        maxCount={1}
        className="flex gap-4 flex-row"
      >
        <Button icon={<BiUpload />}>Ảnh đại diện cho blog</Button>
      </Upload>

      <ReactQuill
        modules={modules}
        theme="snow"
        value={value}
        onChange={setValue}
        className="mt-5"
      />

      {/* <h2>Your Blog Preview:</h2>
      <div
        style={{ padding: "10px", border: "1px solid #ddd", marginTop: "20px" }}
        dangerouslySetInnerHTML={{ __html: value }} 
      /> */}
    </div>
  );
};

export default AddBlog;
