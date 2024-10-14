"use client"

import Blog from "@components/contentManage/Blog";
import Music from "@components/contentManage/Music";
import Podcast from "@components/contentManage/Podcast";
import Test from "@components/contentManage/Test";
import Travel from "@components/contentManage/Travel";
import Workshop from "@components/contentManage/Workshop";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { BiMessageSquareDetail } from "react-icons/bi";
import { GrWorkshop } from "react-icons/gr";
import { IoMusicalNotes } from "react-icons/io5";
import { MdOutlineTravelExplore, MdPostAdd } from "react-icons/md";
import { RiHeadphoneFill } from "react-icons/ri";

const ManagerLayoutNoSSR = dynamic(() => import("@layout/ManagerLayout"), {
  ssr: false,
});

const list_content_admin = [
  {
    key: 1,
    icon: <IoMusicalNotes className="w-10 h-10" />,
    title: "Âm nhạc/ Bài hát",
    description: "Bài hát",
    backgroundColor: "#4999F1",
    color: "white",
    component: <Music />,
  },
  {
    key: 2,
    icon: <RiHeadphoneFill className="w-10 h-10" />,
    title: "Podcast/ Bài nghe",
    description: "Bài nghe",
    backgroundColor: "#F5CA52",
    color: "black",
    component: <Podcast />,
  },
  {
    key: 3,
    icon: <MdPostAdd className="w-10 h-10" />,
    title: "Post/ Quotes",
    description: "Bài viết",
    backgroundColor: "#00BB93",
    color: "white",
    component: <Blog />,
  },
  {
    key: 4,
    icon: <MdOutlineTravelExplore className="w-10 h-10" />,
    title: "Tour du lịch",
    description: "Gói đăng kí",
    backgroundColor: "#FEFFC3",
    color: "black",
    component: <Travel />,
  },
  {
    key: 5,
    icon: <GrWorkshop className="w-10 h-10" />,
    title: "Workshop/ Tư vấn",
    description: "Buổi",
    backgroundColor: "#009F67",
    color: "white",
    component: <Workshop />,
  },
  {
    key: 6,
    icon: <BiMessageSquareDetail className="w-10 h-10" />,
    title: "Testing/ Bài kiểm tra",
    description: "Bài test",
    backgroundColor: "#C055D2",
    color: "black",
    component: <Test />,
  },
];

const Content = () => {
  const [selectedComponent, setSelectedComponent] =
    useState<React.ReactNode | null>(null);
  const [breadcrumb, setBreadcrumb] = useState<string[]>(["Nội dung"]);

  const handleItemClick = (item: any) => {
    setSelectedComponent(item.component);
    setBreadcrumb(["Nội dung", item.title]);
  };

  const handleBackToList = () => {
    setSelectedComponent(null);
    setBreadcrumb(["Nội dung"]);
  };

  return (
    <ManagerLayoutNoSSR
      content={
        <div className="manage-content-container flex flex-col">
          <div className="breadcrumb text-lg  mb-4">
            {breadcrumb.map((crumb, index) => (
              <span key={index}>
                {index > 0 && " > "}
                {index === breadcrumb.length - 1 ? (
                  crumb
                ) : (
                  <a href="#" onClick={handleBackToList} className="back-page">
                    {crumb}
                  </a>
                )}
              </span>
            ))}
          </div>

          {!selectedComponent ? (
            <div className="flex list-content flex-row gap-6 items-center flex-wrap">
              {list_content_admin.map((item) => (
                <div
                  className="item flex flex-col justify-between cursor-pointer"
                  key={item.key}
                  style={{ backgroundColor: `${item.backgroundColor}` }}
                  onClick={() => handleItemClick(item)} // Xử lý khi bấm vào item
                >
                  <div className="flex flex-col gap-4">
                    <div className="icon-container flex items-center justify-center">
                      {item.icon}
                    </div>
                    <p
                      className="title text-xl font-semibold"
                      style={{ color: `${item.color}` }}
                    >
                      {item.title}
                    </p>
                    <p
                      className="text-lg font-semibold"
                      style={{ color: `${item.color}` }}
                    >
                      <span className="text-6xl font-medium">1000</span>{" "}
                      {item.description}
                    </p>
                  </div>
                  <div className="btn-edit-update font-semibold text-lg">
                    Chi tiết/ chỉnh sửa
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>{selectedComponent}</div>
          )}
        </div>
      }
    />
  );
};

export default Content;
