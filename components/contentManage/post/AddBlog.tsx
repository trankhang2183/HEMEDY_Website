"use client";

import { BlogType } from "@/types/blog.type";
import blog from "@services/blog";
import { BlogTypeEnum } from "@utils/enum";
import { toastError } from "@utils/global";
import { handleUploadToFirebase } from "@utils/helpers";
import { Button, Form, Input, Modal, Select, Upload } from "antd";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
import { BiUpload } from "react-icons/bi";
import { IoReturnUpBack } from "react-icons/io5";
import { MdUpload } from "react-icons/md";
import { toast } from "react-toastify";
const { confirm } = Modal;

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
interface Props {
  backToViewBlogList: () => void;
  handleAddNewBlog: (newBlog: BlogType) => void;
}

const AddBlog: React.FC<Props> = (props) => {
  const { backToViewBlogList, handleAddNewBlog } = props;
  const { data: session } = useSession();
  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = useState<boolean>();

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

  const handleUploadBlog = async () => {
    try {
      const values = await form.validateFields();
      toast.warning("Tiến trình có thể diễn ra khá lâu nếu blog có ảnh, vui lòng đợi trong giây lát!")
      setIsLoading(true);

      let handle_content = values.content;
      const imgTags = handle_content.match(/<img[^>]+src="([^">]+)"/g);

      if (imgTags) {
        for (const imgTag of imgTags) {
          const srcMatch = imgTag.match(/src="([^">]+)"/);
  
          if (srcMatch && srcMatch[1]) {
            const imgSrc = srcMatch[1];
  
            let file;
            if (imgSrc.startsWith("data:image/")) {
              const byteString = atob(imgSrc.split(",")[1]);
              const mimeString = imgSrc.split(",")[0].split(":")[1].split(";")[0];
              const arrayBuffer = new ArrayBuffer(byteString.length);
              const intArray = new Uint8Array(arrayBuffer);
  
              for (let i = 0; i < byteString.length; i++) {
                intArray[i] = byteString.charCodeAt(i);
              }
  
              file = new File([intArray], "image.png", { type: mimeString });
            }
  
            const imgUrl = await handleUploadToFirebase(file || imgSrc, "images");
  
            handle_content = handle_content.replace(imgSrc, imgUrl);
          }
        }
      }
  
      const imgUrl = await handleUploadToFirebase(
        values.img_file.fileList[0].originFileObj,
        "images"
      );

      const newBlog: BlogType = {
        title: values.title,
        category: values.category,
        content: handle_content,
        type: values.type,
        representative_img: imgUrl,
      };


      // Gọi API thêm blog mới
      const responseCreate = await blog.createBlog(
        session?.user.access_token!,
        newBlog
      );

      handleAddNewBlog(responseCreate);
      toast.success("Blog đã được tạo thành công!");
      form.resetFields();
      backToViewBlogList();

    } catch (error: any) {
      toast.error("Có lỗi xảy ra khi tạo blog mới");
      toastError(error);
      console.log("error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <div
          onClick={backToViewBlogList}
          className="flex items-center gap-4 flex-row back-button"
          style={{ color: "#8B8484" }}
        >
          <IoReturnUpBack />
          Quay lại
        </div>

        <Button
          loading={isLoading}
          onClick={async () => {
            await form.validateFields();

            confirm({
              cancelText: "Quay lại",
              okText: "Xác nhận",
              title: "Bạn có chắc muốn đăng bài Blog này?",
              async onOk() {
                handleUploadBlog();
              },
              onCancel() {},
            });
          }}
          icon={<MdUpload />}
          className="flex items-center"
        >
          Xác nhận đăng blog
        </Button>
      </div>

      <h1 className="text-center text-2xl uppercase">Tạo blog mới</h1>

      <Form form={form} layout="vertical">
        <Form.Item
          name="title"
          label="Tiêu đề blog"
          rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
        >
          <Input placeholder="Thêm tiêu đề cho blog" />
        </Form.Item>

        <Form.Item
          name="img_file"
          label="Ảnh đại diện"
          rules={[{ required: true, message: "Vui lòng tải lên ảnh đại diện" }]}
        >
          <Upload
            listType="picture"
            beforeUpload={beforeUploadImage}
            accept="image/*"
            maxCount={1}
            className="flex gap-4 flex-row"
          >
            <Button icon={<BiUpload />}>Chọn ảnh đại diện</Button>
          </Upload>
        </Form.Item>

        <div className="grid grid-cols-2 gap-10">
          <Form.Item
            name="category"
            label="Thể loại"
            rules={[{ required: true, message: "Vui lòng nhập thể loại" }]}
          >
            <Input placeholder="Thêm thể loại cho blog" />
          </Form.Item>

          <Form.Item
            name="type"
            label="Kiểu blog"
            rules={[{ required: true, message: "Vui lòng chọn kiểu blog" }]}
          >
            <Select placeholder="Chọn kiểu blog">
              <Select.Option value={BlogTypeEnum.sharing}>
                {BlogTypeEnum.sharing}
              </Select.Option>
              <Select.Option value={BlogTypeEnum.knowledge}>
                {BlogTypeEnum.knowledge}
              </Select.Option>
            </Select>
          </Form.Item>
        </div>

        <Form.Item
          name="content"
          label="Nội dung blog"
          rules={[{ required: true, message: "Vui lòng nhập nội dung blog" }]}
        >
          <ReactQuill modules={modules} theme="snow" />
        </Form.Item>
      </Form>

     
    </div>
  );
};

export default AddBlog;
