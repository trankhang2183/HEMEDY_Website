"use client";

import { TransactionType } from "@/types/transaction.type";
import SearchFilterHeader from "@components/manager/SearchFilterHeader";
import transaction from "@services/transaction";
import { ProductType, TransactionTypeEnum } from "@utils/enum";
import {
  formatNumberWithCommas,
  getPaymentStatusVietNameseType,
  getProductVietNameseType,
} from "@utils/helpers";
import { Spin, Table, Button } from "antd";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ManagerLayoutNoSSR = dynamic(() => import("@layout/ManagerLayout"), {
  ssr: false,
});

const columns = [
  {
    title: "Tên dịch vụ",
    dataIndex: "product_type",
    key: "product_type",
    render: (productType: ProductType) => getProductVietNameseType(productType),
  },
  {
    title: "Mã giao dịch",
    dataIndex: "transaction_code",
    key: "transaction_code",
    width: "25%",
  },
  {
    title: "Người mua",
    dataIndex: ["user_id", "fullname"],
    key: "user_fullname",
  },
  {
    title: "Ngày mua",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (text: string) => new Date(text).toLocaleString(),
  },
  {
    title: "Phương thức thanh toán",
    dataIndex: "payment_type",
    key: "payment_type",
    width: "150px",
    render: (paymentType: string) => {
      return paymentType === "Stripe" ? "Visa" : paymentType;
    },
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    width: "200px",
    render: (status: string) => {
      const isSuccess = status === "Success";
      const isFailure = status === "Failure";
      return (
        <div className="flex items-center gap-2">
          <span
            style={{
              display: "inline-block",
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              backgroundColor: isSuccess
                ? "#00FF19"
                : isFailure
                ? "#FF002E"
                : "gray",
            }}
          />
          <span>{getPaymentStatusVietNameseType(status)}</span>
        </div>
      );
    },
  },
  {
    title: "Tổng tiền",
    dataIndex: "amount",
    key: "amount",
    render: (amount: number) => formatNumberWithCommas(amount),
  },
];

const Order = () => {
  const { data: session } = useSession();
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [originalData, setOriginalData] = useState<TransactionType[]>([]);
  const [processingData, setProcessingData] = useState<TransactionType[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [paymentFilter, setPaymentFilter] = useState<string | undefined>(
    undefined
  );
  const [serviceFilter, setServiceFilter] = useState<ProductType | undefined>(
    undefined
  );
  const [statusFilter, setStatusFilter] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchTransactions = async () => {
      if (session?.user.access_token) {
        setIsLoading(true);
        try {
          const responseGetAllTransaction =
            await transaction.getAllTransactionByAdmin(
              session.user.access_token
            );

          const filteredAndSortedData = (responseGetAllTransaction || [])
            .filter(
              (transaction: TransactionType) =>
                transaction.transaction_type === TransactionTypeEnum.Pay
            )
            .sort(
              (a: TransactionType, b: TransactionType) =>
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

    fetchTransactions();
  }, [session?.user.access_token]);

  useEffect(() => {
    let updatedData = [...originalData];

    if (searchText) {
      updatedData = updatedData.filter((transaction: any) =>
        transaction.user_id.fullname
          .toLowerCase()
          .includes(searchText.toLowerCase())
      );
    }

    if (paymentFilter) {
      updatedData = updatedData.filter(
        (transaction) => transaction.payment_type === paymentFilter
      );
    }

    if (serviceFilter) {
      updatedData = updatedData.filter(
        (transaction) => transaction.product_type === serviceFilter
      );
    }

    if (statusFilter) {
      updatedData = updatedData.filter(
        (transaction) => transaction.status === statusFilter
      );
    }

    setProcessingData(updatedData);
  }, [searchText, paymentFilter, serviceFilter, statusFilter, originalData]);

  const handleClearFilters = () => {
    setSearchText("");
    setPaymentFilter(undefined);
    setServiceFilter(undefined);
    setStatusFilter(undefined);
    setProcessingData(originalData);
  };

  return (
    <ManagerLayoutNoSSR
      content={
        <div>
          <div className="header-order">
            <SearchFilterHeader
              searchPlaceholder="Tìm kiếm người mua"
              searchValue={searchText}
              onSearchChange={setSearchText}
              haveFilter={true}
              filters={[
                {
                  label: "Phương thức thanh toán",
                  options: [
                    { label: "Visa", value: "Stripe" },
                    { label: "MoMo", value: "MoMo" },
                    { label: "VNPay", value: "VNPay" },
                  ],
                  value: paymentFilter,
                  onChange: setPaymentFilter,
                },
                {
                  label: "Tên dịch vụ",
                  options: [
                    {
                      label: getProductVietNameseType(ProductType.YogaLesson),
                      value: ProductType.YogaLesson,
                    },
                    {
                      label: getProductVietNameseType(
                        ProductType.MeditationLesson
                      ),
                      value: ProductType.MeditationLesson,
                    },
                    {
                      label: getProductVietNameseType(ProductType.BothLesson),
                      value: ProductType.BothLesson,
                    },
                    {
                      label: getProductVietNameseType(
                        ProductType.BasicMedicalExamination
                      ),
                      value: ProductType.BasicMedicalExamination,
                    },
                    {
                      label: getProductVietNameseType(
                        ProductType.VipMedicalExamination
                      ),
                      value: ProductType.VipMedicalExamination,
                    },
                  ],
                  value: serviceFilter,
                  onChange: setServiceFilter,
                },
                {
                  label: "Trạng thái",
                  options: [
                    { label: "Thành công", value: "Success" },
                    { label: "Thất bại", value: "Failure" },
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

export default Order;
