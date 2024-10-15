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
import { BiDetail, BiEdit, BiUpload } from "react-icons/bi";
import { WorkshopType } from "@/types/workshop.type";
import workshop from "@services/workshop";
import { WorkshopTypeEnum } from "@utils/enum";
import ModalViewWorkshop from "./view/ModalViewWorkshop";
import AddWorkshop from "./post/AddWorkshop";
const { confirm } = Modal;

const Workshop = () => {
  const { data: session } = useSession();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [originalData, setOriginalData] = useState<WorkshopType[]>([]);
  const [processingData, setProcessingData] = useState<WorkshopType[]>([]);

  const [searchText, setSearchText] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string | undefined>(undefined);

  const [isAddNewWorkshop, setIsAddNewWorkshop] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState<WorkshopType | null>(
    null
  );
  const [isShowWorkshopDetail, setIsShowWorkshopDetail] = useState(false);

  const handleAddNewWorkshop = (newWorkshop: WorkshopType) => {
    setOriginalData((prevData) => [newWorkshop, ...prevData]);
    setProcessingData((prevData) => [newWorkshop, ...prevData]);
  };

  const handleViewDetail = (workshop: WorkshopType) => {
    setSelectedWorkshop(workshop);
    setIsShowWorkshopDetail(true);
  };

  useEffect(() => {
    const fetchWorkshopList = async () => {
      if (session?.user.access_token) {
        setIsLoading(true);
        try {
          const responseGetAllWorkshop = await workshop.getAllWorkshopList();

          const sortedWorkshopsList = responseGetAllWorkshop.sort(
            (a: WorkshopType, b: WorkshopType) =>
              new Date(b.createdAt!).getTime() -
              new Date(a.createdAt!).getTime()
          );

          setOriginalData(sortedWorkshopsList);
          setProcessingData(sortedWorkshopsList);
        } catch (error: any) {
          toast.error("Có lỗi khi tải dữ liệu");
          toast.error(error!.response?.data?.message);
          console.error("Có lỗi khi tải dữ liệu:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchWorkshopList();
  }, [session?.user.access_token]);

  useEffect(() => {
    let updatedData = [...originalData];

    if (searchText) {
      updatedData = updatedData.filter((workshop: WorkshopType) =>
        workshop.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (typeFilter) {
      updatedData = updatedData.filter(
        (workshop) => workshop.type === typeFilter
      );
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
      title: "Subtitle",
      dataIndex: "subtitle",
      key: "subtitle",
    },
    {
      title: "Kiểu workshop",
      dataIndex: "type",
      key: "type",
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
      render: (text: string, record: WorkshopType) => {
        const menu = (
          <Menu>
            <Menu.Item key="detail">
              <Button
                type="link"
                onClick={() => handleViewDetail(record)}
                icon={<BiDetail style={{ fontSize: "20px" }} />}
                style={{ color: "black" }}
                className="flex items-center"
              >
                Chi tiết
              </Button>
            </Menu.Item>
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
                    title: "Bạn có chắc muốn xoá workshop này?",
                    async onOk() {
                      try {
                        await workshop.deleteWorkshop(
                          session?.user.access_token!,
                          record._id!
                        );
                        setOriginalData((prevData) =>
                          prevData.filter((item) => item._id !== record._id)
                        );
                        setProcessingData((prevData) =>
                          prevData.filter((item) => item._id !== record._id)
                        );

                        toast.success("Workshop đã được xoá thành công!");
                      } catch (error: any) {
                        toast.error("Có lỗi xảy ra khi xoá bài hát!");
                        toast.error(error!.response?.data?.message);
                      }
                    },
                    onCancel() {},
                  });
                }}
                icon={<FiTrash2 style={{ fontSize: "20px" }} />}
                style={{ color: "red" }}
                className="flex items-center"
              >
                Xóa workshop
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

  return isAddNewWorkshop ? (
    <AddWorkshop
      backToViewWorkshopList={() => setIsAddNewWorkshop(false)}
      handleAddNewWorkshop={handleAddNewWorkshop}
    />
  ) : (
    <div>
      <div className="header-order">
        <SearchFilterHeader
          searchPlaceholder="Tìm kiếm workshop"
          searchValue={searchText}
          onSearchChange={setSearchText}
          haveFilter={true}
          filters={[
            {
              label: "Kiểu workshop",
              options: [
                {
                  label: WorkshopTypeEnum.artWorkshops,
                  value: WorkshopTypeEnum.artWorkshops,
                },
                {
                  label: WorkshopTypeEnum.interestingWorkshops,
                  value: WorkshopTypeEnum.interestingWorkshops,
                },
              ],
              value: typeFilter,
              onChange: setTypeFilter,
            },
          ]}
          handleClearFilters={handleClearFilters}
        />

        <div className="p-4">
          <Button icon={<PiPlus />} onClick={() => setIsAddNewWorkshop(true)}>
            Thêm workshop
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

      <ModalViewWorkshop
        open={isShowWorkshopDetail}
        onClose={() => setIsShowWorkshopDetail(false)}
        data={selectedWorkshop}
      />
    </div>
  );
};

export default Workshop;
