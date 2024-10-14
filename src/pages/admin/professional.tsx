"use client";

import { UserType } from "@/types/user.type";
import SearchFilterHeader from "@components/manager/SearchFilterHeader";
import customer from "@services/customer";
import { ROLE_CUSTOMER, ROLE_DOCTOR } from "@utils/constants";
import {
  generateFallbackAvatar,
  getAccountStatusVietNamese,
} from "@utils/helpers";
import { Spin, Table, Button, Avatar, Menu, Dropdown, TableProps } from "antd";
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

const ManagerLayoutNoSSR = dynamic(() => import("@layout/ManagerLayout"), {
  ssr: false,
});

const columns: TableProps<any>["columns"] = [
  {
    title: "Người dùng",
    dataIndex: "fullname",
    key: "fullname",
    render: (text: string, record: UserType) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        <Avatar
          src={record.avatar_url || generateFallbackAvatar(record.fullname)}
          alt={record.fullname}
          style={{ marginRight: "8px", border: "1px solid #d9d9d9" }}
          size={55}
        />
        <div>
          <div className="text-base">{record.fullname}</div>
          <div className="opacity-70">{record.email}</div>
        </div>
      </div>
    ),
  },
  {
    title: "Số điện thoại",
    dataIndex: "phone_number",
    key: "phone_number",
    render: (phone_number: string | undefined) =>
      phone_number ? (
        phone_number
      ) : (
        <i className="text-xs opacity-70">(Chưa cập nhật)</i>
      ),
  },
  {
    title: "Chuyên khoa",
    dataIndex: "specialty",
    key: "specialty",
    render: (specialty: string) => (
      <span className="font-semibold" style={{ color: "#009F67" }}>
        {specialty}
      </span>
    ),
  },
  {
    title: "Năng lực",
    dataIndex: "career",
    key: "career",
    render: (career: string) => <span className="font-semibold">{career}</span>,
  },
  {
    title: "Trạng thái",
    dataIndex: "is_ban",
    key: "is_ban",
    width: "200px",
    render: (is_ban: boolean) => {
      return (
        <div className="flex items-center gap-2">
          <span
            style={{
              display: "inline-block",
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              backgroundColor: !is_ban ? "#00FF19" : "#FF002E",
            }}
          />
          <span>{getAccountStatusVietNamese(is_ban)}</span>
        </div>
      );
    },
  },
  {
    title: "Ngày tham gia",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (text: string) => new Date(text).toLocaleString(),
  },
  {
    title: "Thao tác",
    key: "actions",
    align: "center",
    render: (text: string, record: UserType) => {
      const menu = (
        <Menu>
          <Menu.Item key="view">
            <Button
              type="link"
              onClick={() => {
                handleActionNotSupport;
              }}
              icon={<BiDetail style={{ fontSize: "20px" }} />}
              style={{ color: "black" }}
              className="flex items-center"
            >
              Xem chi tiết
            </Button>
          </Menu.Item>

          {record.is_ban ? (
            <>
              <Menu.Item key="unban">
                <Button
                  type="link"
                  onClick={() => {
                    handleActionNotSupport();
                  }}
                  icon={<VscFolderActive style={{ fontSize: "20px" }} />}
                  style={{ color: "black" }}
                  className="flex items-center"
                >
                  Gỡ ban tài khoản
                </Button>
              </Menu.Item>
              <Menu.Item key="delete">
                <Button
                  type="link"
                  onClick={() => {
                    handleActionNotSupport();
                  }}
                  icon={<FiTrash2 style={{ fontSize: "20px" }} />}
                  style={{ color: "red" }}
                  className="flex items-center"
                >
                  Xóa tài khoản
                </Button>
              </Menu.Item>
            </>
          ) : (
            <>
              <Menu.Item key="ban">
                <Button
                  type="link"
                  onClick={() => {
                    handleActionNotSupport();
                  }}
                  icon={<MdBlock style={{ fontSize: "20px" }} />}
                  style={{ color: "red" }}
                  className="flex items-center"
                >
                  Ban tài khoản
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

const Professional = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [originalData, setOriginalData] = useState<UserType[]>([]);
  const [processingData, setProcessingData] = useState<UserType[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  const [statusFilter, setStatusFilter] = useState<boolean | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchCustomers = async () => {
      if (session?.user.access_token) {
        setIsLoading(true);
        try {
          const responseGetAllCustomer = await customer.getAllUsersByAdmin(
            session.user.access_token
          );

          const filteredAndSortedData = (responseGetAllCustomer || [])[1]
            .filter((customer: UserType) => customer.role_name === ROLE_DOCTOR)
            .sort(
              (a: UserType, b: UserType) =>
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

    fetchCustomers();
  }, [session?.user.access_token]);

  useEffect(() => {
    let updatedData = [...originalData];

    if (searchText) {
      updatedData = updatedData.filter((customer: UserType) =>
        customer.fullname.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (statusFilter) {
      updatedData = updatedData.filter(
        (customer) => customer.is_ban === statusFilter
      );
    }

    setProcessingData(updatedData);
  }, [searchText, statusFilter, originalData]);

  const handleClearFilters = () => {
    setSearchText("");
    setStatusFilter(undefined);
    setProcessingData(originalData);
  };

  return (
    <ManagerLayoutNoSSR
      content={
        <div>
          <div className="header-order">
            <SearchFilterHeader
              searchPlaceholder="Tìm kiếm chuyên gia"
              searchValue={searchText}
              onSearchChange={setSearchText}
              haveFilter={true}
              filters={[
                {
                  label: "Trạng thái",
                  options: [
                    { label: "Đang bị ban", value: true },
                    { label: "Đang hoạt động", value: false },
                  ],
                  value: statusFilter,
                  onChange: setStatusFilter,
                },
              ]}
              handleClearFilters={handleClearFilters}
            />
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

export default Professional;
