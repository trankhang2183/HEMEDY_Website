import React, { useEffect, useState } from "react";

import dynamic from "next/dynamic";
import customer from "@services/customer";
import { useSession } from "next-auth/react";
import { AccountProfileType } from "@/types/user.type";
import {
  displayValue,
  formatDate,
  generateFallbackAvatar,
  moneyNumberToString,
} from "@utils/helpers";
import transaction from "@services/transaction";
import { TransactionType } from "@/types/transaction.type";
import { Pagination, Spin } from "antd";
import scheduled from "@services/scheduled";
import { ScheduledType } from "@/types/scheduled.type";
import { toast } from "react-toastify";
import { BiPlus } from "react-icons/bi";
import { PiMoneyFill } from "react-icons/pi";
import { RiCalendarCheckLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { LIST_PRODUCT_SESSION, TIME_SLOT } from "@utils/constants";
import moment from "moment";

const HomeLayoutNoSSR = dynamic(() => import("@layout/HomeLayout"), {
  ssr: false,
});

const ITEMS_PER_PAGE = 4;

const AccountPage = () => {
  const router = useRouter();

  const [dataUser, setDataUser] = useState<AccountProfileType>();
  const [transactionList, setTransactionList] = useState<TransactionType[]>();
  const [scheduledList, setScheduledList] = useState<ScheduledType[]>();
  const [isLoading, setIsLoading] = useState(true);

  const [transactionPage, setTransactionPage] = useState(1);
  const [scheduledPage, setScheduledPage] = useState(1);

  const { data: token } = useSession();

  const getProductName = (productType: string) => {
    const product = LIST_PRODUCT_SESSION.find(
      (item) => item.product_type === productType
    );
    return product ? product.product_name : "Unknown";
  };

  useEffect(() => {
    const fetchData = async () => {
      if (token?.user.access_token && token?.user.email) {
        try {
          setIsLoading(true);
          const userProfile = customer.getCustomerProfile(
            token.user.access_token,
            token.user.email
          );

          const transactions = transaction.getAllTransactionOfCustomer(
            token.user.access_token
          );

          const schedules = scheduled.getAllScheduledOfCustomer(
            token.user.access_token
          );

          const [userResult, transactionResult, scheduledResult] =
            await Promise.all([userProfile, transactions, schedules]);

          const sortedTransactions = transactionResult.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );

          const sortedSchedules = scheduledResult.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );

          setDataUser(userResult);
          setTransactionList(sortedTransactions);
          setScheduledList(sortedSchedules);
        } catch (error) {
          toast.error("Có lỗi xảy ra khi tải dữ liệu cá nhân!");
          console.error("Error fetching data: ", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [token]);

  const currentTransactionList = transactionList
    ? transactionList.slice(
        (transactionPage - 1) * ITEMS_PER_PAGE,
        transactionPage * ITEMS_PER_PAGE
      )
    : [];

  const currentScheduledList = scheduledList
    ? scheduledList.slice(
        (scheduledPage - 1) * ITEMS_PER_PAGE,
        scheduledPage * ITEMS_PER_PAGE
      )
    : [];

  return (
    <HomeLayoutNoSSR
      content={
        <div className="container account-page">
          {isLoading ? (
            <div className="w-full flex justify-center items-center h-screen">
              <Spin spinning={isLoading} />
            </div>
          ) : (
            <>
              <div className="account-info-container">
                <div className="account-info flex flex-row justify-between">
                  <div className="left flex flex-col ">
                    <div className="avatar">
                      <img
                        src={
                          dataUser?.avatar_url === null ||
                          dataUser?.avatar_url === undefined
                            ? generateFallbackAvatar(dataUser?.fullname!)
                            : dataUser?.avatar_url
                        }
                        alt="avatar"
                      />
                    </div>

                    <div className="wallet mt-7">
                      <p className="font-light text-lg">Số dư</p>
                      <div className="flex flex-row items-center justify-center gap-4">
                        <p className="balance font-medium text-4xl">
                          {moneyNumberToString(dataUser?.account_balance!)} VNĐ
                        </p>
                        <div
                          className="btn-plus flex items-center justify-center "
                          onClick={() => router.push("/account/add-fund")}
                        >
                          <BiPlus className="w-5 h-5 icon-plus" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="right flex flex-col justify-center">
                    <div className="header-name flex flex-row gap-7">
                      <h2 className="text-4xl font-semibold uppercase">
                        {dataUser?.fullname}
                      </h2>
                      <div className="rank-user flex justify-center items-center">
                        Member
                      </div>
                    </div>

                    <div className="table-info">
                      <div className="table-header flex flex-row justify-between">
                        <p className="uppercase font-bold">
                          Tên:{" "}
                          <span className="font-light">
                            {dataUser?.fullname}
                          </span>
                        </p>
                        <p>
                          <span className="uppercase">Ngày sinh: </span>{" "}
                          <span className="font-light">
                            {displayValue(formatDate(dataUser?.dob))}
                          </span>
                        </p>
                      </div>

                      <div className="table-body">
                        <p className="font-bold">
                          SĐT:{" "}
                          <span className="font-light">
                            {displayValue(dataUser?.phone_number)}
                          </span>
                        </p>
                        <p className="font-bold my-4">
                          Email:{" "}
                          <span className="font-light">
                            {displayValue(dataUser?.email)}
                          </span>
                        </p>
                        <p className="font-bold">
                          Nơi sinh sống:{" "}
                          <span className="font-light">
                            {displayValue(dataUser?.address)}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="account-transactions mt-10">
                <div className="title-section">
                  <PiMoneyFill className="icon" />

                  <h1 className="font-semibold">Quản lý đơn hàng</h1>
                </div>
                {transactionList?.length === 0 ? (
                  <div className="no-data text-center mt-6 text-2xl">
                    Bạn chưa đơn hàng nào cả!
                  </div>
                ) : (
                  <div className="transaction-table mt-6">
                    <table className="min-w-full table-auto">
                      <thead>
                        <tr className="text-left border-b">
                          <th className="py-2 px-4">Tên đơn hàng</th>
                          <th className="py-2 px-4">Mã đơn hàng</th>
                          <th className="py-2 px-4">Trạng thái thanh toán</th>
                          <th className="py-2 px-4">Hình thức thanh toán</th>
                          <th className="py-2 px-4">Ngày mua</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentTransactionList?.map(
                          (transaction: TransactionType, index) => (
                            <tr key={index} className="border-b">
                              <td className="py-2 px-4">
                                Khoá học{" "}
                                {getProductName(transaction.product_type)}
                              </td>
                              <td className="py-2 px-4">{transaction._id}</td>
                              <td className="py-2 px-4">
                                {transaction.status}
                              </td>
                              <td className="py-2 px-4">
                                {transaction.payment_type}
                              </td>
                              <td className="py-2 px-4">
                                {moment(transaction.createdAt).format(
                                  "DD/MM/YYYY"
                                )}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>

                    <Pagination
                      current={transactionPage}
                      pageSize={ITEMS_PER_PAGE}
                      total={transactionList!.length}
                      onChange={(page) => setTransactionPage(page)}
                      className="mt-4 flex justify-end"
                    />
                  </div>
                )}
              </div>

              <div className="account-scheduled mt-16 mb-10">
                <div className="flex flex-row justify-between items-center">
                  <div className="title-section">
                    <RiCalendarCheckLine className="icon" />

                    <h1 className="font-semibold">Lịch hẹn</h1>
                  </div>

                  <div
                    className="btn-register-more flex flex-row items-center gap-4"
                    onClick={() => router.push("/connection")}
                  >
                    Đăng kí thêm
                    <div className="plus-btn flex justify-center items-center">
                      <BiPlus className="w-5 h-5 icon-plus text-white" />
                    </div>
                  </div>
                </div>
                {scheduledList?.length === 0 ? (
                  <div className="no-data text-center mt-6 text-2xl">
                    Bạn chưa đặt lịch hẹn nào cả!
                  </div>
                ) : (
                  <div className="list-scheduled grid grid-cols-2 gap-6 mt-6">
                    {currentScheduledList?.map((scheduled, index) => (
                      <div
                        className="scheduled-item flex flex-row gap-4"
                        key={index}
                      >
                        <div className="left">
                          <img
                            src={scheduled.doctor_id.avatar_url}
                            alt={scheduled.doctor_id.fullname}
                          />
                        </div>

                        <div className="right flex flex-col justify-center">
                          <div>
                            <p className="font-semibold text-xl">
                              Bác sĩ:{" "}
                              <span className="font-normal">
                                {scheduled.doctor_id.fullname}
                              </span>
                            </p>
                            <p className="font-semibold text-xl">
                              Thời gian:{" "}
                              <span className="font-normal">
                                {
                                  TIME_SLOT.find(
                                    (item) => item.slot === scheduled.slot
                                  )?.time
                                }
                              </span>
                            </p>

                            <p className="font-semibold text-xl">
                              Ngày:{" "}
                              <span className="font-normal">
                                {formatDate(scheduled.createdAt)}
                              </span>
                            </p>
                            <p className="font-semibold text-xl">
                              Trạng thái:{" "}
                              <span className="font-normal">
                                {scheduled.status === "Pending"
                                  ? "Chờ tới khám"
                                  : "Đã khám"}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <Pagination
                  current={scheduledPage}
                  pageSize={ITEMS_PER_PAGE}
                  total={scheduledList!.length}
                  onChange={(page) => setScheduledPage(page)}
                  className="mt-4 flex justify-end"
                />
              </div>
            </>
          )}
        </div>
      }
    />
  );
};

export default AccountPage;
