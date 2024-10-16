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
} from "antd";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

import { IoIosMore } from "react-icons/io";
import { toast } from "react-toastify";
import { FiTrash2 } from "react-icons/fi";
import { handleActionNotSupport } from "@utils/global";
import { PiPlus } from "react-icons/pi";
import { BiDetail, BiEdit, BiUpload } from "react-icons/bi";
import { SurveyType } from "@/types/survey.type";
import survey from "@services/survey";
import AddSurvey from "./post/AddSurvey";
import ModalViewSurvey from "./view/ModalViewSurvey";

const { confirm } = Modal;

const Survey = () => {
  const { data: session } = useSession();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [originalData, setOriginalData] = useState<SurveyType[]>([]);
  const [processingData, setProcessingData] = useState<SurveyType[]>([]);

  const [searchText, setSearchText] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string | undefined>(undefined);

  const [isAddNewSurvey, setIsAddNewSurvey] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState<SurveyType | null>(null);
  const [isShowSurveyDetail, setIsShowSurveyDetail] = useState(false);

  const handleAddNewSurvey = (newSurvey: SurveyType) => {
    setOriginalData((prevData) => [newSurvey, ...prevData]);
    setProcessingData((prevData) => [newSurvey, ...prevData]);
  };

  const handleViewDetail = (survey: SurveyType) => {
    setSelectedSurvey(survey);
    setIsShowSurveyDetail(true);
  };

  useEffect(() => {
    const fetchSurveyList = async () => {
      if (session?.user.access_token) {
        setIsLoading(true);
        try {
          const responseGetAllSurvey = await survey.getAllSurveysList();

          const sortedSurveyList = responseGetAllSurvey.sort(
            (a: SurveyType, b: SurveyType) =>
              new Date(b.createdAt!).getTime() -
              new Date(a.createdAt!).getTime()
          );

          setOriginalData(sortedSurveyList);
          setProcessingData(sortedSurveyList);
        } catch (error: any) {
          toast.error("Có lỗi khi tải dữ liệu");
          toast.error(error!.response?.data?.message);
          console.error("Có lỗi khi tải dữ liệu:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchSurveyList();
  }, [session?.user.access_token]);

  useEffect(() => {
    let updatedData = [...originalData];

    if (searchText) {
      updatedData = updatedData.filter((survey: SurveyType) =>
        survey.title.toLowerCase().includes(searchText.toLowerCase())
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
      title: "Số thự tự",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
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
      render: (text: string, record: SurveyType) => {
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
                    title: "Bạn có chắc muốn xoá survey này?",
                    async onOk() {
                      try {
                        await survey.deleteSurvey(
                          session?.user.access_token!,
                          record._id!
                        );
                        setOriginalData((prevData) =>
                          prevData.filter((item) => item._id !== record._id)
                        );
                        setProcessingData((prevData) =>
                          prevData.filter((item) => item._id !== record._id)
                        );

                        toast.success("Survey đã được xoá thành công!");
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
                Xóa survey
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

  return isAddNewSurvey ? (
    <AddSurvey
      backToViewSurveyList={() => setIsAddNewSurvey(false)}
      handleAddNewSurvey={handleAddNewSurvey}
    />
  ) : (
    <div>
      <div className="header-order">
        <SearchFilterHeader
          searchPlaceholder="Tìm kiếm bài test"
          searchValue={searchText}
          onSearchChange={setSearchText}
          haveFilter={false}
          handleClearFilters={handleClearFilters}
        />

        <div className="p-4">
          <Button icon={<PiPlus />} onClick={() => setIsAddNewSurvey(true)}>
            Thêm bài test
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

      <ModalViewSurvey
        open={isShowSurveyDetail}
        onClose={() => setIsShowSurveyDetail(false)}
        data={selectedSurvey}
      />

    </div>
  );
};

export default Survey;
