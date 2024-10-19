"use client";

import SearchFilterHeader from "@components/manager/SearchFilterHeader";
import {
  generateFallbackAvatar,
  getAccountStatusVietNamese,
  getScheduledStatus,
} from "@utils/helpers";
import { Spin, Table, Button, Avatar, Menu, Dropdown, TableProps, Modal } from "antd";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { BiDetail } from "react-icons/bi";
import { VscFolderActive } from "react-icons/vsc";
import { IoIosMore } from "react-icons/io";
import { toast } from "react-toastify";
import { MdBlock } from "react-icons/md";
import { FiTrash2 } from "react-icons/fi";
import { handleActionNotSupport } from "@utils/global";
import scheduled from "@services/scheduled";
import { DoctorScheduledType } from "@/types/scheduled.type";
import { FaCheck } from "react-icons/fa6";
import { TIME_SLOT } from "@utils/constants";
import { DatePicker } from "antd";
import dayjs from "dayjs";
const { confirm } = Modal;

const ManagerLayoutNoSSR = dynamic(() => import("@layout/ManagerLayout"), {
  ssr: false,
});

const Calendar = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [originalData, setOriginalData] = useState<DoctorScheduledType[]>([]);
  const [processingData, setProcessingData] = useState<DoctorScheduledType[]>(
    []
  );

  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(dayjs());

  const [searchText, setSearchText] = useState<string>("");

  const [statusFilter, setStatusFilter] = useState<string | undefined>(
    undefined
  );

  const handleCompleteScheduled = () => {};

  useEffect(() => {
    const fetchScheduleds = async () => {
      if (session?.user.access_token) {
        setIsLoading(true);
        try {
          const responseGetAllScheduled = await scheduled.getScheduledOfDoctor(
            session.user.access_token
          );

          const filteredAndSortedData = (responseGetAllScheduled || []).sort(
            (a: DoctorScheduledType, b: DoctorScheduledType) =>
              new Date(b.createdAt!).getTime() -
              new Date(a.createdAt!).getTime()
          );

          setOriginalData(filteredAndSortedData);
          setProcessingData(filteredAndSortedData);
        } catch (error: any) {
          toast.error("Có lỗi khi tải dữ liệu");
          toast.error(error!.response?.data?.message);
          console.error("Có lỗi khi tải dữ liệu:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchScheduleds();
  }, [session?.user.access_token]);

  useEffect(() => {
    let updatedData = [...originalData];

    if (searchText) {
      updatedData = updatedData.filter((scheduled: DoctorScheduledType) =>
        scheduled.customer_id.fullname
          .toLowerCase()
          .includes(searchText.toLowerCase())
      );
    }

    if (statusFilter) {
      updatedData = updatedData.filter(
        (scheduled) => scheduled.status === statusFilter
      );
    }

    if (selectedDate) {
      updatedData = updatedData.filter(
        (scheduled) =>
          dayjs(scheduled.appointment_date).format("DD/MM/YYYY") ===
          selectedDate.format("DD/MM/YYYY")
      );
    }

    setProcessingData(updatedData);
  }, [searchText, statusFilter, selectedDate, originalData]);

  const handleClearFilters = () => {
    setSearchText("");
    setStatusFilter(undefined);
    setSelectedDate(dayjs());
    setProcessingData(originalData);
  };

  const columns: TableProps<any>["columns"] = [
    {
      title: "Khách hàng",
      dataIndex: "customer",
      key: "customer",
      render: (text: string, record: DoctorScheduledType) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src={
              record.customer_id?.avatar_url ||
              generateFallbackAvatar(record.customer_id.fullname)
            }
            alt={record.customer_id.fullname}
            style={{ marginRight: "8px", border: "1px solid #d9d9d9" }}
            size={55}
          />
          <div>
            <div className="text-base">{record.customer_id?.fullname}</div>
            <div className="opacity-70">{record.customer_id?.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone_number",
      key: "phone_number",
      render: (text: string, record: DoctorScheduledType) =>
        record.customer_id.phone_number ? (
          record.customer_id.phone_number
        ) : (
          <i className="text-xs opacity-70">(Chưa cập nhật)</i>
        ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: "200px",
      render: (status: string) => {
        return (
          <div className="flex items-center gap-2">
            <span
              style={{
                display: "inline-block",
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                backgroundColor:
                  status === "Pending"
                    ? "#C0C0C0"
                    : status === "Completed"
                    ? "#00FF19"
                    : "#FF002E",
              }}
            />
            <span>{getScheduledStatus(status)}</span>
          </div>
        );
      },
    },
    {
      title: "Thời gian khám",
      dataIndex: "slot",
      key: "slot",
      render: (slot: string) => {
        return <p>{TIME_SLOT.find((item) => item.slot === slot)?.time}</p>;
      },
    },
    {
      title: "Ngày khám",
      dataIndex: "appointment_date",
      key: "appointment_date",
      render: (text: string) =>
        new Date(text).toLocaleDateString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
    },
    {
      title: "Thao tác",
      key: "actions",
      align: "center",
      render: (text: string, record: DoctorScheduledType) => {
        const menu = (
          <Menu>
            <Menu.Item key="view">
              <Button
                type="link"
                onClick={() => {
                  handleActionNotSupport();
                }}
                icon={<BiDetail style={{ fontSize: "20px" }} />}
                style={{ color: "black" }}
                className="flex items-center"
              >
                Xem chi tiết
              </Button>
            </Menu.Item>

            {record.status === "Pending" && (
              <>
                <Menu.Item key="completed">
                  <Button
                    type="link"
                    onClick={async () => {
                      confirm({
                        cancelText: "Quay lại",
                        okText: "Xác nhận",
                        title: "Bạn có chắc đã khám xong cho bệnh nhân này?",
                        async onOk() {
                          try {
                            await scheduled.changeToCompleteScheduled(
                              session?.user.access_token!,
                              record._id!
                            );

                            setOriginalData((prevData) =>
                              prevData.map((item) =>
                                item._id === record._id ? { ...item, status: "Completed" } : item
                              )
                            );
                          
                            setProcessingData((prevData) =>
                              prevData.map((item) =>
                                item._id === record._id ? { ...item, status: "Completed" } : item
                              )
                            );

                            toast.success("Đổi trạng thái thành công!");
                          } catch (error: any) {
                            toast.error("Có lỗi xảy ra khi đổi trạng thái!");
                            toast.error(error!.response?.data?.message);
                          }
                        },
                        onCancel() {},
                      });
                    }}
                    icon={<FaCheck style={{ fontSize: "20px" }} />}
                    style={{ color: "green" }}
                    className="flex items-center"
                  >
                    Đánh dấu đã hoàn thành
                  </Button>
                </Menu.Item>
              </>
            )}
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

  return (
    <ManagerLayoutNoSSR
      content={
        <div>
          <div className="header-order">
            <SearchFilterHeader
              searchPlaceholder="Tìm kiếm người dùng"
              searchValue={searchText}
              onSearchChange={setSearchText}
              haveFilter={true}
              filters={[
                {
                  label: "Trạng thái",
                  options: [
                    { label: "Đang chờ tới khám", value: "Pending" },
                    { label: "Đã hoàn thành", value: "Completed" },
                    { label: "Đã hủy", value: "Canceled" },
                  ],
                  value: statusFilter,
                  onChange: setStatusFilter,
                },
              ]}
              handleClearFilters={handleClearFilters}
            />

            <div className="p-4">
              <DatePicker
                value={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                format="DD/MM/YYYY"
              />
            </div>
          </div>
          <div className="mt-8">
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
      }
    />
  );
};

export default Calendar;
