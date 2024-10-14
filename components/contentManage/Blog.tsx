"use client";

import SearchFilterHeader from "@components/manager/SearchFilterHeader";
import {
  Spin,
  Table,
  Button,
  Avatar,
  Menu,
  Dropdown,
  TableProps,
  Modal,
  Form,
  Input,
  Upload,
} from "antd";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

import { IoIosMore } from "react-icons/io";
import { toast } from "react-toastify";
import { FiTrash2 } from "react-icons/fi";
import { handleActionNotSupport } from "@utils/global";
import { PiPlus } from "react-icons/pi";
import { BiEdit, BiUpload } from "react-icons/bi";
import { BlogType } from "@/types/blog.type";
import blog from "@services/blog";
import { BlogTypeEnum } from "@utils/enum";
import AddBlog from "./blog/AddBlog";
const { confirm } = Modal;

const Blog = () => {
  const { data: session } = useSession();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [originalData, setOriginalData] = useState<BlogType[]>([]);
  const [processingData, setProcessingData] = useState<BlogType[]>([]);

  const [searchText, setSearchText] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string | undefined>(undefined);

  const [isAddNewBlog, setIsAddNewBlog] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchBlogList = async () => {
      if (session?.user.access_token) {
        setIsLoading(true);
        try {
          const responseGetAllBlog = await blog.getAllBlogList();

          setOriginalData(responseGetAllBlog);
          setProcessingData(responseGetAllBlog);
        } catch (error: any) {
          toast.error("Có lỗi khi tải dữ liệu");
          toast.error(error!.response?.data?.message);
          console.error("Có lỗi khi tải dữ liệu:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchBlogList();
  }, [session?.user.access_token]);

  useEffect(() => {
    let updatedData = [...originalData];

    if (searchText) {
      updatedData = updatedData.filter((blog: BlogType) =>
        blog.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (typeFilter) {
      updatedData = updatedData.filter((blog) => blog.type === typeFilter);
    }

    setProcessingData(updatedData);
  }, [searchText, typeFilter, originalData]);

  const handleClearFilters = () => {
    setSearchText("");
    setTypeFilter;
    setProcessingData(originalData);
  };

  const columns: TableProps<any>["columns"] = [
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Kiểu blog",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Thể loại",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Ngày thêm vào",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => new Date(text).toLocaleString(),
    },
    {
      title: "Thao tác",
      key: "actions",
      align: "center",
      render: (text: string, record: BlogType) => {
        const menu = (
          <Menu>
            <Menu.Item key="edit">
              <Button
                type="link"
                onClick={() => {
                  handleActionNotSupport();
                }}
                icon={<BiEdit style={{ fontSize: "20px" }} />}
                style={{ color: "black" }}
                className="flex items-center"
              >
                Chỉnh sửa
              </Button>
            </Menu.Item>
            <Menu.Item key="delete">
              <Button
                type="link"
                onClick={async () => {
                  confirm({
                    cancelText: "Quay lại",
                    okText: "Xác nhận",
                    title: "Bạn có chắc muốn xoá blog này?",
                    async onOk() {
                      try {
                        await blog.deleteBlog(
                          session?.user.access_token!,
                          record._id!
                        );
                        setOriginalData((prevData) =>
                          prevData.filter((item) => item._id !== record._id)
                        );
                        setProcessingData((prevData) =>
                          prevData.filter((item) => item._id !== record._id)
                        );

                        toast.success("Blog đã được xoá thành công!");
                      } catch (error: any) {
                        toast.error("Có lỗi xảy ra khi xoá bài hát!", {
                          autoClose: 2000,
                        });
                        toast.error(error!.response?.data?.message, {
                          autoClose: 2000,
                        });
                      }
                    },
                    onCancel() {},
                  });
                }}
                icon={<FiTrash2 style={{ fontSize: "20px" }} />}
                style={{ color: "red" }}
                className="flex items-center"
              >
                Xóa blog
              </Button>
            </Menu.Item>
          </Menu>
        );

        return (
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button
              type="link"
              icon={<IoIosMore style={{ fontSize: "24px" }} />}
            />
          </Dropdown>
        );
      },
    },
  ];

  return isAddNewBlog ? (
    <AddBlog backToViewBlogList={() => setIsAddNewBlog(false)} />
  ) : (
    <div>
      <div className="header-order">
        <SearchFilterHeader
          searchPlaceholder="Tìm kiếm blog"
          searchValue={searchText}
          onSearchChange={setSearchText}
          haveFilter={true}
          filters={[
            {
              label: "Kiểu blog",
              options: [
                { label: BlogTypeEnum.sharing, value: BlogTypeEnum.sharing },
                {
                  label: BlogTypeEnum.knowledge,
                  value: BlogTypeEnum.knowledge,
                },
              ],
              value: typeFilter,
              onChange: setTypeFilter,
            },
          ]}
          handleClearFilters={handleClearFilters}
        />

        <div className="p-4">
          <Button icon={<PiPlus />} onClick={() => setIsAddNewBlog(true)}>
            Thêm blog
          </Button>
        </div>
      </div>
      <div className="mt-4 px-4">
        <Spin spinning={isLoading}>
          <Table
            columns={columns}
            dataSource={processingData}
            rowKey={(record) => record._id}
            pagination={{ pageSize: 10 }}
          />
        </Spin>
      </div>
    </div>
  );
};

export default Blog;
