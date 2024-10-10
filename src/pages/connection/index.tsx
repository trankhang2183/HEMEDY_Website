"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { Modal, Spin } from "antd";
import HomeLayout from "@layout/HomeLayout";
import { useRouter } from "next/router";
import { FaUserDoctor } from "react-icons/fa6";
import DoctorItem from "@components/connectionComponent/DoctorItem";
import {
  AccountProfileType,
  DoctorType,
  ResponseGetAllDoctorType,
} from "@/types/user.type";
import { LIST_SESSION } from "@utils/constants";
import { ProductSession } from "@/types/session.type";
import { FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";
import customer from "@services/customer";
import { useSession } from "next-auth/react";

const HomeLayoutNoSSR = dynamic(() => import("@layout/HomeLayout"), {
  ssr: false,
});

const ConnectionPage: React.FC = () => {
  const router = useRouter();

  const [doctorList, setDoctorList] = useState<ResponseGetAllDoctorType>();
  const [isLoading, setIsLoading] = useState(true);

  const { data: token } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const doctorList = await customer.getAllDoctorByGuest();

        setDoctorList(doctorList);
      } catch (error) {
        toast.error("Có lỗi xảy ra khi tải dữ liệu!");
        console.error("Error fetching data: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <HomeLayoutNoSSR
      content={
        <>
          <div className="connection-page">
            <div className="banner">
              <div className="content-banner">
                <FaUserDoctor className="text-white w-9 h-9 relative -left-4" />

                <div className="text-center">
                  <h1 className="text-white font-semibold text-5xl">
                    Đội ngũ của chúng tôi
                  </h1>
                  <p className="text-white mt-4">
                    “Những bác sĩ giỏi có nhiều kinh nghiệm”
                  </p>
                </div>
              </div>
            </div>

            <div className="list-doctor-section py-14">
              {isLoading ? (
                <div className="w-screen h-96 flex justify-center items-center">
                  <Spin spinning={isLoading} />
                </div>
              ) : (
                <div className="container grid gap-10 grid-cols-3">
                  {doctorList && doctorList[1] && doctorList[1].length > 0 ? (
                    doctorList[1].map(
                      (doctorItem: AccountProfileType, index) => (
                        <DoctorItem doctorItem={doctorItem} key={index} />
                      )
                    )
                  ) : (
                    <p className="text-center">
                      Chưa có bác sĩ nào nằm trong hệ thống!
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="mb-20 flex justify-center relative">
              <img
                src="/images/convenience.png"
                className="container "
                alt="avatar_doc"
                loading="lazy"
              />
              <div className="btn-more absolute top-96 py-4 px-3 cursor-pointer">
                Tìm hiểu thêm
              </div>
            </div>

            <div className="psychology-package">
              <div className="container">
                <div className="flex flex-col justify-center items-center">
                  <div className="title-price font-semibold text-2xl">
                    Bảng giá
                  </div>
                  <h1 className="mt-4 mb-4 font-bold text-5xl">
                    Chọn gói khám phù hợp
                  </h1>
                  <p className="text-2xl">
                    Khám phá các gói dịch vụ của chúng tôi và chọn gói phù hợp
                    với nhu cầu của bạn.
                  </p>
                </div>

                <div className="select-session flex justify-center items-center mt-10 ">
                  {LIST_SESSION.map((item: ProductSession, index: number) => (
                    <div
                      key={item.id}
                      className="item-session flex flex-col justify-end items-center"
                      style={{
                        width:
                          item.id === 1
                            ? "410px"
                            : item.id === 2
                            ? "455px"
                            : "auto",
                        height:
                          item.id === 1
                            ? "370px"
                            : item.id === 2
                            ? "420px"
                            : "auto",
                        boxShadow:
                          item.id === 2
                            ? "rgba(0, 0, 0, 0.35) 0px 5px 15px"
                            : "none",
                      }}
                    >
                      <div>
                        <p className="title text-3xl font-semibold mb-4">
                          {item.product_name}
                        </p>
                        <p className="price text-4xl font-bold mb-2">
                          {item.price} VNĐ{" "}
                          <span className="text-3xl font-normal">
                            /{item.number_lesson}
                          </span>
                        </p>
                        <p className="font-medium text-2xl mb-3">
                          {item.description}
                        </p>
                        {item.detail.map((sentence, indexSentence) => (
                          <div
                            key={indexSentence}
                            className="flex items-center gap-3 mb-4"
                          >
                            <FaCheck
                              className=""
                              style={{ color: "#95c082" }}
                            />

                            <p className="">{sentence}</p>
                          </div>
                        ))}
                      </div>
                      <div
                        className="mt-5 mb-5"
                        style={{
                          backgroundColor:
                            item.id === 1
                              ? "#fff"
                              : item.id === 2
                              ? "#95C082"
                              : "transparent",
                          color:
                            item.id === 1
                              ? "#95C082"
                              : item.id === 2
                              ? "#fff"
                              : "#000",
                          border: "2px solid #95C082",
                          padding: "10px 20px",
                          borderRadius: "5px",
                          cursor: "pointer",
                          transition: "background-color 0.3s, color 0.3s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor =
                            item.id === 1 ? "#fbf4e2" : "#fbf4e2";
                          e.currentTarget.style.color =
                            item.id === 1 ? "#95C082" : "#95C082";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor =
                            item.id === 1 ? "#fff" : "#95C082";
                          e.currentTarget.style.color =
                            item.id === 1 ? "#95C082" : "#fff";
                        }}
                      >
                        Đặt lịch ngay{" "}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-20 flex justify-center mt-20">
              <img
                src="/images/frequently_question.png"
                className="container "
                alt="avatar_doc"
                loading="lazy"
              />
            </div>
            <div className="mb-20 flex justify-center items-center mt-20 ">
              <div className="btn-contact text-2xl">
                Không tìm thấy câu trả lời bạn cần?{" "}
                <span className="font-bold">Liên hệ hỗ trợ</span>
              </div>
            </div>
          </div>
        </>
      }
    />
  );
};

export default ConnectionPage;
