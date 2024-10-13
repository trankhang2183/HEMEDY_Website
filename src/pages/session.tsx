"use client";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { Modal } from "antd";
import HomeLayout from "@layout/HomeLayout";
import { useRouter } from "next/router";
import Image from "next/image";
import { LIST_PRODUCT_SESSION } from "@utils/constants";
import { ProductSession } from "@/types/session.type";
import { FaCheck } from "react-icons/fa";
import transaction from "@services/transaction";
import { useSession } from "next-auth/react";
import {
  PayProductByMoMo,
  PayProductByStripe,
  PayProductByVnPay,
} from "@/types/transaction.type";
import { moneyStringToNumber } from "@utils/helpers";
import { toast } from "react-toastify";
import SpinnerLoading from "@components/loading/SpinnerLoading";
import { loadStripe } from "@stripe/stripe-js";
import ModalChoosePaymentMethod from "@components/modal/ModalChoosePaymentMethod";
import { TransactionTypeEnum } from "@utils/enum";

const { confirm } = Modal;

const HomeLayoutNoSSR = dynamic(() => import("@layout/HomeLayout"), {
  ssr: false,
});

const SessionPage: React.FC = () => {
  const router = useRouter();
  const { data: token } = useSession();

  const [isLoading, setIsLoading] = useState(false);

  const handleRedirectToMoMo = async (item: ProductSession) => {
    const dataBody: PayProductByMoMo = {
      amount: moneyStringToNumber(item.price),
      product_type: item.product_type,
    };

    try {
      setIsLoading(true);
      toast.success("Bạn sẽ được chuyển đến trang thanh toán trong chốc lát!");

      const responseCreateLinkMoMo = await transaction.payProductByMoMo(
        token?.user.access_token!,
        dataBody
      );

      const redirectUrl = responseCreateLinkMoMo.payUrl;

      window.location.href = redirectUrl;
    } catch (error) {
      toast.error("Có lỗi khi tạo thanh toán momo!");
      console.error("Error fetching data: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRedirectStripe = async (item: ProductSession) => {
    const dataBody: PayProductByStripe = {
      amount: moneyStringToNumber(item.price),
      product_type: item.product_type,
      description: item.description!,
      image: item.image!,
      name: item.product_name,
    };

    try {
      setIsLoading(true);
      toast.success("Bạn sẽ được chuyển đến trang thanh toán trong chốc lát!");

      const responseCreateLinkStripe = await transaction.payProductByStripe(
        token?.user.access_token!,
        dataBody
      );

      console.log("responseCreateLinkStripe: ", responseCreateLinkStripe);
      const redirectUrl = responseCreateLinkStripe;

      window.location.href = redirectUrl;
    } catch (error) {
      toast.error("Có lỗi khi tạo thanh toán visa!");
      console.error("Error fetching data: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentByVnPay = async (item: ProductSession) => {
    const dataBody: PayProductByVnPay = {
      amount: moneyStringToNumber(item.price),
      product_type: item.product_type,
    };

    try {
      setIsLoading(true);
      toast.success("Bạn sẽ được chuyển đến trang thanh toán trong chốc lát!");

      const responseCreateLinkMoMo = await transaction.payProductByVnPay(
        token?.user.access_token!,
        dataBody
      );

      const redirectUrl = responseCreateLinkMoMo;

      window.location.href = redirectUrl;
    } catch (error) {
      toast.error("Có lỗi khi tạo thanh toán bằng vnpay!");
      console.error("Error fetching data: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentByWallet = async () => {};

  const [isOpenModalChoosePaymentMethod, setIsOpenModalChoosePaymentMethod] =
    React.useState<boolean>(false);

  const handleCheckLoginBeforePayProduct = () => {
    if (!token?.user.access_token) {
      toast.error("Vui lòng đăng nhập trước khi đăng ký mua khóa học!");
    } else {
      setIsOpenModalChoosePaymentMethod(true);
    }
  };

  return (
    <HomeLayoutNoSSR
      content={
        <>
          <div className="flex flex-col justify-center gap-32">
            <img
              src="/images/khám phá sự bình an.png"
              className="container"
              alt="avatar_doc"
              loading="lazy"
            />
            <div className="mb-20 flex justify-center">
              <div className="container select-suitable-session">
                <h1 className="text-center text-4xl font-bold">
                  Lựa Chọn Gói Khóa Học Phù Hợp
                </h1>
                <p className="text-center text-xl font-medium mt-6 mb-8">
                  Chọn gói khóa học yoga và thiền định phù hợp với nhu cầu của
                  bạn. Tận hưởng các bài học <br></br> chất lượng cao và sự hỗ
                  trợ tận tình từ đội ngũ của chúng tôi.
                </p>

                <div className="list-suitable-session grid grid-cols-3 gap-6">
                  {LIST_PRODUCT_SESSION.map(
                    (item: ProductSession, index: number) => (
                      <div
                        key={index}
                        className="item flex justify-center flex-col items-center"
                      >
                        <div className="w-4/5 h-5/6">
                          <img
                            src={item.image}
                            alt={item.product_name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <h1 className="text-center text-3xl font-medium mb-3 mt-4">
                          {item.product_name}
                        </h1>
                        <p
                          style={{ color: "#fbf4e2" }}
                          className="text-center text-5xl font-medium"
                        >
                          {item.price} VNĐ
                        </p>
                        <p
                          style={{ color: "#fbf4e2" }}
                          className="text-center mt-3 text-xl"
                        >
                          mỗi tháng
                        </p>
                        <div className="flex flex-col gap-4 mt-10">
                          {item.detail.map((option, indexOption) => (
                            <div
                              className="option flex flex-row gap-4 items-center"
                              key={indexOption}
                            >
                              <FaCheck style={{ color: "#95c082" }} />
                              <p className="text-xl font-medium">{option}</p>
                            </div>
                          ))}
                        </div>
                        <div
                          className="btn-register-session mt-12"
                          onClick={() => handleCheckLoginBeforePayProduct()}
                        >
                          Đăng ký ngay
                        </div>

                        {isOpenModalChoosePaymentMethod && (
                          <ModalChoosePaymentMethod
                            open={isOpenModalChoosePaymentMethod}
                            onClose={() =>
                              setIsOpenModalChoosePaymentMethod(false)
                            }
                            paymentPurpose={TransactionTypeEnum.Pay}
                            title={`Bạn có chắc muốn mua khóa học "${item?.product_name}" này?`}
                            handlePaymentByMoMo={() =>
                              handleRedirectToMoMo(item)
                            }
                            handlePaymentByStripe={() =>
                              handleRedirectStripe(item)
                            }
                            handlePaymentByVnPay={() =>
                              handlePaymentByVnPay(item)
                            }
                          />
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
          {isLoading && <SpinnerLoading />}
        </>
      }
    />
  );
};

export default SessionPage;
